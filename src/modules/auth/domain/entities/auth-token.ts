export class AuthToken {
  constructor(
    public readonly accessToken: string,
    public readonly tokenType: string,
    public readonly expiresIn: number,
    public readonly refreshToken?: string | null
  ) {}

  // Ajuda na logica de cache em memoria
  public readonly createdAt: Date = new Date();

  public isExpired(): boolean {
    const now = new Date();
    // Dá uma folga de 30 segundos
    const expirationDate = new Date(this.createdAt.getTime() + (this.expiresIn - 30) * 1000);
    return now >= expirationDate;
  }
}
