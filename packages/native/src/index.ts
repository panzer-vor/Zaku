import registryRouter from './router'
import {
  _useRouter
} from './hooks/index'
import { AppRegistry } from 'react-native';
import React from 'react'
import Zaku from 'zaku-core'
import { setJSExceptionHandler as _setErrorHandler } from 'react-native-exception-handler'

const connect = {
  useRouter: _useRouter,
  setErrorHandler: _setErrorHandler,
}

const createNativeApp = (appName: string, cp: React.FC) => {
  Zaku.connectPlatform = connect
  AppRegistry.registerComponent(appName, () => cp)
}

export {
  registryRouter,
  createNativeApp,
}