"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayError = void 0;
const domain_error_1 = require("./domain-error");
class GatewayError extends domain_error_1.DomainError {
    constructor(message, statusCode = 502) {
        super(message, statusCode);
    }
}
exports.GatewayError = GatewayError;
