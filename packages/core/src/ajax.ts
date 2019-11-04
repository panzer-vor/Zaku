import { ajax, AjaxRequest } from 'rxjs/ajax'
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

const getCacheData = R.compose(
  R.flip(
    R.prop(store.getState().cache),
  ),
  getCacheKey,
)

const handleGetData = R.compose(
  R.join('&'),
  R.map(
    R.join('=')
  ),
  R.toPairs,
)

const ajaxJson = (defaultConfig: AjaxRequest) => (config: AjaxConfig) => {
  const cacheData = getCacheData(config)

  const data = config.data
  const method = config.method || defaultConfig.method

  if (method === 'GET') {
    if (cacheData) return of(cacheData)
    const headerQuery = handleGetData(config.data)
    config.url += headerQuery ? `?${headerQuery}` : headerQuery
  } else {
    config.body = data
    if (data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
  }

  config.loading ? store.dispatch(setLoadingAction(true)) : null

  return ajax({
    ...defaultConfig,
    ...config,
    url: defaultConfig.url + config.url,
  }).pipe(
    tap(() => {
      store.dispatch(setLoadingAction(false))
    }),
    map(res => ({
      cacheKey: getCacheKey(config),
      ...res
    }))
  )
}

export default ajaxJson