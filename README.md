      ```md
     [Leia em Português](./README.pt-br.md) | [Read in English](./README.md)
     ```

# Aula Firebase com Next.js

Este projeto é uma demonstração da integração entre **Next.js**, **Firebase**, **Firestore**, **Cloud Storage** e **Vercel**. O foco é a criação de uma aplicação com autenticação de usuários, manipulação de documentos no Firestore, upload de imagens no Cloud Storage e o deploy da aplicação na Vercel.

A aplicação está online e pode ser acessada [aqui](https://aula-firebase.vercel.app/).

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção da interface e páginas dinâmicas.
- **Firebase Authentication**: Autenticação de usuários utilizando email e senha.
- **Firestore**: Banco de dados NoSQL para armazenamento de documentos.
- **Firebase Cloud Storage**: Armazenamento de arquivos, como imagens, na nuvem.
- **Vercel**: Plataforma utilizada para o deploy da aplicação.
- **React Context**: Gerenciamento do estado global para autenticação e navegação entre páginas.

## Funcionalidades

### 1. Página de Login
- Login de usuário com email e senha.
- Links para **Cadastre-se** e **Esqueci a senha**, utilizando o Firebase Authentication.

### 2. Autenticação com React Context
- O estado de autenticação é gerenciado com React Context, garantindo que o email do usuário esteja disponível após o login.

### 3. Páginas Disponíveis (após login)
O **header** exibe links para navegação entre as páginas e o email do usuário autenticado.

- **Criar**: Permite adicionar um documento no Firestore, com campos personalizados.
- **Função GET**: Lista todos os documentos adicionados no Firestore, com botões para **update** e **delete** na linha de cada documento.
- **Adicionar Imagem**: Faz upload de uma imagem para o Firebase Cloud Storage e disponibiliza o link para download.
- **GET Imagens**: Lista todas as imagens armazenadas no Cloud Storage, com botões de **download** e **delete** para cada imagem.

## Variáveis de Ambiente
Foram utilizadas variáveis de ambiente para armazenar as credenciais do Firebase no arquivo `.env.local`.

## Deploy
Após o desenvolvimento, a aplicação foi publicada na **Vercel** e está disponível em: [aula-firebase.vercel.app](https://aula-firebase.vercel.app/).

## Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/viniciusgdoliveira/aula-firebase-nextjs.git

2. Instale as dependências:
   ```bash
   npm install
3. Configure as variáveis de ambiente: Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais do Firebase:

   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   
5. Execute o projeto:
   ```bash
   npm run dev
6. Acesse a aplicação localmente:
   Abra http://localhost:3000 no seu navegador.


## Contribuições
Contribuições, issues e pull requests são bem-vindos! Sinta-se à vontade para melhorar ou expandir este projeto.




