import app from './app';
import { ENV } from './core/config/env.config';

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Server] API is running on port ${PORT}`);
  console.log(`[Server] Core HTTP Client initialized with external URL: ${ENV.API_URL}`);
  console.log(`[Server] API-Documentation in 192.168.0.18:4313/api-docs`)
});
