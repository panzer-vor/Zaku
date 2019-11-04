import { AjaxRequest } from 'rxjs/ajax'

export interface GlobalState {
  loadingStatus: boolean
  cache: {
    [key: string]: any
  }
  app: {
    [key: string]: any
  }
}

export interface Action<T> {
  type: Symbol
  payload: T
}

export interface AjaxConfig extends AjaxRequest {
  loading: boolean
  data?: Object | FormData
} 
