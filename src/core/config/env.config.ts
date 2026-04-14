import * as dotenv from 'dotenv';

// Carrega as variáveis do .env na raiz do projeto
 // Assume que irá rodar da pasta dist ou src, ajustar caso precise
// Na verdade, 'dotenv.config()' sem path pega do diretório atual de execução que é a raiz
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  API_URL: process.env.API_URL || 'http://localhost:3000',
  OAUTH_USERNAME: process.env.OAUTH_USERNAME || '',
  OAUTH_PASSWORD: process.env.OAUTH_PASSWORD || '',
  // Adicione outras envs aqui
};
