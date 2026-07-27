import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SavedRouteModule } from './saved-route/saved-route.module';

@Module({
  imports: [SavedRouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
