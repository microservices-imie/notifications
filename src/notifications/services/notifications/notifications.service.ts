import { NotificationModel } from './../../models/notification.model';
import { Injectable, HttpService, Logger } from '@nestjs/common';

import { UserModel } from './../../models/users.model';

import { MailerService } from '../../services/mailer/mailer.service';
import { RabbitmqService } from '../../services/rabbitmq/rabbitmq.service';
import { RabbitMQClient } from '../rabbitmq/rabbitmq-client';

@Injectable()
export class NotificationsService {
  // private client = new RabbitMQClient('amqp://localhost:5672', 'Delivery mail');

  constructor(
    private readonly httpService: HttpService,
    private mailerService: MailerService,
    private readonly rabbitmqService: RabbitmqService,
  ) { }

  async send(tracking, userId) {
    const user = (await this.httpService.get<UserModel>('http://users:3000').toPromise()).data;

    const mailOptions = {
      from: '"Package Deliverer 📦" <package@deliverer.com>',
      to: user.email,
      subject: `Your package ${tracking.name} is now in ${tracking.location}`,
      text: `Hi ${user.firstname} \n Your package ${tracking.name} is now in ${
        tracking.location
        }`,
      html: `Hi ${user.firstname} <br> Your package ${
        tracking.name
        } is now in ${tracking.location}`,
    };

    return this.mailerService.sendMail(mailOptions);
  }

  async listen() {
    this.rabbitmqService.listenChan(
      'Delivery mail',
      message => {
        Logger.log(message);
        const decodedMessage = JSON.parse(
          message.content.toString(),
        ) as NotificationModel;
        this.send(
          decodedMessage.tracking,
          decodedMessage.user.id,
        );
      },
    );

    // this.client.;
  }
}
