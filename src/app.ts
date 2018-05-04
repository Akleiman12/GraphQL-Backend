import * as express from 'express'
import * as cors from 'cors'

class App {
  public express

  constructor () {
    this.express = express()
    this.express.use(cors())
  }


}

export default new App().express