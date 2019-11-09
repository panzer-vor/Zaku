import { createAppContainer } from 'react-navigation'
import { createStackNavigator, NavigationStackScreenComponent } from 'react-navigation-stack'
import { createBottomTabNavigator   } from 'react-navigation-tabs'
import * as R from 'ramda'

interface LensProp {
  <T, U>(obj: T): U
  set<T, U, V>(val: T, obj: U): V
}

interface TabsMap {
  tabLen: LensProp
  tabName: string
}

const createRouter = (options: any, tabOptions?: any) => {
  const stacks = R.compose(
    R.map(({
      tabName,
      tabLen,
    }: TabsMap) => {
      const tab: {
        [key: string]: React.FC
      } = R.view(tabLen, options)
      const stackMap = {}
      Object.entries(tab).forEach(([key, val]: [string, React.FC]) => {
        stackMap[key] = {
          screen: val
        }
      })
      return {
        tabName,
        stackNavigator: createStackNavigator(stackMap)
      }
    }),
    R.map((v: string): TabsMap => ({
      tabName: v,
      tabLen: R.lensProp(v),
    })),
    R.keys,
  )(options)

  const tabMap = {}

  stacks.forEach(({
    tabName,
    stackNavigator,
  }: {
    tabName: string
    stackNavigator: NavigationStackScreenComponent
  })=> {
    tabMap[tabName] = stackNavigator
  })

  const tabNavigator = createBottomTabNavigator(
    tabMap,
    tabOptions,
  )
  return createAppContainer(tabNavigator)
}

const registryRouter = (components: any[], tabOptions?: any) => {
  const maps: {
    [key: string]: any
  } = {}
  components.forEach(v => {
    const { name } = v.navigationOptions
    const [tabName, stackName] = name.split('/')
    const newName = stackName || tabName
    v.name = newName
    maps[tabName] = R.assoc(newName, v, maps[tabName])
  })
  return createRouter(maps, tabOptions)
}

export default registryRouter
