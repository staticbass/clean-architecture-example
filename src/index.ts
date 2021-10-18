import {HttpServer} from './infrastructure/HttpServer'
import {OrderController} from './adapters/controllers/OrderController'
import {OrdersRepository} from './adapters/repositories/OrdersRepository'
import {PlaceOrderUseCase} from './application/orders/PlaceOrderUseCase'
import {StockService} from './adapters/network/StockService'
import {PGDatabase} from './infrastructure/PGDatabase'

void main()

async function main() {
  // infra
  const pgDatabase = new PGDatabase()

  // repositories
  const ordersRepository = new OrdersRepository(pgDatabase.client)

  // network apis
  const stockService = new StockService()

  // use cases
  const placeOrderUseCase  = new PlaceOrderUseCase(ordersRepository, stockService)

  // controllers
  const orderController = new OrderController(placeOrderUseCase)

  const httpServer = new HttpServer({ order: orderController })

  await httpServer.start(8080)
}