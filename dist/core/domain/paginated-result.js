"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResult = void 0;
class PaginatedResult {
    data;
    total;
    pageSize;
    totalPages;
    constructor(data, total, pageSize, totalPages) {
        this.data = data;
        this.total = total;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
    }
}
exports.PaginatedResult = PaginatedResult;
