import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as express from 'express'

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request & { rawBody?: Buffer }, res: Response, next: NextFunction) {
    express.json({
      verify: (req2: any, _res, buf) => {
        req2.rawBody = buf
      },
    })(req, res, next)
  }
}