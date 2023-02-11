import { Module } from '@nestjs/common';
import { MyTestService } from './my-test.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { LoggerModule } from '../../../../common/logger/logger.module';
import { MyTestController } from './rest/my-test.controller';
import { DB1_NANE } from '../config/mikroorm.config';
import { MyTest } from './repository/my-test.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([MyTest], DB1_NANE),
    // LoggerModule
  ],
  providers: [MyTestService],
  exports: [MyTestService],
  controllers: [MyTestController],
})
export class MyTestModule {}
