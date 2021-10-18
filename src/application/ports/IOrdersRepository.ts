import {Order} from '../../domain/Order'

export interface IOrdersRepository {
  save(Order: Order): Promise<void>
  delete(Order: Order): Promise<void>
}