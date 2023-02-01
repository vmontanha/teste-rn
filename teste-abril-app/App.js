import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/pages/HomeScreen';
import Search from './src/pages/Search';
import Repository from './src/pages/Repository';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Busca" options={{ headerBackVisible: false, headerShown: false }} component={Search} />
        <Stack.Screen name="Repository" options={{ title: '' }} component={Repository} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;