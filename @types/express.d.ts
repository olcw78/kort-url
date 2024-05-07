import { Knex } from 'knex'
import pino from 'pino'
import { RedisClientType } from 'redis'

declare global {
  namespace Express {
    export interface Locals {
      log: pino.BaseLogger
      redis: RedisClientType
      knex: Knex
      reqTime: ReturnType<import('perf_hooks').Performance['now']>
    }
  }
}
