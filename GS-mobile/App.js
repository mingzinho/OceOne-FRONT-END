import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


import TelaInicial from "./src/telas/TelaInicial";
import TelaCadastro from "./src/telas/TelaCadastro";
import TelaLogin from "./src/telas/TelaLogin";
import TelaMapa from "./src/telas/TelaMapa";
import TelaMarcadores  from "./src/telas/TelaMarcadores";

const Stack = createStackNavigator()

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='TelaInicial'
          component={TelaInicial}
          options={{headerShown:false}}
        />
        <Stack.Screen name='TelaCadastro' component={TelaCadastro}
          options={{headerShown:false}}
        />
        <Stack.Screen name='TelaLogin' component={TelaLogin}
          options={{headerShown:false}}
        />
        <Stack.Screen name='TelaMapa' component={TelaMapa}
          options={{headerShown:false}}
        />
        <Stack.Screen name='TelaMarcadores' component={TelaMarcadores}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App