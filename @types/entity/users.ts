export interface Users {
  userId: number
  nickname: string
  password: string
  email: string
  created_at: Date
  deleted_at?: Date
}
