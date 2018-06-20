import { ClientProxy } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';

import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  connect(): Promise<amqp.Channel> {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost:5672')
        .then(connection => connection.createChannel())
        .then(chan => resolve)
        .catch(error => reject);
    });
  }

  listenChan(channelName: string, callback): Promise<amqp.Replies.Consume> {
    return new Promise((resolve, reject) => {
      this.connect()
        .then(chan => chan.consume(channelName, callback, { noAck: true }))
        .then(result => {
          Logger.log('callback : ', callback);
          resolve(result);
        })
        .catch(error => reject);
    });
  }

}
