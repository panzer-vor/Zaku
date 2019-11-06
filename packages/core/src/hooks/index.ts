import { useEffect, useRef } from 'react'
import { setStateAction, setCacheAction } from '../store/index'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../types'
import * as R from 'ramda'

export const _useState = <T = any>(ModuleName: string, initialModuleState: T): [ T, (nextState: T) => void ] => {
  const dispatch = useDispatch()

  const globalState = useSelector((state: GlobalState) => state)

  const moduleState = globalState.app[ModuleName]

  return [
    moduleState || initialModuleState,
    (nextState: any) => {
      dispatch(setCacheAction(
        R.merge(moduleState, nextState),
      ))
      dispatch(setStateAction(
        R.merge(moduleState, nextState),
        ModuleName
      ))
    }
  ]
}

export const _useUpdate = (fn: React.EffectCallback, updateControls?: any[]) => {
  const mounted = useRef(false)

  updateControls ? useEffect(() => {
    !mounted.current ? mounted.current = true : fn()
  }, updateControls) : useEffect(() => {
    !mounted.current ? mounted.current = true : fn()
  })
}

export const _useUnmount = (fn: React.EffectCallback) => {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [])
}

export const _useRender = (fn: React.EffectCallback) => {
  useEffect(() => fn(), [])
}


