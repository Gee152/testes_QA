export interface UserCredentials {
  userName: string
  password: string
}

export interface UserResponse {
  userID: string
  username: string
  books: Book[]
}

export interface TokenResponse {
  token: string
  expires: string
  status: string
  result: string
}

export interface Book {
  isbn: string
  title: string
  subTitle: string
  author: string
  publish_date: string
  publisher: string
  pages: number
  description: string
  website: string
}

export interface BooksResponse {
  books: Book[]
}

export interface RentBooksPayload {
  userId: string
  collectionOfIsbns: IsbnPayload[]
}

export interface IsbnPayload {
  isbn: string
}
