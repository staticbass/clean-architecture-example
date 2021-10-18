import {IStockService} from '../../application/ports/IStockService'
import axios from 'axios'

export class StockService implements IStockService {
  public async checkInStock(productId: string): Promise<boolean> {
    const response = await axios.get<number>(`https://api-stock.domain.com/products/${productId}/count`, {
      headers: {
        'Authorization': 'api-key'
      }
    })

    return response.data > 0
  }
}