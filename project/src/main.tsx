import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from './services/_config/configProvider';

(async () => {
  try {
    // Inicializa o ConfigProvider
    await ConfigProvider.initialize();
    console.log('Configuração carregada:', ConfigProvider.config);

    // Renderiza o aplicativo após carregar as configurações
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    // Lida com erros na inicialização do ConfigProvider
    console.error('Erro ao carregar a configuração:', error);

    // Renderiza uma mensagem de erro ou redireciona para uma página apropriada
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <div>
          <h1>Erro ao carregar a configuração</h1>
          <p>Por favor, tente novamente mais tarde.</p>
        </div>
      </React.StrictMode>
    );
  }
})();
