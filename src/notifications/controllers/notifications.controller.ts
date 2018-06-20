import { NotificationsService } from './../services/notifications/notifications.service';
import { Controller } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {
    this.notificationsService.listen();
  }
}
