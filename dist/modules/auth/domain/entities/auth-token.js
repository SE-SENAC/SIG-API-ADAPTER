"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
class AuthToken {
    accessToken;
    tokenType;
    expiresIn;
    refreshToken;
    constructor(accessToken, tokenType, expiresIn, refreshToken) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.refreshToken = refreshToken;
    }
    // Ajuda na logica de cache em memoria
    createdAt = new Date();
    isExpired() {
        const now = new Date();
        // Dá uma folga de 30 segundos
        const expirationDate = new Date(this.createdAt.getTime() + (this.expiresIn - 30) * 1000);
        return now >= expirationDate;
    }
}
exports.AuthToken = AuthToken;
