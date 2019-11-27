# Overview
Zaku is a frontend framework based on react, redux, react-redux,rxjs it's designed to support our own projects.

# Platform
native -> zaku-native

# USAGE
```
npm i react react-redux redux ramda rxjs zaku-core -S
npm i @types/ramda @types/react @types/react-redux -D
// native
npm i zaku-native react-native -S
npm i @types/react-native -D
```


# API
## hooks
```useState```
```javascript
const [state, setState] = useState('ModuleName', state)
```
```useUnmount``` on component unmount
```javascript
useUnmount(() => unmountFn)
```
```useRender``` on component render
```useUpdate``` on component update
```javascript
useUpdate(() => updateFn, [updateKey])
```
```useRouter``` component router
eg.
```
const router = useRouter(props)
router.replace('PageName', ParamsObject)
router.push('PageName', ParamsObject)
router.back()
router.params
```
## ajax
```cache data```
```javascript
import { ajax } from 'zaku-core' // rxjs ajax
import { map } from 'rxjs/operators'
import { AjaxConfig } from 'zaku-core/lib/types'

const ajaxInstance = (method: string) => ajax({
  method,
  url: 'http://xxx.xxxx/',
})

export const get = (url: string, config?: AjaxConfig) => ajaxInstance('GET')({
  url,
  ...config,
}).pipe(
  map(v => v.cacheData ? ({
    cacheKey: v.cacheKey,
    ...v.cacheData,
  }) : ({
    cacheKey: v.cacheKey,
    ...v.response.data,
  }))
)

export const post = (url: string, config?: AjaxConfig) => ajaxInstance('POST')({
  url,
  ...config,
}).pipe(
  map(v => ({
    ...v.response.data
  }))
)

// another place
import { get } from './ajax'
get(
  'url', 
  data, 
  // FrameworkComponent fallback
  isLoading
)
```
## Router
important：

navigationOptions must be setted
```javascript
const home = () => <View></View>
home.navigationOptions = {
  title: "Home",
  name: "home",
}

const list = (props) => {
  const router = useRouter(props)
  router.push('home', ParamsObject) // to Home Page
}
```
navigationOptions setting
```javascript
{
  title: Page Name, 
  name: if tab then "Router Name" else "Tab Router Name" + "/" + "Router Name" 
}
```
registry
```javascript
import HomeScreen from './home'
import ListScreen from './list'
import { registryRouter } from 'zaku-native'

export default registryRouter(
  [
    HomeScreen,
    ListScreen,
  ],
)
```
## Framework
```javascript
import { FrameworkComponent } from 'zaku-core'
export default () => {
  return (
    // fallback connect ajax isLoading
    <FrameworkComponent fallback={<Text>11111111111</Text>}>
      <Routes />
    </FrameworkComponent>  
  )
}
```
