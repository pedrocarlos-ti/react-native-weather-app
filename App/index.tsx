import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Image, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import Details from './screens/Details';
import Search from './screens/Search';

enableScreens();

const Stack = createStackNavigator();

const HeaderRightButton = ({ onPress, style = {}, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 10,
          width: 20,
          height: 20,
          tintColor: 'white'
        },
        style
      ]}
    />
  </TouchableOpacity>
);

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ navigation }) => ({
          title: 'Detalhes',
          headerTitleAlign: 'center',
          headerRight: () => (
            <>
              <StatusBar style="light" />
              <HeaderRightButton
                icon={require('./assets/search.png')}
                onPress={() => navigation.push('Search')}
              />
            </>
          ),
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#3145b7',
            borderBottomColor: '#3145b7'
          }
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={({ navigation }) => ({
          gestureEnabled: true,
          title: 'Procurar',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 0,
          headerLeft: () => null,
          headerRight: () => (
            <HeaderRightButton
              icon={require('./assets/close.png')}
              onPress={() => navigation.pop()}
              style={{ tintColor: 'black' }}
            />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppStack;
