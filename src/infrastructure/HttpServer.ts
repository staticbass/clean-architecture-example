import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import {OrderController} from '../adapters/controllers/OrderController'

export interface IControllers {
  order: OrderController
}

export class HttpServer {
  private readonly app: express.Express
  private readonly router: express.Router
  private server: http.Server

  constructor(controllers: IControllers) {
    this.app = express()
    this.router = express.Router()

    this.router.post('/orders', this.toHandler(controllers.order.placeOrder.bind(controllers.order)))

    this.app.use(bodyParser.json())
    this.app.use(this.router)
    this.app.use(HttpServer.handleError)
  }

  public async start(port: number) {
    this.server = this.app.listen(port, () => console.log(`server has started on ${port}`))
  }

  public async stop() {
    if (this.server) {
      this.server.close()
    }
  }

  private toHandler(fn) {
    return async (req, res, next) => {
      try {
        const result = await fn({ body: req.body, params: req.params })
        res.json(result)
      } catch (e) {
        next(e)
      }
    }
  }

  private static handleError(err, req, res, next) {
    res.status(500).json({ message: err.message })
  }
}