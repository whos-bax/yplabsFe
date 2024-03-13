import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListStack from './src/pages/TodoListStack';
import TodoDetailStack from './src/pages/TodoDetailStack';

type RootStackParams = {
  Todo: undefined;
  Detail: undefined;
};
const Stack = createStackNavigator<RootStackParams>();

function App(): React.JSX.Element {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={TodoListStack} />
        <Stack.Screen name="Detail" component={TodoDetailStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
