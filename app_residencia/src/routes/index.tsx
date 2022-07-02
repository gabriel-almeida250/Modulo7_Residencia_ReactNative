import React, { useContext } from "react";
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Categories from "../pages/Categories";
import { ProdutoCategoria } from "../pages/ProdutoCategoria";
import Produto from "../pages/Produto";
import { SplashScreen } from "../pages/SplashScreen";
import Carrinho from "../pages/Cart";
import { CarrinhoContext } from "../context/CarrinhoContext";
import { withBadge } from "react-native-elements";
import { Badge } from "react-native-elements";

const TabNavigation = createBottomTabNavigator();
const BottomTabNavigator = () => {

  const { contaQuantidadeProdutos } = useContext(CarrinhoContext)

  const BadgeIcone = withBadge(contaQuantidadeProdutos())(Icon);

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
        activeTintColor: '#000000',
        inactiveTintColor: '#000000',
      }}>
      <TabNavigation.Screen name="HomeTab" component={Home} options={{ tabBarStyle:{
        backgroundColor:'red',
      }}}/>
      <TabNavigation.Screen name="CategoriesScreen" component={Categories} />
      <TabNavigation.Screen name="CarrinhoScreen" component={Carrinho} options={{
        tabBarIcon: () => (
          <BadgeIcone name='shopping-cart' type='font-awesome' size={24} color='black' />
          )
      }} />

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
      headerTintColor: 'black',
      drawerStyle:{
        backgroundColor: 'red'
      },
      drawerActiveTintColor: 'green',
      drawerInactiveTintColor: 'pink',
      headerStyle:{
        backgroundColor: 'red',
      } }}
  
      />
      <DrawerNavigation.Screen
      name='CategoriaDrawerScreen'
      component={Categories}
      options={{ title: 'Categories', 
      drawerActiveTintColor: 'green',
      drawerInactiveTintColor: 'pink',
    }}
      />
        <DrawerNavigation.Screen
      name='CarrinhoScreen'
      component={Carrinho}
      options={{ title: 'Carrinho', 
      drawerActiveTintColor: 'green',
      drawerInactiveTintColor: 'pink',
    }}
      />
    </DrawerNavigation.Navigator>
  )
}

const StackNavigation = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
        <StackNavigation.Navigator>
        <StackNavigation.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
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
         <StackNavigation.Screen
          name="Categories"
          component={Categories}
          options={{headerShown: false}}
        />
        <StackNavigation.Screen
          name="ProdutoCategoriaScreen"
          component={ProdutoCategoria}
          options={{headerShown: true, title:'Produto Categoria'}}
        />
         <StackNavigation.Screen
          name="ProdutoScreen"
          component={Produto}
          options={{headerShown: true, title:'Produto Categoria'}}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
    );
}

export default Routes;