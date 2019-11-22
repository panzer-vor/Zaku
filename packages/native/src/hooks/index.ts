import { NavigationParams } from 'react-navigation'

export const _useRouter = ({ navigation }: {navigation: NavigationParams}) => {
  return {
    replace: navigation.navigate,
    push: navigation.push,
    back: navigation.back,
    params: navigation.state.params,
  }
}