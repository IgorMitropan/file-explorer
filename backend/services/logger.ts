import * as bunyan from 'bunyan';
import { config } from '../config';

export const logger = bunyan.createLogger({
    name: process.env.npm_package_name,
    level: config.logLevel,
    serializers: bunyan.stdSerializers
});
