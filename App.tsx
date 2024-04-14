import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import Screen1 from './src/Screen1';
import RegistrationForm from './src/Test';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={RegistrationForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
