export interface Urls {
  urlId: number
  userId: number // fk
  url: string
  shortened_url: string
  transformed_at: Date
}
