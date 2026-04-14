export class PaginatedResult<T> {
  constructor(
    public readonly data: T[],
    public readonly total: number,
    public readonly pageSize: number,
    public readonly totalPages: number
  ) {}
}
