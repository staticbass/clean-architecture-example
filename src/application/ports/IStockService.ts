export interface IStockService {
  checkInStock(productId: string): Promise<boolean>
}