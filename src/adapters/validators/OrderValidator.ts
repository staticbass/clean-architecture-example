import {IPlaceOrderInputData} from '../../application/orders/PlaceOrderUseCase'

export class OrderValidator {
  public static validatePlaceOrder(payload: Record<string, unknown>): IPlaceOrderInputData {
    if (typeof payload.productId !== 'string') {
      throw new Error('validation error')
    }

    return {
      productId: payload.productId
    }
  }
}