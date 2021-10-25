import {Order} from '../../domain/Order'

export interface IOrdersRepository {
  save(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
