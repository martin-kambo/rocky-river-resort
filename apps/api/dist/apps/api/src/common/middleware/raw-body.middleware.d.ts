import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RawBodyMiddleware implements NestMiddleware {
    use(req: Request & {
        rawBody?: Buffer;
    }, res: Response, next: NextFunction): void;
}
