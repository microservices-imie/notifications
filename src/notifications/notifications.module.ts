import { RabbitmqService } from './services/rabbitmq/rabbitmq.service';
import { Module, HttpModule } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications/notifications.service';
import { MailerService } from './services/mailer/mailer.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    NotificationsController,
  ],
  providers: [
    NotificationsService,
    MailerService,
    RabbitmqService,
  ],
})
export class NotificationsModule { }
