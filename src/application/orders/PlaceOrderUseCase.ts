import {Order, OrderStatus} from '../../domain/Order'
import {IOrdersRepository} from '../ports/IOrdersRepository'
import {IStockService} from '../ports/IStockService'
import {IInputPort} from '../ports/IInputPort'

export interface IPlaceOrderInputData {
  productId: string
}

export interface IPlaceOrderOutputData {
  orderId: string
}

export class PlaceOrderUseCase implements IInputPort<IPlaceOrderInputData, IPlaceOrderOutputData> {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly stockService: IStockService
  ) {}

  public async execute(data: IPlaceOrderInputData): Promise<IPlaceOrderOutputData> {
    const isInStock = await this.stockService.checkInStock(data.productId)

    if (!isInStock) {
      throw new Error(`product with id=${data.productId} is not in stock`)
    }

    const order = new Order({
      status: OrderStatus.PENDING,
      productId: data.productId
    })

    await this.ordersRepository.save(order)

    return {
      orderId: order.id
    }
  }
}