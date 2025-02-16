import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logMessage = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${duration}ms\n`;

      const logFilePath = path.join(__dirname, '..', 'logs', 'requests.log');

      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

      fs.appendFileSync(logFilePath, logMessage);
    });

    next();
  }
}
