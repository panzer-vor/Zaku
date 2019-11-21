import { store, setStateAction } from './store/index'
import ajax from './ajax'
import { 
  _useState as useState,
  _useUnMount as useUnMount,
  _useRender as useRender,
  _useUpdate as useUpdate,
} from './hooks/index'
import FrameworkComponent from './components/Framework'

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


