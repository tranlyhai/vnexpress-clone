interface user {
  id: string
  name: string
  email: string
  role: string | number
  updated_at: DateConstructor
  created_at: DateConstructor
}
interface data {
  user: user[],
  access_token: string
}

export interface responseSuccess {
  status: string
  message: string
  data: data
}

export interface responseError {
  message: string
  errors?: {
    email?: string[]
    password?: string[]
  }
}
