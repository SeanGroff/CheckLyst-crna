import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import { Provider } from 'unstated'

import '../../ReactotronConfig'
import HomeScreen from '../screens/HomeScreen'
import CheckLystsScreen from '../screens/CheckLystsScreen'
import ItemsContainer from '../state/ItemsContainer'
import LystDetailScreen from '../screens/LystDetailScreen'
import AuthScreen from '../screens/AuthScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const LystStack = createStackNavigator({
  Saved: CheckLystsScreen,
  LystDetail: LystDetailScreen,
})

const TabStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Saved: LystStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const icon = {
          name: '',
          size: 0,
        }

        if (routeName === 'Home') {
          icon.name = 'home'
          icon.size = 25
        } else if (routeName === 'Saved') {
          icon.name = 'tasks'
          icon.size = 20
        }

        return <FontAwesome name={icon.name} size={icon.size} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'dodgerblue',
      inactiveTintColor: 'lightgray',
    },
  }
)

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Home: TabStack,
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)

const SwitchStack = createSwitchNavigator({
  Loading: AuthLoadingScreen,
  App: TabStack,
  Auth: AuthStack,
})

const items = new ItemsContainer()

export default function RootComponent() {
  return (
    <Provider inject={[items]}>
      <SwitchStack />
    </Provider>
  )
}
