import { store, setStateAction } from './store/index'
import { Provider, useSelector } from 'react-redux'
import * as React from "react"
import ajax from './ajax'
import { 
  _useState as useState,
  _useUnMount as useUnMount,
  _useRender as useRender,
  _useUpdate as useUpdate,
} from './hooks/index'
import { GlobalState } from './types'

const LoadingWrapper = (props: {
  fallback?: JSX.Element
  children: JSX.Element
}) => {
  const loadingStatus = useSelector((state: GlobalState) => state.loadingStatus)
  return (
    <React.Fragment>
      { props.children }
      {
        loadingStatus ? props.fallback : null
      }
    </React.Fragment>
  )
}

const FrameworkComponent = (props: {
  fallback?: JSX.Element
  children: JSX.Element
}) => {
  return (
    <Provider store={store}>
      <LoadingWrapper fallback={props.fallback}>
        { props.children }
      </LoadingWrapper>
    </Provider>
  )
}

const Zaku = {
  connectPlatform: {},
  useState,
  useUnMount,
  useRender,
  useUpdate,
  setStateAction,
  ajax,
  FrameworkComponent,
  useRouter: (navigation: any) => {
    const connect: any = Zaku.connectPlatform
    return connect.useRouter(navigation)
  },
  setErrorHandler: (...params: any) => {
    const connect: any = Zaku.connectPlatform
    return connect.setErrorHandler(...params)
  },
  getStore: () => store,
}

export default Zaku


