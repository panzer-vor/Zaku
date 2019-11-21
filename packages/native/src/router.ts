import { createAppContainer, NavigationTabRouterConfig } from 'react-navigation'
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

interface Component<P = {}> {
  (props: Readonly<P>): JSX.Element
  navigationOptions: {
    name: string
    title: string
  }
}

const createStackRouter = (components: Component[]) => {
  const maps = {}
  components.forEach(v => {
    const { name } = v.navigationOptions
    maps[name] = {
      screen: v
    }
  })
  return createAppContainer(createStackNavigator(
    maps,
    {
      initialRouteName: components[0].navigationOptions.name
    }
  ))
}

const createTabRouter = (components: Component[], tabOptions?: NavigationTabRouterConfig) => {
  const maps: {
    [key: string]: any
  } = {}
  components.forEach(v => {
    const { name } = v.navigationOptions
    const [tabName, stackName] = name.split('/')
    const newName = stackName || tabName
    maps[tabName] = R.assoc(newName, v, maps[tabName])
  })
  const stacks = R.compose(
    R.map(({
      tabName,
      tabLen,
    }: TabsMap) => {
      const tab: {
        [key: string]: React.FC
      } = R.view(tabLen, maps)
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
  )(maps)

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

const registryRouter = (components: Component[], tabOptions?: NavigationTabRouterConfig) => {
  if (components.some(v => v.navigationOptions.name.indexOf('/') > -1)) {
    return createTabRouter(components, tabOptions)
  } else {
    return createStackRouter(components)
  }
}

export default registryRouter
