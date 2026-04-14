"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_config_1 = require("./core/config/env.config");
const PORT = env_config_1.ENV.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`[Server] API is running on port ${PORT}`);
    console.log(`[Server] Core HTTP Client initialized with external URL: ${env_config_1.ENV.API_URL}`);
});
