"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const domain_error_1 = require("./domain-error");
class ValidationError extends domain_error_1.DomainError {
    constructor(message, statusCode = 400) {
        super(message, statusCode);
    }
}
exports.ValidationError = ValidationError;
