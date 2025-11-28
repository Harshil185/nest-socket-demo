import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'index.html'));
  }

  @Get('*')
  serveStatic(@Res() res: Response, @Req() req: Request) {
    const path = req.path;
    const allowedExtensions = ['.css', '.js', '.png', '.ico', '.jpg', '.jpeg', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
    const isStaticFile = allowedExtensions.some(ext => path.endsWith(ext));
    
    if (isStaticFile) {
      return res.sendFile(join(process.cwd(), path));
    }
    // For any other route, serve the index.html (client-side routing)
    return res.sendFile(join(process.cwd(), 'index.html'));
  }
}
