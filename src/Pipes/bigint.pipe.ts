import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BigIntPipe implements PipeTransform {
  transform(value: any) {
    return BigInt(value);
  }
}
