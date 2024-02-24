import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import MenuPrincipal from "./Screens/MenuPrincipal";
import Marcar from "./Screens/Marcar";
import Alertas from "./Screens/Alertas";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "react-native-vector-icons/Feather";
import Avisos from "./Screens/Avisos";
import Listado from "./Screens/Listado";
import MenuPerfil from "./Screens/MenuPerfil";
import Manual from "./Screens/Manual";
const Stack = createNativeStackNavigator();

export default function App() {
  function CartIcon() {
    const navigation = useNavigation();

    const navigateToCart = () => {
      navigation.navigate("Menu_perfil");
    };
    return (
      <Feather
        name="external-link"
        size={22}
        color="#ffff"
        style={{ fontWeight: "300" }}
        onPress={navigateToCart}
      />
    );
  }

  return (
    <NavigationContainer>
      {/* const navigation = useNavigation(); */}

      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: "#F6F6F6",
            headerTitleAlign: "center",
          },
          headerTintColor: "#334756",
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MenuPrincipal"
          component={MenuPrincipal}
          options={(navigation) => ({
            headerShown: false,
            headerRight: (props) => <CartIcon />,
            headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Marcar"
          component={Marcar}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Alertas"
          component={Alertas}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Avisos"
          component={Avisos}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Listado"
          component={Listado}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="MenuPerfil"
          component={MenuPerfil}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Manual"
          component={Manual}
          options={(navigation) => ({
            // headerShown: false,
            headerRight: (props) => <CartIcon />,
            // headerBackVisible: false,
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
