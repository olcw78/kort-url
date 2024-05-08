import { Urls } from './entity/urls'
import { Users } from './entity/users'

declare module 'knex/types/tables' {
  interface Tables {
    users: Users
    urls: Urls
  }
}
