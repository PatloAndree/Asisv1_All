import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  BackHandler,
  RefreshControl,
  Pressable,
  Text,
  View,
  Image,
  ToastAndroid,
  TextInput,
  Alert,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { login_s } from "../Shared/Estilos";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "../Shared/axios";
import { Button } from "react-native-paper";

export default function Login(props) {
  const [usuario, setUusuario] = useState(""); //manuelito
  // mariango@gmail.com
  const [password, setPass] = useState("");
  const [acceder, setAcceder] = useState(false);
  const [fuente, setFuente] = useState(Boolean);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const focus = useIsFocused();

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-slash");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-slash") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const fnValidarIngresar = async () => {
    setAcceder(true);
    if (usuario.trim() == "" && password.trim() == "") {
      ToastAndroid.showWithGravity(
        "Ingresar usuario y contraseña",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setAcceder(false);
    } else if (usuario.trim() == "") {
      ToastAndroid.showWithGravity(
        "Ingresar usuario",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setAcceder(false);
    } else if (password.trim() == "") {
      ToastAndroid.showWithGravity(
        "Ingresar contraseña",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setAcceder(false);
    } else {
      let datas = JSON.stringify({
        usuario: usuario,
        contrasena: password,
      });
      await axios({
        method: "post",
        url: "login/login",
        data: datas,
      })
        .then(async function (d) {
          if (d != null || d != "") {
            if (d.data == -1 || d.data == 0) {
              ToastAndroid.showWithGravity(
                "Error, intentelo de nuevo",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
              setAcceder(false);
              console.log("no entras");
            } else {
              let datos = d.data;
              setTimeout(() => {
                props.navigation.push("MenuPrincipal", {
                  nombreUsuario:
                    datos.apellidos != null ? datos.nombres : datos.nombres,
                  tipo: datos.tipo,
                  id_usuario: datos.id,
                });
                ToastAndroid.showWithGravity(
                  "Bienvenido !",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
              }, 1000);
              console.log("si entras");
            }
          } else {
            ToastAndroid.showWithGravity(
              "Error de conexión !",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            console.log("no entras 2");
          }
        })
        .catch(function (error) {
          console.log(error);
          setAcceder(false);
          ToastAndroid.showWithGravity(
            "Problema de red, intentelo de nuevo...",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.log(d);
        });
    }
  };

  useEffect(
    () => {
      setAcceder(false);
      if (focus == true) {
        // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
        BackHandler.addEventListener("hardwareBackPress", ExitApp);
      }
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", ExitApp);
    },
    [focus],
    [ExitApp]
  );

  const ExitApp = () => {
    Alert.alert("Espera !", "¿ Deseas salir del App ?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Si",
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  return (
    acceder,
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    (
      <View style={login_s.containerLogin}>
        <StatusBar backgroundColor="#EEEEEE" barStyle="dark-content" />
        <View style={login_s.cabeceraFoto}>
          <Image
            style={login_s.image}
            source={require("../assets/fondo.png")}
          ></Image>
        </View>
        <View style={login_s.espaciador2}></View>

        <View style={login_s.espaciador}>
          <Text>Iniciar sesión</Text>
        </View>

        <View style={login_s.espaciador2}></View>

        <View style={login_s.containerInputs}>
          <View style={login_s.containerInputUsuario}>
            <View>
              <FontAwesome name="user" size={24} color="#364E68" />
            </View>
            <View>
              <TextInput
                style={login_s.textInput}
                placeholder="Usuario"
                placeholderTextColor={"#6F7579"}
                onChangeText={(value) => {
                  setUusuario(value);
                }}
                defaultValue={usuario}
                autoCapitalize="none"
              ></TextInput>
            </View>
            <View>
              <FontAwesome name="user" size={24} color="#ffff" />
            </View>
          </View>

          <View style={login_s.espaciador2}></View>

          <View style={[login_s.containerInputContraseña]}>
            {/* <View>
                    </View> */}
            <View>
              <FontAwesome name="lock" size={24} color="#364E68" />
            </View>
            <View>
              <TextInput
                style={login_s.textInput}
                placeholder="Contraseña"
                placeholderTextColor={"#6F7579"}
                onChangeText={(value) => {
                  setPass(value);
                }}
                secureTextEntry={passwordVisibility}
                defaultValue={password}
                enablesReturnKeyAutomaticallyonChangeText={(text) =>
                  setPassword(text)
                }
              ></TextInput>
            </View>
            <View>
              <Pressable onPress={handlePasswordVisibility}>
                <FontAwesome name={rightIcon} size={24} color="#364E68" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={login_s.espaciador2}></View>

        <View style={[login_s.containerBoton]}>
          <Button
            icon="login"
            mode="contained"
            loading={acceder}
            onPress={() => {
              fnValidarIngresar();
            }}
            style={login_s.buttonIngresar}
          >
            <Text style={login_s.buttonIngresar_text}>
              {acceder == false ? "Ingresar" : ""}
            </Text>
          </Button>

          <View style={login_s.espaciador2}></View>

          <View style={login_s.footer}>
            <Text style={{ fontSize: 16 }}>No tienes una cuenta?</Text>
          </View>
        </View>

        <View style={login_s.footer}>
          <Text> Powered by</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}> ANDREE TL </Text>
        </View>
      </View>
    )
  );
}
