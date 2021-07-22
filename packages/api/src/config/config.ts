export class Configuration {
  private static readonly _env: string = process.env.NODE_ENV ?? 'DEV'

  private static readonly _databaseUrl: string = process.env.DATABASE_URL ?? 'postgres://psql:psql@127.0.0.1:5432/psql'

  private static instance: Configuration
  private constructor () {}

  public static instanceOf (): Configuration {
    if (this.instance === undefined) this.instance = new Configuration()
    return this.instance
  }

  public get env (): string {
    return Configuration._env
  }

  public get database (): string {
    return Configuration._databaseUrl
  }
}
