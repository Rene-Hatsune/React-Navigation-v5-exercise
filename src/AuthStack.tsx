import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Center } from './Center';
import { Text, Button } from "react-native";
import { AuthParamList, AuthNavProps } from './AuthParamList';
import { AuthContext } from './AuthProvider';

interface AuthStackProps {

}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { user, login } = useContext(AuthContext);
  return (
    <Center>
      <Text>Login Screen</Text>
      <Text>Route: {route.name}</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register screen"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Register Screen</Text>
      <Text>Route: {route.name}</Text>
      <Button
        title="go to login screen"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack();
        }}
      />
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ header: () => null }}
      >
        <Stack.Screen
          options={{
            headerTitle: "Sign In",
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerTitle: "Sign Up",
          }}
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    );
}