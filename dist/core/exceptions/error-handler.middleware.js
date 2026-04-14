"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const domain_error_1 = require("./domain-error");
function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof domain_error_1.DomainError) {
        res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
        });
        return;
    }
    // Erros inesperados
    console.error('[Unhandled Error]', err);
    res.status(500).json({
        error: 'InternalServerError',
        message: 'An unexpected error occurred.',
    });
}
