# 💬 Play55 Chat

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5-42b883?style=for-the-badge&logo=vue.js" alt="Vue.js 3" />
  <img src="https://img.shields.io/badge/Nuxt-3.17-00DC82?style=for-the-badge&logo=nuxt.js" alt="Nuxt 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase-11.0-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
</div>

<p align="center">
  <img src="https://i.imgur.com/YourImageHere.png" alt="Play55 Chat Preview" width="600" />
</p>

## ✨ Funcionalidades

- **🔐 Autenticação com Google**: Login integrado com Firebase
- **💬 Chat em tempo real**: Envie e receba mensagens instantaneamente
- **👍 Sistema de curtidas**: Interaja com as mensagens de outros usuários
- **🔄 Filtros de mensagens**: Visualize mensagens por mais recentes, mais antigas ou apenas suas mensagens
- **✏️ Edição de mensagens**: Edite suas próprias mensagens
- **🗑️ Exclusão de mensagens**: Remova mensagens que você enviou
- **↩️ Respostas a mensagens**: Responda diretamente a mensagens específicas
- **📱 Design responsivo**: Interface adaptada para desktop e dispositivos móveis
- **📝 Formulário de contato**: Com validação e integração com reCAPTCHA v3

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript progressivo
- **Nuxt 3**: Framework para aplicações Vue.js
- **TypeScript**: Superset tipado de JavaScript
- **Firebase**: Plataforma para autenticação e armazenamento
- **TailwindCSS**: Framework CSS utilitário
- **Vee-Validate + Zod**: Validação de formulários
- **Vue-reCAPTCHA-v3**: Integração com reCAPTCHA v3
- **Composition API**: API de composição do Vue 3
- **LocalStorage**: Armazenamento local para persistência de dados

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js (v16 ou superior)
- NPM ou Yarn

### Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative a autenticação com Google
3. Copie as credenciais de configuração

### Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/play55-chat.git
cd play55-chat
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
NUXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NUXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse `http://localhost:3000` no seu navegador

## 📱 Responsividade

O aplicativo foi desenvolvido com foco na experiência do usuário em diferentes dispositivos:

- **Desktop**: Layout otimizado para telas maiores
- **Tablet**: Adaptações para telas médias
- **Mobile**: Interface totalmente responsiva para smartphones

## 🔍 Estrutura do Projeto

```
play55-chat/
├── components/           # Componentes Vue
│   ├── Chat.vue          # Componente principal do chat
│   ├── ChatMessage.vue   # Componente de mensagem individual
│   ├── ContactForm.vue   # Formulário de contato com reCAPTCHA
│   ├── Header.vue        # Cabeçalho da aplicação
│   └── ui/               # Componentes de UI reutilizáveis
├── composables/          # Composables Vue
│   ├── useAuth.ts        # Lógica de autenticação
│   ├── useChat.ts        # Lógica do chat
│   └── useFirebase.ts    # Configuração do Firebase
├── plugins/              # Plugins Nuxt
│   └── recaptcha.client.ts  # Configuração do reCAPTCHA
├── pages/                # Páginas da aplicação
├── public/               # Arquivos públicos
└── app.vue               # Componente raiz
```

## 🌟 Recursos Adicionais

- **Persistência de dados**: Mensagens salvas no localStorage
- **Validação de formulários**: Utilizando Vee-Validate e Zod
- **Animações suaves**: Transições e animações para melhor UX
- **Tema consistente**: Design visual coerente em toda a aplicação

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

Desenvolvido como parte do desafio técnico para a Play55.

---

<p align="center">
  <a href="https://play55.com.br">
    <img src="https://i.imgur.com/YourLogoHere.png" alt="Play55 Logo" width="150" />
  </a>
</p>
