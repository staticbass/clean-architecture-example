import {Order} from '../../domain/Order'
import {IOrdersRepository} from '../../application/ports/IOrdersRepository'
import * as pg from 'pg'

export class OrdersRepository implements IOrdersRepository {
  constructor(private readonly db: pg.Client) {}

  public async save(entity: Order): Promise<void> {
    await this.db.query('insert ...')
  }

  public async delete(entity: Order): Promise<void> {
    await this.db.query('delete ...')
  }
}