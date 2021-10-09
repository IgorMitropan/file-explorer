import * as bunyan from 'bunyan';
import { config } from '../config';

export const logger = bunyan.createLogger({
    name: 'file-explorer',
    level: config.logLevel,
    serializers: bunyan.stdSerializers
});
