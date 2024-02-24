import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ScrollView,
  RefreshControl,
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
import { mis_alertas } from "../Shared/Estilos";
import axios from "../Shared/axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator, Badge, Divider, FAB } from "react-native-paper";

export default function Alertas(props) {
  const [alertasTipo, setAlertasTipo] = useState([]);
  const [alertasNotificacionesId, setAlertasNotificacionesId] = useState([]); //POR ID
  const [alertasNotificas, setAlertasNotificas] = useState([]); //EN GENERAL

  const [id_usuario, setId] = useState(props.route.params?.id_usuario || "");
  const [tipo_perfil, setTipoPerfil] = useState(props.route.params?.tipo || "");

  const [mensaje, setMensaje] = useState("");
  const [acceder, setAcceder] = useState(false);

  const [campana, setCampana] = useState("bell");
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [consultando, setConsultando] = useState(true);

  const [selectedOption, setSelectedOption] = useState({ id:0,value: "Seleccionar" });
  const [selectedTab, setSelectedTab] = useState(false);

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
      setRefreshing(false);
      setRefresh(new Date());
    }, 2000);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // wait(5000).then(() =>
    setTimeout(() => {
      listarPorId(), setRefreshing(false);
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
      listarAlertas(), setRefreshing(false);
      ToastAndroid.showWithGravity(
        "Datos actualizados....",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }, 200);
  }, []);


  const desactivarAlerta = async (user_id) => {
    // console.log(user_id)
    const registro = JSON.stringify({
      alerta_id: user_id,
    });
    await axios({
      method: "post",
      url: "alertas/getDesactivarAlertas",
      data: registro,
    })
      .then(async function (d) {
        // let datos = d.data;
        // setAlertasNotificas(datos);
        onRefresh2();
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const listarTipos = async () => {
    await axios({
      method: "get",
      url: "alertas/getAlertas",
      data: null,
    })
      .then(async function (d) {
        let datos = d.data;

        var result = [];
        datos.forEach(function (element) {
          result.push({id:element.id,value:element.nombre_alerta});
        });
        setAlertasTipo(result);
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro tipos");
      });
  };

  const listarAlertas = async () => {
    await axios({
      method: "get",
      url: "alertas/getNotificacionesAlertas",
      data: null,
    })
      .then(async function (d) {
        let datos = d.data;
        setConsultando(false);
        setAlertasNotificas(datos);
        // console.log(datos);
      })
      .catch(function (error) {
        console.log(error);
        setConsultando(false);

      });
  };

  const grabarAlerta = async () => {
    if (mensaje != "") {
      setCargando(true);
      var todayDate = new Date().toISOString().slice(0, 10);
      let registro = JSON.stringify({
        usuario: id_usuario,
        tipoalerta: selectedOption.id,
        message: mensaje,
        fecha: todayDate,
      });
      console.log(registro);
      await axios({
        method: "post",
        url: "alertas/agregarAlerta",
        data: registro,
      })
        .then(async function (d) {
          // let datos = d.data;
          // console.log("datos");
          setTimeout(() => {
            ToastAndroid.showWithGravity(
              "Se registro tu alerta con exito !",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
            setCargando(false);
            onRefresh();
            handleTabPress();
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.showWithGravity(
            "Ocurrio un error, intentelo de nuevo !",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          setCargando(false);
          console.log("no entro");
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

  const handlePress = (value) => {
    setSelectedOption(value);
    setModalVisible(false);
    console.log("Selected value:", value);
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
        setAlertasNotificacionesId(datos);
        console.log("soyporId");
        setConsultando(false);

        console.log(datos);
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro ID");
        setConsultando(false);

      });
  };

  const prevEditar = (tipo_edit, mensaje_edit) => {
    handleTabPressEdit();
    console.log("soy undefined",tipo_edit);
    setSelectedOption({ id: tipo_edit });
    setMensaje(mensaje_edit);
    setAcceder(true);
  };

  useEffect(() => {
    listarAlertas();
    if (id_usuario != "") {
      listarTipos();
      listarPorId();
    } else {
      listarAlertas();
      listarTipos();
    }
  }, [refresh]);

  //   return id_usuario != "" ? (
  return (
    <View style={mis_alertas.containerLogin}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {tipo_perfil == 1 ? (
        ""
      ) : (
        <View style={mis_alertas.avi_view_crear_aviso}>
          <TouchableOpacity
            onPress={() => handleTabPress()}
            style={mis_alertas.avi_boton_crear_aviso}
          >
            <MaterialIcons name="library-add" size={27} color="#ffff" />
          </TouchableOpacity>
        </View>
      )}

      {selectedTab && (
        <View style={mis_alertas.cuerpo_principal_crear}>
          <View>
            <Text>Tipo de aviso</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={mis_alertas.avi_boton_opciones}
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
              <View style={mis_alertas.modal_container_gps}>
                <View style={mis_alertas.modal_container_gps_contenedor}>
                  <Text style={{ textAlign: "left" }}>Selecciona</Text>
                  {alertasTipo.map((option, index) => (
                    <TouchableOpacity
                      key={option.id}
                      style={mis_alertas.modal_container_gps_option}
                      onPress={() => handlePress(option)}
                    >
                      <Text>{option.value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
          <View style={mis_alertas.espaciador}></View>

          <View style={mis_alertas.espaciador}></View>

          <View>
            <Text>Mensaje</Text>
            <TextInput
              style={mis_alertas.textarea}
              multiline={true}
              numberOfLines={4}
              onChangeText={(value) => {
                setMensaje(value);
              }}
              defaultValue={mensaje}
              placeholder="Escribe motivo de alerta"
            />
          </View>

          <View style={mis_alertas.avi_boton_enviar_view}>
            {acceder == true ? (
              <TouchableOpacity onPress={() => editarAviso()}>
                {cargando == false ? (
                  <Text style={mis_alertas.avi_boton_enviar_tx}>Editar </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => grabarAlerta()}>
                {cargando == false ? (
                  <Text style={mis_alertas.avi_boton_enviar_tx}>Enviar </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* ADMINISTRADOR */}
      {tipo_perfil == 1 ? (
        <View style={mis_alertas.cuerpo_principal}>
          <Divider />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <ActivityIndicator animating={consultando} color="blue" />

            {alertasNotificas != "" ? (
              alertasNotificas.map((item, index) => (
                <View key={index} style={mis_alertas.avi_cuerpo_notifi}>
                  <View style={mis_alertas.avi_cuerpo_notifi_fila1}>
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
                  <View style={mis_alertas.avi_cuerpo_notifi_fila2}>
                    <Text style={mis_alertas.avi_titulo_info_aviso}>
                      {item.nombres + " " + item.apellidos}
                      {"  -  "}
                      <Text style={mis_alertas.avi_fecha_info_aviso}>
                        {item.fecha_alerta}
                      </Text>
                    </Text>
                    <Divider />

                    <Text>{item.mensaje_alerta}</Text>
                  </View>
                  <View style={mis_alertas.avi_cuerpo_notifi_fila3}>
                    {tipo_perfil == 1 ? (
                      <TouchableOpacity
                        style={mis_alertas.avi_notifi_boton_acp}
                        onPress={() =>
                          prevEditar(item.id_tipo_alerta, item.mensaje_alerta)
                        }
                      >
                        <MaterialCommunityIcons
                          name="bell"
                          size={27}
                          color="#9F70FD"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={mis_alertas.avi_notifi_boton_acp}
                        onPress={() =>
                          prevEditar(item.id_tipo_alerta, item.mensaje_alerta)
                        }
                      >
                        <MaterialCommunityIcons
                          name="playlist-edit"
                          size={30}
                          color="#2C3E50"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>Aún no tienes alertas</Text>
            )}
          </ScrollView>
        </View>
      ) : (
      // USUARIO SIMPLE
        <View style={mis_alertas.cuerpo_principal}>
          <Divider />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {alertasNotificacionesId != "" ? (
              alertasNotificacionesId.map((item, index) => (
                <View key={index} style={mis_alertas.avi_cuerpo_notifi}>
                  <View style={mis_alertas.avi_cuerpo_notifi_fila1}>
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
                  <View style={mis_alertas.avi_cuerpo_notifi_fila2}>
                    <Text style={mis_alertas.avi_titulo_info_aviso}>
                      {item.nombres + " " + item.apellidos}
                      {"  -  "}
                      <Text style={mis_alertas.avi_fecha_info_aviso}>
                        {item.fecha_alerta}
                      </Text>
                    </Text>
                    <Divider />

                    <Text>{item.mensaje_alerta}</Text>
                  </View>
                  <View style={mis_alertas.avi_cuerpo_notifi_fila3}>
                    {tipo_perfil == 1 ? (
                      <TouchableOpacity
                        style={mis_alertas.avi_notifi_boton_acp}
                        onPress={() =>
                          prevEditar(item.id_tipo_alerta, item.mensaje_alerta)
                        }
                      >
                        <MaterialCommunityIcons
                          name="bell"
                          size={27}
                          color="#9F70FD"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={mis_alertas.avi_notifi_boton_acp}
                        onPress={() =>
                          prevEditar(item.id_tipo_alerta, item.mensaje_alerta)
                        }
                      >
                        <MaterialCommunityIcons
                          name="playlist-edit"
                          size={30}
                          color="#2C3E50"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            ) :(
              <ActivityIndicator animating={true} color="gray" />
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
