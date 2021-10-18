import * as pg from 'pg'

export class PGDatabase {
  public readonly client: pg.Client

  constructor() {
    this.client = new pg.Client({
      host: 'my.database-server.com',
      port: 5334,
      user: 'database-user',
      password: 'secretpassword!!',
    })
  }

  public async disconnect() {
    await this.client.end()
  }
}