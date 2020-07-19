import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { StyleSheet, View, Text, Button, ActivityIndicator, AsyncStorage } from "react-native";
import { Center } from './Center';
import { AuthParamList, AuthNavProps } from './AuthParamList';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

interface RouteProps {

}



export const Routes:React.FC<RouteProps> = ({}) => {
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if user is logged in or not
        AsyncStorage.getItem("user").then( userString => {
            if(userString){
                console.log(userString);
                login();
            }
            setLoading(false);
        }).catch(err=>console.log(err));
        return () => {
            
        }
    }, []);

    if(loading){
        return (
            <Center>
                <ActivityIndicator size="large"/>
            </Center>
        );
    }
    return (
        <NavigationContainer>
            {user ? 
            <AppTabs /> 
            :
            (
               <AuthStack />
            )}
            
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
