import React, { useContext, useRef, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { Text, Button } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { AuthContext } from './AuthProvider';
import faker from "faker";
import { HomeParamList, HomeStackNavProps } from './HomeParamList';
import { addProductRoutes } from './addProductRoutes';

interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>();

function Feed({navigation} : HomeStackNavProps<"Feed">) {
    return (
        <Center>
            <FlatList 
            style={{ width: "100%" }}
            keyExtractor={ (product, idx) => product + idx}
            data={Array.from(Array(50), () => faker.commerce.product()) }
            renderItem={({ item }) => {
                return (
                    <Button title={item} onPress={() => {
                        navigation.navigate('Product', {
                            name: item
                        });
                    }} />
                );
            }}
            />
        </Center>
    );
};



export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    const { logout } = useContext(AuthContext);
    return (
      <Stack.Navigator initialRouteName="Feed">
        {addProductRoutes(Stack)}
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    logout();
                  }}
                >
                  <Text>LOGOUT</Text>
                </TouchableOpacity>
              );
            },
          }}
        />
      </Stack.Navigator>
    );
}