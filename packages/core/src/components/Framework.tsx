import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/index'
import FallbackComponent, { FallbackProps } from './Fallback'

export interface FrameworkProps extends FallbackProps{}

export default ({ fallback, children }: FrameworkProps) => (
  <Provider store={store}>
    <FallbackComponent fallback={fallback}>
      { children }
    </FallbackComponent>
  </Provider>
)