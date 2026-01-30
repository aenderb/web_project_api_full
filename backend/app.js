// Carrega o arquivo .env correto baseado no NODE_ENV
// eslint-disable-next-line operator-linebreak
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

require("dotenv").config({ path: envFile });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { z } = require("zod");
const { celebrate, errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const NotFoundError = require("./errors/NotFoundError");

const env = z
  .object({
    PORT: z.string().default("3000"),
    MONGODB_URI: z.string().url(),
    ALLOWED_ORIGINS: z
      .string()
      .default("http://localhost:3000,http://localhost:5173"),
  })
  .parse(process.env);

const { PORT = 3000 } = process.env;
const app = express();

// Configura o Express para confiar em proxies (necessário para rate limiting em produção)
app.set("trust proxy", 1);

mongoose.connect(
  // eslint-disable-next-line comma-dangle
  env.MONGODB_URI,
);

mongoose.connection.on("connected", () => {
  console.log("✅ Conectado ao MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Erro ao conectar ao MongoDB:", err);
});

// Configuração CORS
const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (como mobile apps ou Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// Middleware de logging de requisições
app.use(requestLogger);

// Rate limiting para autenticação - mais restritivo
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas por IP
  message: "Muitas tentativas de autenticação. Tente novamente em 15 minutos.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting geral para a API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: "Muitas requisições. Tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplica rate limiting geral em todas as rotas
app.use(apiLimiter);

app.post("/signin", authLimiter, celebrate(validateLogin), login);
app.post("/signup", authLimiter, celebrate(validateCreateUser), createUser);

// Protege todas as rotas abaixo
app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Recurso requisitado não encontrado"));
});

// Middleware de logging de erros
app.use(errorLogger);

// Middleware de erros do celebrate
app.use(errors());

// Middleware de tratamento de erros centralizado
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB: ${env.MONGODB_URI.split("@")[1]}`);
});
