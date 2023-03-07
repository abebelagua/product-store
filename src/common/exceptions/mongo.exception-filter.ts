import {
    ArgumentsHost,
    BadRequestException,
    InternalServerErrorException,
    Catch,
    Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MongoError } from 'mongodb';

import { Message } from '../enums';

@Catch(MongoError)
export class MongoExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(MongoExceptionsFilter.name);

    catch(exception: MongoError, host: ArgumentsHost) {
        this.logger.error(exception);
        console.log(exception);
        switch (exception.code) {
            case 11000:
                super.catch(
                    new BadRequestException(
                        Message.MONGO_DUPLICATE_UNIQUE_FIELD(
                            Object.keys(exception['keyValue']).at(0),
                        ),
                    ),
                    host,
                );
            default:
                super.catch(
                    new InternalServerErrorException(exception.message),
                    host,
                );
        }
    }
}
