import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoListScreen from './src/pages/TodoListScreen.tsx';
import TodoDetailScreen from './src/pages/TodoDetailScreen.tsx';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

type RootStackParams = {
  Todo: undefined;
  Detail: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;

type NavigateType = {
  name: string;
  params: object;
};

const Stack = createStackNavigator<RootStackParams>();
const navigationRef = createNavigationContainerRef<RootStackParams>();

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     // Perform navigation if the react navigation is ready to handle actions
//     navigationRef.navigate(name, params);
//   } else {
//     // You can decide what to do if react navigation is not ready
//     // You can ignore this, or add these actions to a queue you can call later
//   }
// }

function App(): React.JSX.Element {
  // const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={TodoListScreen} />
        <Stack.Screen name="Detail" component={TodoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
