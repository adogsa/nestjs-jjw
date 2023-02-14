import {
  CACHE_MANAGER,
  CacheInterceptor,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { ErrSmsThirdParty } from './sms.error';
import { firstValueFrom } from 'rxjs';

const ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NAVER_SECRET_KEY;
const SMS_SERVICE_ID = process.env.NAVER_SMS_SERVICE_ID;

@Injectable()
@UseInterceptors(CacheInterceptor)
export class SmsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  private makeSignitureForSMS(): string {
    const message = [];
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    const timeStamp = Date.now().toString();
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';

    message.push(method);
    message.push(space);
    message.push(`/sms/v2/services/${SMS_SERVICE_ID}/messages`);
    message.push(newLine);
    message.push(timeStamp);
    message.push(newLine);
    message.push(ACCESS_KEY_ID);
    const signiture = hmac.update(message.join('')).digest('base64');
    return signiture.toString();
  }

  private makeRand6Num(): number {
    const randNum = Math.floor(Math.random() * 1000000);
    return randNum;
  }

  async sendSMS(phoneNumber: string) {
    const signiture = this.makeSignitureForSMS();
    await this.cacheManager.del(phoneNumber);
    const checkNumber = this.makeRand6Num().toString().padStart(6, '0');

    const body = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: '발신번호',
      content: `인증번호는 [${checkNumber}] 입니다.`,
      messages: [
        {
          to: phoneNumber,
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': Date.now().toString(),
      'x-ncp-iam-access-key': ACCESS_KEY_ID,
      'x-ncp-apigw-signature-v2': signiture,
    };

    await firstValueFrom(
      this.httpService.post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
        body,
        { headers: headers },
      ),
    )
      .then((value) => {
        const result = value;
      })
      .catch((err) => {
        console.log(err.message);
        throw new ErrSmsThirdParty(err.message);
      });

    await this.cacheManager.set(phoneNumber, checkNumber);
    return 'send end!';
  }

  async checkSms(phoneNumber: string, inputNumber: string): Promise<boolean> {
    const sentNumber = await this.cacheManager.get(phoneNumber);
    if (sentNumber === inputNumber) {
      await this.cacheManager.set(`${phoneNumber}:checkSms`, 'true');
      return true;
    }
    return false;
  }

  async testSms(phoneNumber: string): Promise<void> {
    await this.cacheManager.set(`${phoneNumber}:checkSms`, 'true');
  }
}
