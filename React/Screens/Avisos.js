import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import { mis_avisos } from "../Shared/Estilos";
import axios from "../Shared/axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, Badge, Divider, FAB } from "react-native-paper";

export default function Avisos(props) {
  const [alertas, setAlertas] = useState([]);
  const [alertasNotificaciones, setAlertasNotificaciones] = useState([]); //POR ID
  const [alertasNotificas, setAlertasNotificas] = useState([]); //EN GENERAL

  const [selectedTab, setSelectedTab] = useState(false);

  const [id_usuario, setId] = useState(props.route.params?.id_usuario || "");
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [acceder, setAcceder] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [tipoAviso, setTipoAviso] = useState("");
  const [area, setArea] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const [selectedOption, setSelectedOption] = useState({ value: "Selecciona" });

  const avisos_array = [
    { value: "URGENTE" },
    { value: "INFORMATIVO" },
    { value: "PENDIENTES" },
  ];

  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const areas = ["Gerencia", "RR.HH", "TI"];
  const tipos_aviso = ["Urgente", "Informativo", "Opcional"];

  const handleTabPressEdit = () => {
    setSelectedTab(!selectedTab);
  };

  const handleTabPress = () => {
    setSelectedTab(!selectedTab);
    setTitulo("");
    setMensaje("");
    setSelectedOption({ value: "Seleccionar" });
  };

  const onRefreshAll = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      listarAvisos();
      setRefresh(new Date());
    }, 2000);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // wait(5000).then(() =>
    setTimeout(() => {
      listarAvisos(), setRefreshing(false);
      ToastAndroid.showWithGravity(
        "Datos actualizados....",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }, 2000);
  }, []);

  const onRefresh2 = useCallback(() => {
    setRefreshing(true);
    // wait(5000).then(() =>
    setTimeout(() => {
      listarAvisos(), setRefreshing(false);
      ToastAndroid.showWithGravity(
        "Datos actualizados....",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }, 2000);
  }, []);

  const listarAvisos = async () => {
    await axios({
      method: "get",
      url: "avisos/getAvisos",
      data: null,
    })
      .then(async function (d) {
        let datos = d.data;

        setAlertasNotificas(datos);
        // console.log(datos);
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const grabarAviso = async () => {
    if (titulo != "" && mensaje != "") {
      var todayDate = new Date().toISOString().slice(0, 10);

      let registro = JSON.stringify({
        tipo_aviso: selectedOption,
        titulo: titulo,
        message: mensaje,
        fecha: todayDate,
      });
      console.log(registro);
      await axios({
        method: "post",
        url: "avisos/agregarAviso",
        data: registro,
      })
        .then(async function (d) {
          // let datos = d.data;
          // console.log("datos");
          setTimeout(() => {
            ToastAndroid.showWithGravity(
              "Se registro el aviso con exito !",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            handleTabPress();
            setSelectedOption({
              id: 0,
              value: "Selecciona",
            });
            onRefresh();
            setTitulo("");
            setMensaje("");
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.showWithGravity(
            "Ocurrio un error, intentelo de nuevo !",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.log("no entro");
        });
    } else {
      ToastAndroid.showWithGravity(
        "Complete los campos por favor...",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  const prevEditar = (tipo_edit, titulo_edit, mensaje_edit) => {
    handleTabPressEdit();
    console.log(tipo_edit);
    setSelectedOption({ value: tipo_edit });
    setTitulo(titulo_edit);
    setMensaje(mensaje_edit);
    setAcceder(true);
  };

  const editarAviso = async () => {
    setCargando(true);
    if (titulo != "" && mensaje != "") {
      var todayDate = new Date().toISOString().slice(0, 10);
      let registro = JSON.stringify({
        id: id_usuario,
        tipo_aviso: selectedOption.value,
        titulo: titulo,
        message: mensaje,
        fecha: todayDate,
      });
      console.log(registro);
      await axios({
        method: "post",
        url: "avisos/editarAviso",
        data: registro,
      })
        .then(async function (d) {
          // let datos = d.data;
          // console.log("datos");
          setTimeout(() => {
            ToastAndroid.showWithGravity(
              "Se edito el aviso con exito !",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            setCargando(false);
            handleTabPress();
            setSelectedOption("Selecciona");
            onRefresh();
            setTitulo("");
            setMensaje("");
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.showWithGravity(
            "Ocurrio un error, intentelo de nuevo !",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          console.log("no entro");
          setCargando(false);
        });
    } else {
      ToastAndroid.showWithGravity(
        "Complete los campos por favor...",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setCargando(false);
    }
  };

  const listarPorId = async () => {
    const registro = JSON.stringify({
      usuario: id_usuario,
    });
    await axios({
      method: "post",
      url: "alertas/getNotificacionesAlertasPorId",
      data: registro,
    })
      .then(async function (d) {
        let datos = d.data;
        //   console.log(datos);
        setAlertasNotificaciones(datos);
        console.log("soyporId");

        console.log("entrando");
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const handlePress = (value) => {
    setSelectedOption(value);
    setModalVisible(false);
    console.log("Selected value:", value);
  };

  useEffect(() => {
    // listar();
    listarAvisos();
    var todayDate = new Date().toISOString();
    console.log(todayDate);
  }, [refresh]);

  return (
    <View style={mis_avisos.containerLogin}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />

      <View style={mis_avisos.avi_view_crear_aviso}>
        <TouchableOpacity
          onPress={() => handleTabPress()}
          style={mis_avisos.avi_boton_crear_aviso}
        >
          <MaterialIcons name="library-add" size={27} color="#ffff" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      {selectedTab && (
        <View style={mis_avisos.cuerpo_principal_crear}>
          <View>
            <Text>Tipo de aviso</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={mis_avisos.avi_boton_opciones}
            >
              <Text>{selectedOption.value}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={27}
                color="#364E68"
              />
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={mis_avisos.modal_container_gps}>
                <View style={mis_avisos.modal_container_gps_contenedor}>
                  <Text style={{ textAlign: "left" }}>Selecciona </Text>
                  {avisos_array.map((option, index) => (
                    <TouchableOpacity
                      key={option.id}
                      style={mis_avisos.modal_container_gps_option}
                      onPress={() => handlePress(option)}
                    >
                      <Text>{option.value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
          <View style={mis_avisos.espaciador}></View>

          <View>
            <Text>Titulo</Text>
            <TextInput
              style={mis_avisos.textarea}
              // multiline={true}
              // numberOfLines={8}
              onChangeText={(value) => {
                setTitulo(value);
              }}
              defaultValue={titulo}
              placeholder="Escribe titulo de aviso"
              // onChangeText={(text) => this.setState({text})}
            />
          </View>

          <View style={mis_avisos.espaciador}></View>

          <View>
            <Text>Mensaje</Text>
            <TextInput
              style={mis_avisos.textarea}
              multiline={true}
              numberOfLines={4}
              onChangeText={(value) => {
                setMensaje(value);
              }}
              defaultValue={mensaje}
              placeholder="Escribe motivo de aviso"
            />
          </View>

          <View style={mis_avisos.avi_boton_enviar_view}>
            {acceder == true ? (
              <TouchableOpacity onPress={() => editarAviso()}>
                {cargando == false ? (
                  <Text style={mis_avisos.avi_boton_enviar_tx}>Editar </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => grabarAviso()}>
                <Text style={mis_avisos.avi_boton_enviar_tx}>Publicar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <View style={mis_avisos.cuerpo_principal}>
        <Divider />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cargando == false && alertasNotificas != "" ? (
            alertasNotificas.map((item, index) => (
              <View key={index} style={mis_avisos.avi_cuerpo_notifi}>
                <View style={mis_avisos.avi_cuerpo_notifi_fila1}>
                  {/* <Text>{item.tipo_aviso}</Text> */}
                  <Text>
                    {item.tipo_aviso == "URGENTE" ? (
                      <MaterialCommunityIcons
                        name="alert-octagon"
                        size={35}
                        color="#FF6868"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="newspaper-variant"
                        size={35}
                        color="#2980B9"
                      />
                    )}
                  </Text>
                </View>
                <View style={mis_avisos.avi_cuerpo_notifi_fila2}>
                  <Text style={mis_avisos.avi_titulo_info_aviso}>
                    {item.titulo}
                    {"  -  "}
                    <Text style={mis_avisos.avi_fecha_info_aviso}>
                      {item.fecha_aviso}
                    </Text>
                  </Text>
                  <Divider />

                  <Text>{item.aviso_mensaje}</Text>
                </View>
                <View style={mis_avisos.avi_cuerpo_notifi_fila3}>
                  <TouchableOpacity
                    style={mis_avisos.avi_notifi_boton_acp}
                    onPress={() =>
                      prevEditar(
                        item.tipo_aviso,
                        item.titulo,
                        item.aviso_mensaje
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="playlist-edit"
                      size={30}
                      color="#2C3E50"
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={mis_avisos.avi_notifi_boton_err}>
                <Ionicons name="trash-bin" size={20} color="#FC4F4F" />
              </TouchableOpacity> */}
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator animating={true} color="gray" />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

// <FontAwesome name="user-o" size={24} color="#0081B4" />;
