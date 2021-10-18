export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface IOrderProps {
  productId: string
  status: OrderStatus
}

export class Order {

  constructor(private readonly props: IOrderProps, private readonly _id: string = Order.genId()) {}

  get id(): string {
    return this._id
  }

  get productId(): string {
    return this.props.productId
  }

  get status(): OrderStatus {
    return this.props.status
  }

  public accept() {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error('could not reject processed order')
    }
    this.props.status = OrderStatus.ACCEPTED
  }

  public reject() {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error('could not reject processed order')
    }
    this.props.status = OrderStatus.REJECTED
  }

  private static genId(): string {
    // can generate any kind of unique id
    return 'uuid'
  }
}
