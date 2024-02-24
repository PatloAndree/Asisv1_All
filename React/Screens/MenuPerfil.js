import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  ToastAndroid,
  Button
} from "react-native";
import { menu_perfil } from "../Shared/Estilos";
import axios from "../Shared/axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import { ActivityIndicator, Badge, Divider, FAB } from "react-native-paper";



export default function MenuPerfil(props) {
  const [selectedIndex, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(new Date());
  const [id_usuario, setId] = useState(props.route.params?.id_usuario || "");
  const [acceder, setAcceder] = useState(false);
  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [color, setColor] = useState("#0074E4");
  const [cargando, setCargando] = useState(false);

  const obtenerUsuario = async () => {
    let usuario_id = JSON.stringify({
      usuario: id_usuario,
    });
    await axios({
      method: "post",
      url: "login/getUsuario",
      data: usuario_id,
    })
      .then(async function (d) {
        let datos = d.data;
        // setSesion(datos);
        setnombre(datos.nombres);
        setApellido(datos.apellidos);
        setCorreo(datos.correo);
        setContrasena(datos.contrasena);
        // setUusuario(datos);
        console.log("SI TRAE DATA");
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const editarUsuario = async () => {
    setAcceder(true);
    let data = JSON.stringify({
      id: id_usuario,
      nombres: nombre,
      apellidos: apellido,
      correo: correo,
      contrasena: contrasena,
    });
    console.log(data);
    await axios({
      method: "post",
      url: "login/editarUsuario",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(async function (d) {
        console.log(d.data);
        if (d.data != 0) {
          console.log("SI TRAE DATA");

          setTimeout(() => {
            obtenerUsuario();
            setAcceder(false);
            ToastAndroid.showWithGravity(
              "Se actualizo correctamente",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.showWithGravity(
          "Atención, no se pudo actualizar",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        setAcceder(false);
      });
  };


  useEffect(() => {
    obtenerUsuario();
    console.log(id_usuario);
  }, [refresh]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={menu_perfil.contenedor}>
          <StatusBar backgroundColor="#ffff" barStyle="dark-content" />

          <View style={menu_perfil.separador}></View>

          <View style={menu_perfil.cabecera}>
            <Image
              style={menu_perfil.imagen_logo}
              source={require("../assets/avatar.jpg")}
            ></Image>
          </View>

          <View style={menu_perfil.separador}></View>

          <View style={menu_perfil.cuerpo}>
            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="user" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  // placeholder='Usuario'
                  onChangeText={(value) => {
                    setnombre(value);
                  }}
                  defaultValue={nombre}
                  // placeholder='Donde'
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="user" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  // placeholder='Usuario'
                  onChangeText={(value) => {
                    setApellido(value);
                  }}
                  defaultValue={apellido != "" ? apellido : ""}
                  // placeholder='Donde'
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="list-alt" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  placeholder="DNI"
                  // onChangeText={value => { setApellido(value) }}
                  // defaultValue={apellido != "" ? apellido : ""  }
                  // placeholder='Donde'
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="envelope-o" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  // placeholder='Usuario'
                  onChangeText={(value) => {
                    setCorreo(value);
                  }}
                  defaultValue={correo}
                  // placeholder='Donde'
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="lock" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  // placeholder='Usuario'
                  onChangeText={(value) => {
                    setContrasena(value);
                  }}
                  defaultValue={contrasena}
                  // placeholder='Donde'

                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            {/* <Text  style={menu_perfil.text_color}>Edad</Text> */}
            <View style={menu_perfil.containerInputUsuario}>
              <View>
                <FontAwesome name="calendar-o" size={24} color={color} />
              </View>
              <View>
                <TextInput
                  style={menu_perfil.textInput}
                  placeholder="12-02-2023"
                  // onChangeText={value => { setApellido(value) }}
                  // defaultValue={apellido != "" ? apellido : ""  }
                  // placeholder='Donde'
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>

            <View style={menu_perfil.separador}></View>
          </View>

          <View style={menu_perfil.pie}>
            <TouchableOpacity
              style={menu_perfil.perfil_boton_enviar}
              onPress={() => {
                editarUsuario();
              }}
            >
              <Text style={menu_perfil.perfil_texto_boton}>EDITAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
