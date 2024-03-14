import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import TodoListScreen from './pages/TodoListScreen.tsx';
import TodoDetailScreen from './pages/TodoDetailScreen.tsx';

type RootStackParams = {
  Todo: undefined;
  Detail: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;

const Stack = createStackNavigator<RootStackParams>();
const navigationRef = createNavigationContainerRef<RootStackParams>();

const RootNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={TodoListScreen} />
        <Stack.Screen name="Detail" component={TodoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
