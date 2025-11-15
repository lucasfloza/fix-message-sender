# FIX Message Sender

A modern, scalable React + TypeScript application for sending and managing FIX messages through a Java REST API backend.

## 🚀 Features

- **Modern Stack**: Built with React 19, TypeScript, and Vite for optimal performance
- **Type-Safe**: Fully typed with TypeScript for better development experience
- **API Integration**: Seamless communication with Java REST APIs using Axios
- **Scalable Architecture**: Well-organized folder structure following industry best practices
- **Reusable Components**: Custom UI components built from scratch
- **Routing**: Client-side routing with React Router v6
- **Code Quality**: ESLint and Prettier for consistent code style
- **Environment Configuration**: Easy environment-based configuration

## 📁 Project Structure

```
src/
├── api/              # API client configuration
│   └── client.ts     # Axios instance with interceptors
├── components/       # React components
│   ├── common/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   └── layout/       # Layout components
│       ├── Header.tsx
│       └── Layout.tsx
├── config/           # Application configuration
│   └── env.ts        # Environment variables
├── hooks/            # Custom React hooks
│   ├── useApi.ts     # Hook for API calls
│   └── useAsync.ts   # Hook for async operations
├── pages/            # Page components
│   ├── Home.tsx
│   ├── Messages.tsx
│   └── About.tsx
├── services/         # API service layer
│   └── fixMessageService.ts
├── types/            # TypeScript type definitions
│   ├── api.ts
│   └── fixMessage.ts
├── utils/            # Utility functions
│   ├── helpers.ts
│   └── validation.ts
├── App.tsx           # Main App component with routing
└── main.tsx          # Application entry point
```

## 🛠️ Technology Stack

- **React 19.2** - Latest version with modern features
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7.2** - Fast build tool and development server
- **React Router 7** - Declarative routing for React
- **Axios 1.13** - Promise-based HTTP client
- **ESLint** - Linting utility
- **Prettier** - Code formatter

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasfloza/fix-message-sender.git
cd fix-message-sender
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Java REST API URL:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🔌 API Integration

The application is configured to communicate with a Java REST API. The API client includes:

- **Interceptors**: Automatic request/response handling
- **Authentication**: JWT token support
- **Error Handling**: Centralized error management
- **Type Safety**: Typed request/response models

### Example API Service

```typescript
import fixMessageService from './services/fixMessageService';

// Get all messages
const messages = await fixMessageService.getAll();

// Create a new message
const newMessage = await fixMessageService.create({
  messageType: 'NewOrderSingle',
  sender: 'SENDER_ID',
  target: 'TARGET_ID',
  content: 'FIX message content'
});
```

## 🎨 Component Usage

### Button Component
```tsx
<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

### Input Component
```tsx
<Input
  label="Message Type"
  value={value}
  onChange={handleChange}
  error={errorMessage}
/>
```

### Card Component
```tsx
<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

## 🧪 Custom Hooks

### useApi Hook
```tsx
const { data, loading, error } = useApi(() => 
  fixMessageService.getAll(), 
  []
);
```

### useAsync Hook
```tsx
const { execute, loading, error } = useAsync();
const result = await execute(fixMessageService.create, messageData);
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration files:
- `tsconfig.json` - Base TypeScript config
- `tsconfig.app.json` - App-specific config
- `tsconfig.node.json` - Node-specific config

## 🏗️ Best Practices Implemented

1. **Component Organization**: Separation of common components and layout components
2. **Service Layer**: Dedicated services for API communication
3. **Custom Hooks**: Reusable logic extracted into hooks
4. **Type Safety**: Full TypeScript coverage with interfaces and types
5. **Error Handling**: Centralized error handling in API client
6. **Code Quality**: ESLint and Prettier for consistent code
7. **Environment Config**: Separate configuration for different environments
8. **Modular Structure**: Clear separation of concerns

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Lucas Floza
