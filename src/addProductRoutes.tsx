import React, {useState, useRef, useEffect} from 'react';
import { TouchableOpacity, Text, Button } from "react-native";
import { Center } from "./Center";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import { TypedNavigator, StackNavigationState } from '@react-navigation/native';
import { SearchParamList, SearchStackNavProps } from './SearchParamList';

function Product({ route, navigation }:HomeStackNavProps<'Product'> | SearchStackNavProps<'Product'>) {
    return(
        <Center>
            <Text>{route.params.name}</Text>
            <Button 
            title="Edit this product" 
            onPress={ () =>{
                navigation.navigate("EditProduct",{
                    name: route.params.name
                })
            }}
            />
        </Center>
    );
};

function apiCall(x:any){
    return x;
}

function EditProduct({
  route,
  navigation,
}: HomeStackNavProps<"EditProduct"> | SearchStackNavProps<"EditProduct">) {
  const [formState] = useState();
  const submit = useRef(() => {});
  submit.current = () => {
    // api call with the new form state
    apiCall(formState);
    //.then(()=>{});
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);
  return (
    <Center>
      <Text>Editing {route.params.name}...</Text>
    </Center>
  );
};

export const addProductRoutes = (
         Stack: TypedNavigator<
           HomeParamList | SearchParamList,
           StackNavigationState,
           any,
           any,
           any
         >
       ) => {
         return (
           <>
             <Stack.Screen
               name="Product"
               options={({ route }) => ({
                 headerTitle: `Product : ${route.params.name}`,
               })}
               component={Product}
             />
             <Stack.Screen
               name="EditProduct"
               options={({ route }) => ({
                 headerTitle: `Edit : ${route.params.name}`,
                 headerRight: () => {
                   return (
                     <TouchableOpacity
                       style={{ paddingRight: 8 }}
                       onPress={() => {
                         if (route.params.submit) {
                           route.params.submit?.current();
                         }
                       }}
                     >
                       <Text style={{ color: "red" }}>Done</Text>
                     </TouchableOpacity>
                   );
                 },
               })}
               component={EditProduct}
             />
           </>
         );
       };