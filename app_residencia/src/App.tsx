import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Categories from './pages/Categories';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';

const TabNavigation = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <TabNavigation.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'CategoriesScreen':
              iconName = 'list';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel:false
      })}
      tabBarOptions={{
        activeTintColor: '#9C27B0',
        inactiveTintColor: '#ff0000',
      }}>
      <TabNavigation.Screen name="HomeTab" component={Home} options={{ tabBarStyle:{
        backgroundColor:'pink'
      }}}/>
      <TabNavigation.Screen name="CategoriesScreen" component={Categories} />
    </TabNavigation.Navigator>
  );
};

const DrawerNavigation = createDrawerNavigator();

const NavigationDrawer = () => {
  return (
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen 
      name='TabNavigationScreen' 
      component={BottomTabNavigator}
      options={{ title: 'Home Principal' , 
      headerStyle:{
        backgroundColor: 'red',
        
      } }}
      />
      <DrawerNavigation.Screen
      name='CategoriaDrawerScreen'
      component={Categories}
      options={{ title: 'Categories'}}
      />
    </DrawerNavigation.Navigator>
  )
}

const StackNavigation = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
    <StackNavigation.Navigator>
    <StackNavigation.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackNavigation.Screen
          name="Home"
          component={NavigationDrawer}
          options={{headerShown: false}}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
};
