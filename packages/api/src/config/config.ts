export class Configuration {
  public readonly env: string = process.env.NODE_ENV ?? "DEV";
  public readonly database: string =
    process.env.DATABASE_URL ?? "postgres://psql:psql@127.0.0.1:5432/psql";
  public readonly port: string | number = process.env.PORT ?? 8000;
  public readonly swaggerPath: string = process.env.SWAGGER_PATH ?? "api";

  private static instance: Configuration;
  private constructor() {}

  public static instanceOf(): Configuration {
    if (this.instance === undefined) this.instance = new Configuration();
    return this.instance;
  }
}
