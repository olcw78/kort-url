import { Knex } from 'knex'
import pino from 'pino'
import { RedisClientType } from 'redis'

declare global {
  namespace Express {
    export interface Request {
      log: pino.BaseLogger
      redis: RedisClientType
      reqTime: ReturnType<import('perf_hooks').Performance['now']>
    }

    export interface Locals {
      knex: Knex
    }
  }
}
