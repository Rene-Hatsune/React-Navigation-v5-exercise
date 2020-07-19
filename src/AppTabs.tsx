import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from './AppParamList';
import { Text, Button } from 'react-native';
import { Center } from './Center';
import { AuthContext } from './AuthProvider';
import {Ionicons, AntDesign } from "@expo/vector-icons";
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';

const Tabs = createBottomTabNavigator<AppParamList>();

interface AppTabsProps {}

function Home() {
    const { logout } = useContext(AuthContext);
    return (
        <Center>
            <Text>Home</Text>
            <Button title="logout" onPress={()=> logout()} />
        </Center>
    );
};

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === "Search") {
              iconName = "ios-search";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen name="Home" component={HomeStack} />
        <Tabs.Screen name="Search" component={SearchStack} />
      </Tabs.Navigator>
    );
} 