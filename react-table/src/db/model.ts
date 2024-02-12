export interface Row {
  id: number
  name: string
  email: string
  age: number
}

export interface SortContainer {
  name?: number
  email?: number
  age?: number
}

export type OrderByColumn = 'name' | 'email' | 'age';
export type OrderDirection = 'asc' | 'desc';