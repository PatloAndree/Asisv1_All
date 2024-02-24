import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Button,
} from "react-native";
import * as Location from "expo-location";
import axios from "../Shared/axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { marcar_asistencia } from "../Shared/Estilos";
import { Badge, Divider } from "react-native-paper";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Marcar(props) {
  const [usuario, setUusuario] = useState([]);
  const [id_usuario, setId] = useState(props.route.params?.id_usuario || "");
  const [currentDate, setCurrentDate] = useState("");
  const [marcado, setMarcado] = useState(0);
  const [acceder, setAcceder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ubicacionGPS, setUbicacionGPS] = useState(null);
  const hora_de_ingreso = useState("08:00:00");
  const hora_de_salida = useState("18:00:00");

  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(new Date());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAsistencia(), setRefreshing(false);
    }, 1000);
  }, []);

  const grabar_asistencia = async () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + "/" + month + "/" + year + "\n " + " " + hours + ":" + min
    );
  };

  const longitudes = async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorGPs("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUbicacionGPS({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  };

  const setear = async () => {
    setAcceder(true);
    // longitudes();
    var todayDate = new Date().toISOString().slice(0, 10);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    console.log(ubicacionGPS.latitude);
    if (ubicacionGPS.latitude != null) {
      let registro = JSON.stringify({
        empleado_id: id_usuario,
        dia_fecha: todayDate,
        hora_ingreso: hours + ":" + min + ":" + sec,
        latitud: ubicacionGPS.latitude.toString(),
        longitud: ubicacionGPS.longitude.toString(),
      });
      await axios({
        method: "post",
        url: "asistencia/agregarAsistencia",
        data: registro,
      })
        .then(async function (d) {
          console.log(d.data);
          console.log("---------------------");
          if (d.data == 0) {
            ToastAndroid.showWithGravity(
              "Atención, intentelo de nuevo...",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            setAcceder(false);
          } else {
            let datos = d.data;
            console.log("esta es mi data", datos);
             ToastAndroid.showWithGravity(
               "Cargando...",
               ToastAndroid.SHORT,
               ToastAndroid.BOTTOM
             );

            setTimeout(() => {
              setUusuario(datos);
              ToastAndroid.showWithGravity(
                "Asistencia registrada !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
              setAcceder(false);
              onRefresh();
            }, 2000);
          }
          console.log("me registre !!! -----");
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.showWithGravity(
            "Atención, problema de red...",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          setAcceder(false);
          // console.log("no me registre");
        });
    } else {
      setAcceder(false);
      ToastAndroid.showWithGravity(
        "Atención, intentelo de nuevo...",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  const getAsistencia = async () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hoy = year + "/" + month + "/" + date;
    let registro = JSON.stringify({
      usuario: id_usuario,
      fechadehoy: hoy,
    });
    console.log("ENTRO 1", registro);
    await axios({
      method: "post",
      url: "asistencia/getAsistencia",
      data: registro,
    })
      .then(async function (d) {
        console.log("ENRTO 2");
        let datos = d.data;
        console.log("SOY DATOS");
        setUusuario(datos);
        console.log(datos);
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro pa nada");
      });
  };

  const editarAsistencia = async () => {
    setCargando(true);
    var todayDate = new Date().toISOString().slice(0, 10);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    let registro = JSON.stringify({
      usuario: id_usuario,
      fechadehoy: todayDate,
      hora_refrigerio: hours + ":" + min + ":" + sec,
    });
    console.log(registro);
    await axios({
      method: "post",
      url: "asistencia/editarAsistencia",
      data: registro,
    })
      .then(async function (d) {
        if (d.data == 0) {
          ToastAndroid.showWithGravity(
            "Atención, intentelo de nuevo...",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          setCargando(false);
        } else {
          let datos = d.data;
          setTimeout(() => {
            // props.navigation.push('Login');
            ToastAndroid.showWithGravity(
              "Asistencia registrada !",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            setCargando(false);
            onRefresh();
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro pa nada");
      });
  };

  const editarAsistencia2 = async () => {
    setLoading(true);
    var todayDate = new Date().toISOString().slice(0, 10);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    let registro = JSON.stringify({
      usuario: id_usuario,
      fechadehoy: todayDate,
      hora_salida: hours + ":" + min + ":" + sec,
    });
    console.log(registro);
    await axios({
      method: "post",
      url: "asistencia/editarAsistencia2",
      data: registro,
    })
      .then(async function (d) {
        if (d.data == 0) {
          ToastAndroid.showWithGravity(
            "Atención, intentelo de nuevo...",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          setLoading(false);
        } else {
          let datos = d.data;
          setTimeout(() => {
            ToastAndroid.showWithGravity(
              "Asistencia registrada !",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            setLoading(false);
            onRefresh();
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro pa nada");
      });
  };

  useEffect(() => {
    getAsistencia();
    longitudes();
    onRefresh();
    setInterval(() => {
      grabar_asistencia();
    }, 1000);
  }, [refresh]);

  return (
    <View style={marcar_asistencia.containerLogin}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />

      <View style={marcar_asistencia.espaciador}></View>

      <View style={marcar_asistencia.cuadro_biendenida}>
        <Image
          style={marcar_asistencia.imagen_bienvenida}
          source={require("../assets/hora.png")}
        ></Image>
      </View>

      <View style={marcar_asistencia.fecha_hora}>
        <Text style={marcar_asistencia.fecha_texto}>{currentDate}</Text>
      </View>

      <View style={marcar_asistencia.espaciador2}>
        <Text style={marcar_asistencia.text_espaciador}>
          Que tengas un excelente dia! 🤗
        </Text>
      </View>
      <Divider />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={marcar_asistencia.cuerpo_principal}>
          <View style={marcar_asistencia.cuerpo_entrada}>
            <View style={marcar_asistencia.cuerpo_imagen}>
              <Fontisto name="day-haze" size={30} color="#364E68" />
            </View>

            <View style={marcar_asistencia.cuerpo_texto}>
              <Text>Horario de entrada</Text>
              <Text>08:00 - AM </Text>
              <View style={{ display: "flex", justifyContent: "center" }}>
                {usuario != "" || usuario.hora_ingreso != null ? (
                  usuario.hora_ingreso < hora_de_ingreso ? (
                    <Badge size={23} style={{ backgroundColor: "#70D42C" }}>
                      {usuario.hora_ingreso}
                    </Badge> //verde
                  ) : (
                    <Badge size={23} style={{ backgroundColor: "#F45050" }}>
                      {usuario.hora_ingreso}
                    </Badge> //rojo
                  )
                ) : (
                  <Text>...</Text>
                )}
              </View>
            </View>
            <View style={marcar_asistencia.cuerpo_boton}>
              {usuario == "" || usuario.hora_ingreso == "" ? (
                <TouchableOpacity
                  onPress={() => {
                    setear();
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={30}
                    color="#364E68"
                  />
                </TouchableOpacity>
              ) : (
                <FontAwesome name="check-circle" size={35} color="#364E68" />
              )}
            </View>
          </View>

          <View style={marcar_asistencia.cuerpo_entrada}>
            <View style={marcar_asistencia.cuerpo_imagen}>
              <Fontisto name="day-sunny" size={30} color="#364E68" />
            </View>
            <View style={marcar_asistencia.cuerpo_texto}>
              <Text>Horario de refrigerio</Text>
              <Text>01:00 - PM</Text>

              <View style={{ display: "flex", justifyContent: "center" }}>
                {usuario.hora_refrigerio != null ? (
                  <Badge size={23} style={{ backgroundColor: "#70D42C" }}>
                    {usuario.hora_refrigerio}
                  </Badge> //verde
                ) : (
                  <Text>...</Text>
                )}
              </View>
            </View>
            <View style={marcar_asistencia.cuerpo_boton}>
              {usuario.hora_refrigerio == null ? (
                <TouchableOpacity
                  onPress={() => {
                    editarAsistencia();
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={30}
                    color="#364E68"
                  />
                </TouchableOpacity>
              ) : (
                <FontAwesome name="check-circle" size={35} color="#364E68" />
              )}
            </View>
          </View>

          <View style={marcar_asistencia.cuerpo_entrada}>
            <View style={marcar_asistencia.cuerpo_imagen}>
              <Fontisto name="day-cloudy" size={30} color="#364E68" />
            </View>
            <View style={marcar_asistencia.cuerpo_texto}>
              <Text>Horario de salida</Text>
              <Text>05:00 - PM</Text>
              <View style={{ display: "flex", justifyContent: "center" }}>
                {usuario.hora_salida != null ? (
                  <Badge size={23} style={{ backgroundColor: "#70D42C" }}>
                    {usuario.hora_salida}
                  </Badge> //verde
                ) : (
                  <Text>...</Text>
                )}
              </View>
            </View>
            <View style={marcar_asistencia.cuerpo_boton}>
              {usuario.hora_de_salida == null ? (
                <TouchableOpacity
                  onPress={() => {
                    editarAsistencia2();
                  }}
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={30}
                    color="#364E68"
                  />
                </TouchableOpacity>
              ) : (
                <AntDesign name="checkcircle" size={30} color="#70D42C" />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={marcar_asistencia.espaciador}></View>
    </View>
  );
}
