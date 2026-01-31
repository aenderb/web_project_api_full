import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Register from "./Register/Register";
import Login from "./Login/Login";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Loader from "./Loader/Loader";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingAddCard, setIsLoadingAddCard] = useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState({
    isSuccess: false,
    message: "",
  });

  // Função helper para adicionar isLiked aos cards
  const processCards = useCallback((cards, userId) => {
    return cards.map((card) => ({
      ...card,
      isLiked: card.likes.some((id) => id === userId),
    }));
  }, []);

  const handleRegister = useCallback(async (email, password) => {
    try {
      await auth.register(email, password);
      setInfoTooltipStatus({
        isSuccess: true,
        message: "Vitória! Você se registrou com sucesso.",
      });
      setIsInfoTooltipOpen(true);
    } catch (err) {
      console.error(err + " - Erro ao registrar usuário");
      setInfoTooltipStatus({
        isSuccess: false,
        message: "Ops, algo deu errado!\nPor favor, tente novamente.",
      });
      setIsInfoTooltipOpen(true);
    }
  }, []);

  const handleCloseInfoTooltip = useCallback(() => {
    setIsInfoTooltipOpen(false);
    if (infoTooltipStatus.isSuccess) {
      navigate("/signin");
    }
  }, [infoTooltipStatus.isSuccess, navigate]);

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        const data = await auth.login(email, password);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);

          // Carregar dados do usuário após login
          const userData = await auth.checkToken(data.token);
          const cardsData = await api.getInitialCards();

          setCurrentUser(userData);
          setCards(processCards(cardsData, userData._id));

          navigate("/");
        }
      } catch (err) {
        console.error(err + " - Erro ao fazer login");
        setInfoTooltipStatus({
          isSuccess: false,
          message: "Ops, algo deu errado!\nPor favor, tente novamente.",
        });
        setIsInfoTooltipOpen(true);
      }
    },
    [navigate],
  );

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsCheckingToken(false);
          return;
        }

        // Verifica o token e busca dados do usuário
        const userData = await auth.checkToken(token);
        const cardsData = await api.getInitialCards();

        setCurrentUser(userData);
        setCards(processCards(cardsData, userData._id));
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err + " - Erro ao verificar token");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    loadInitialData();
  }, []);

  const handleOpenPopup = useCallback((popupData) => {
    setPopup(popupData);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const handleCardDelete = useCallback(
    async (card) => {
      setIsLoadingDeleteCard(true);
      try {
        await api.deleteCard(card._id);
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
        handleClosePopup();
      } catch (err) {
        console.error(err + " - Erro ao deletar card");
        handleClosePopup();

        // Verifica se é erro de permissão (403)
        if (err.includes("403")) {
          setInfoTooltipStatus({
            isSuccess: false,
            message: "Você não tem permissão para excluir esta imagem.",
          });
          setIsInfoTooltipOpen(true);
        }
      } finally {
        setIsLoadingDeleteCard(false);
      }
    },
    [handleClosePopup],
  );

  const handleCardLike = useCallback(
    async (card) => {
      try {
        const newCard = await api.changeLikeCardStatus(card._id, card.isLiked);

        // Adiciona isLiked ao card retornado
        const processedCard = {
          ...newCard,
          isLiked: newCard.likes.some((id) => id === currentUser._id),
        };

        setCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? processedCard : c)),
        );
      } catch (err) {
        console.error(err + " - Erro ao alterar status de like");
      }
    },
    [currentUser._id],
  );

  const handleUpdateUser = useCallback(
    async (data) => {
      setIsLoadingUserInfo(true);
      try {
        const newData = await api.setUserInfo(data);
        setCurrentUser(newData);
        handleClosePopup();
      } catch (err) {
        console.error(err + " - Erro ao atualizar informações do usuário");
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [handleClosePopup],
  );

  const handleAddPlaceSubmit = useCallback(
    async (data) => {
      setIsLoadingAddCard(true);
      try {
        const newCard = await api.createCard(data);
        const processedCard = {
          ...newCard,
          isLiked: false, // Novo card nunca tem like do usuário atual
        };
        setCards((prevCards) => [processedCard, ...prevCards]);
        handleClosePopup();
      } catch (err) {
        console.error(err + " - Erro ao adicionar novo card");
      } finally {
        setIsLoadingAddCard(false);
      }
    },
    [handleClosePopup],
  );

  const handleUpdateAvatar = useCallback(
    async (data) => {
      setIsLoadingAvatar(true);
      try {
        const newData = await api.updateAvatar(data);
        setCurrentUser(newData);
      } catch (err) {
        console.error(err + " - Erro ao atualizar avatar do usuário");
      } finally {
        setIsLoadingAvatar(false);
        handleClosePopup();
      }
    },
    [handleClosePopup],
  );

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      {isCheckingToken ? (
        <div className="page">
          <Loader />
        </div>
      ) : (
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            userEmail={currentUser.email}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    setPopup={setPopup}
                    isLoadingUserInfo={isLoadingUserInfo}
                    isLoadingAvatar={isLoadingAvatar}
                    isLoadingAddCard={isLoadingAddCard}
                    isLoadingDeleteCard={isLoadingDeleteCard}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                  <Login onLogin={handleLogin} />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute isLoggedIn={isLoggedIn}>
                  <Register onRegister={handleRegister} />
                </PublicRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={handleCloseInfoTooltip}
            isSuccess={infoTooltipStatus.isSuccess}
            message={infoTooltipStatus.message}
          />
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
