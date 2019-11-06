import registryRouter from './router'
import {
  _useRouter
} from './hooks/index'
import { AppRegistry } from 'react-native';
import React from 'react'
import Zaku from '@zaku/core'
import { setJSExceptionHandler as setErrorHandler } from 'react-native-exception-handler'

const connectPlatform = {
  useRouter: _useRouter
}

const createNativeApp = (appName: string, cp: React.FC) => {
  Zaku.connectPlatform = connectPlatform
  AppRegistry.registerComponent(appName, () => cp)
}

export {
  registryRouter,
  createNativeApp,
  setErrorHandler,
}