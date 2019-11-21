import { ajax, AjaxRequest } from 'rxjs/ajax'
import { Observable } from 'rxjs'
import * as Ramda from 'ramda'
import { of } from 'rxjs'
import { store } from './store/index'
import { map, tap } from 'rxjs/operators'
import { setLoadingAction } from './store/index'
import { AjaxConfig } from './types'

const R: any = Ramda

const getCacheKey = R.compose(
  JSON.stringify,
  R.values,
)

const handleGetData = R.compose(
  R.join('&'),
  R.map(
    R.join('=')
  ),
  R.toPairs,
)

const ajaxJson = (defaultConfig: AjaxRequest) => (config: AjaxConfig): Observable<{
  originalEvent?: Event
  xhr?: XMLHttpRequest
  request?: AjaxRequest
  status?: number
  response?: any
  responseText?: string
  responseType?: string
  cacheKey: string
  cacheData?: any
}> => {
  const data = config.data
  const method = config.method || defaultConfig.method

  if (method === 'GET') {
    const headerQuery = handleGetData(config.data)
    config.url += headerQuery ? `?${headerQuery}` : headerQuery
  } else {
    config.body = data
    if (data instanceof FormData) {
      if (!config.headers) {
        config.headers = {}
      } 
      config.headers['Content-Type'] = 'multipart/form-data'
    }
  }

  const cacheKey: string = getCacheKey(config)
  const cacheData = store.getState().cache[cacheKey]

  if (method === 'GET' && cacheData) {
    return of({
      cacheData,
      cacheKey,
    });
  }

  config.loading && store.dispatch(setLoadingAction(true))

  return ajax({
    ...defaultConfig,
    ...config,
    url: defaultConfig.url! + config.url,
  }).pipe(
    tap(() => {
      store.dispatch(setLoadingAction(false))
    }),
    map(res => ({
      cacheKey,
      ...res
    }))
  )
}

export default ajaxJson