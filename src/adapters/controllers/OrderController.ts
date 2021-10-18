import {OrderValidator} from '../validators/OrderValidator'
import {IInputPort} from '../../application/ports/IInputPort'
import {IPlaceOrderInputData, IPlaceOrderOutputData} from '../../application/orders/PlaceOrderUseCase'

interface IControllerRequest {
  body: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class OrderController {
  constructor(
    private readonly placeOrderUseCase: IInputPort<IPlaceOrderInputData, IPlaceOrderOutputData>,
  ) {}

  public async placeOrder(req: IControllerRequest): Promise<IControllerResponse> {
    const placeOrderInputData = OrderValidator.validatePlaceOrder(req.body)
    const placeOrderOutputData = await this.placeOrderUseCase.execute(placeOrderInputData)

    return {
      status: 200,
      body: placeOrderOutputData
    }
  }
}