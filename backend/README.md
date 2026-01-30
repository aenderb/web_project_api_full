# Tripleten web_project_around_express - API REST

## 📋 Descrição do Projeto

Around Express é uma API REST desenvolvida com Node.js, Express e MongoDB que gerencia usuários (users) e cartões (cards) de um aplicativo web. O projeto fornece endpoints completos para criar, ler, atualizar e deletar usuários e suas publicações de fotos, simulando uma rede social onde usuários podem compartilhar imagens e interagir com conteúdo através de likes.

A aplicação utiliza MongoDB como banco de dados para persistência de dados e Mongoose como ODM para facilitar a interação com o banco de dados, proporcionando validação de schemas e métodos simplificados para operações CRUD.

## ⚙️ Funcionalidades

- **Gerenciamento de Usuários (Users)**
  - Listar todos os usuários cadastrados
  - Buscar usuário específico por ID
  - Criar novos usuários
  - Atualizar perfil do usuário (nome e sobre)
  - Atualizar avatar do usuário

- **Gerenciamento de Cartões (Cards)**
  - Listar todos os cartões publicados
  - Criar novos cartões
  - Deletar cartões
  - Curtir cartões (adicionar like)
  - Descurtir cartões (remover like)

- **Banco de Dados MongoDB**
  - Persistência de dados em MongoDB
  - Modelos Mongoose para Users e Cards
  - Validação de dados com schemas

- **Arquitetura RESTful**
  - Endpoints organizados e semânticos
  - Respostas em formato JSON
  - Tratamento de erros apropriado

## 🚀 Tecnologias e Técnicas Utilizadas

### Tecnologias
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista e flexível
- **MongoDB** - Banco de dados NoSQL orientado a documentos
- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **JavaScript (ES6+)** - Linguagem de programação
- **Zod** - Validação de variáveis de ambiente
- **dotenv** - Gerenciamento de variáveis de ambiente

### Técnicas e Padrões
- **API REST** - Arquitetura de interface de programação
- **MVC Pattern** - Separação em Models, Controllers e Routes
- **Roteamento Modular** - Separação de rotas em arquivos dedicados
- **Express Router** - Criação de handlers de rotas modulares
- **Async/Await** - Programação assíncrona moderna
- **Tratamento de Erros** - Respostas HTTP adequadas (404, 500)
- **ESLint** - Padronização de código (Airbnb Style Guide)
- **Nodemon** - Hot reload durante desenvolvimento

## 📡 Endpoints da API

### Usuários (Users)
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Retorna um usuário específico por ID
- `POST /users` - Cria um novo usuário
  - Body: `{ "name": "Nome", "about": "Sobre", "avatar": "URL" }`
- `PATCH /users/me` - Atualiza o perfil do usuário atual
  - Body: `{ "name": "Novo Nome", "about": "Nova descrição" }`
- `PATCH /users/me/avatar` - Atualiza o avatar do usuário atual
  - Body: `{ "avatar": "Nova URL do avatar" }`

### Cartões (Cards)
- `GET /cards` - Lista todos os cartões
- `POST /cards` - Cria um novo cartão
  - Body: `{ "name": "Nome do local", "link": "URL da imagem" }`
- `DELETE /cards/:id` - Deleta um cartão específico por ID
- `PUT /cards/:cardId/likes` - Adiciona um like ao cartão
- `DELETE /cards/:cardId/likes` - Remove um like do cartão

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm
- MongoDB (local ou remoto - ex: MongoDB Atlas)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/aenderb/web_project_around_express.git
cd web_project_around_express
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
```

**Nota:** Substitua a `MONGODB_URI` pela sua string de conexão do MongoDB Atlas ou outra instância do MongoDB.

4. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

5. Ou execute em modo produção:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 🧪 Scripts Disponíveis

- `npm run dev` - Inicia o servidor com Nodemon (hot reload)
- `npm start` - Inicia o servidor em modo produção
- `npm run lint` - Executa o ESLint para verificar o código

## 👨‍💻 Autor

**Aender Binoto**

**Nota:** Este é um projeto educacional desenvolvido como parte do programa da TripleTen.
