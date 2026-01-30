# Around - Rede Social de Fotos 📸

Aplicação fullstack completa de uma rede social para compartilhamento de fotos, desenvolvida com Node.js + React. O projeto implementa autenticação JWT, sistema de likes, gerenciamento de perfis e galeria de imagens.

## 📋 Sobre o Projeto

Around é uma plataforma web que permite aos usuários compartilhar suas fotos favoritas, interagir com publicações através de likes e gerenciar seu perfil pessoal. O projeto é dividido em duas partes principais:

- **Backend**: API REST com Node.js, Express e MongoDB
- **Frontend**: Interface responsiva em React com autenticação

## ✨ Funcionalidades

- 🔐 **Autenticação completa** - Registro, login e proteção de rotas
- 👤 **Gerenciamento de perfil** - Edição de nome, descrição e avatar
- 📷 **Galeria de fotos** - Criar, visualizar e deletar cards
- ❤️ **Sistema de likes** - Curtir e descurtir publicações
- 🔒 **Segurança** - Senhas criptografadas com bcrypt e tokens JWT
- 📱 **Design responsivo** - Interface adaptável para desktop, tablet e mobile
- ✅ **Validação de dados** - Formulários com validação em tempo real

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod & dotenv
- Winston (logging)
- ESLint (Airbnb Style Guide)

### Frontend
- React 18
- React Router DOM
- Vite
- CSS3 (Metodologia BEM)
- Fetch API

## 📁 Estrutura do Projeto

```
web_project_api_full/
├── backend/              # API REST
│   ├── controllers/      # Lógica de negócio
│   ├── models/          # Schemas do MongoDB
│   ├── routes/          # Rotas da API
│   ├── middlewares/     # Auth, validação e erros
│   ├── errors/          # Classes de erros customizados
│   └── utils/           # Constantes e helpers
│
├── frontend/            # Interface React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── contexts/    # Context API
│   │   ├── utils/       # API calls e validações
│   │   └── blocks/      # Estilos CSS (BEM)
│   └── public/          # Assets estáticos
│
└── README.md           # Este arquivo
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v14+)
- MongoDB instalado e rodando
- npm ou yarn

### 1. Clonar o Repositório
```bash
git clone https://github.com/aenderb/web_project_around_express.git
cd web_project_api_full
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta backend:
```env
PORT=3000
MONGODB_URI=mongodb://admin:Mongo1234@localhost:27017/arounddb?authSource=admin
JWT_SECRET=sua-chave-secreta-aqui
ALLOWED_ORIGINS=http://localhost:5173
```

Inicie o servidor:
```bash
npm run dev
```

### 3. Configurar o Frontend

Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4. Acessar a Aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📡 Endpoints da API

### Autenticação
- `POST /signup` - Registrar novo usuário
- `POST /signin` - Login de usuário

### Usuários (Protegido)
- `GET /users` - Listar todos os usuários
- `GET /users/me` - Obter usuário atual
- `PATCH /users/me` - Atualizar perfil
- `PATCH /users/me/avatar` - Atualizar avatar

### Cartões (Protegido)
- `GET /cards` - Listar todos os cards
- `POST /cards` - Criar novo card
- `DELETE /cards/:id` - Deletar card
- `PUT /cards/:id/likes` - Curtir card
- `DELETE /cards/:id/likes` - Descurtir card

## 🔒 Segurança

- Senhas criptografadas com bcrypt (salt rounds: 10)
- Autenticação via JWT com expiração de 7 dias
- Proteção de rotas com middleware de autenticação
- Validação de dados com Zod e Mongoose
- CORS configurado para origens permitidas
- Variáveis de ambiente para dados sensíveis

## 📱 Responsividade

O frontend é totalmente responsivo com breakpoints para:
- Desktop (> 880px)
- Tablet (880px)
- Mobile (320px)

## 📚 Documentação Adicional

Para mais detalhes sobre cada parte do projeto:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🎓 Projeto Desenvolvido

Este projeto foi desenvolvido como parte do programa de estudos da **Tripleten Brasil**, aplicando conceitos de desenvolvimento fullstack, arquitetura REST e melhores práticas de segurança.

## 📝 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por Aender Binoto