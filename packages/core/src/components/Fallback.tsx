import * as React from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../types'

export interface FallbackProps {
  fallback?: JSX.Element
  children: JSX.Element
}

export default ({ fallback, children }: FallbackProps) => {
  const loadingStatus = useSelector((state: GlobalState) => state.loadingStatus)
  return (
    <React.Fragment>
      { children }
      { loadingStatus && fallback }
    </React.Fragment>
  )
}