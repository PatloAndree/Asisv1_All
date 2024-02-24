import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  Pressable,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import { listado } from "../Shared/Estilos";
import axios from "../Shared/axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Badge, Divider, ActivityIndicator } from "react-native-paper";

export default function Listado(props) {
  const [usuario, setUusuario] = useState([]);
  const [id_usuario, setId] = useState(props.route.params?.id_usuario || "");
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: 5,
    value: "5 dias",
  });

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
      listar(), setRefreshing(false);
      ToastAndroid.showWithGravity(
        "Datos actualizados....",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }, 2000);
  }, []);

  const listar = async () => {
    setUusuario([]);
    const registro = JSON.stringify({
      tiempo: selectedOption.id,
    });
    await axios({
      method: "post",
      url: "asistencia/getAsistencias",
      data: registro,
    })
      .then(async function (d) {
        let datos = d.data;
        // console.log(datos);
        setUusuario(datos);
        ToastAndroid.showWithGravity(
          "Datos actualizados....",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        console.log("entrando");
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const listarPorId = async () => {
    setUusuario([]);
    const registro = JSON.stringify({
      usuario: id_usuario,
    });
    await axios({
      method: "post",
      url: "asistencia/getAsistenciasPorId",
      data: registro,
    })
      .then(async function (d) {
        let datos = d.data;
        // console.log(datos);
        setUusuario(datos);

        console.log("entrando");
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const tiempos = [
    { id: 5, value: "5 dias" },
    { id: 15, value: "15 dias" },
    { id: 30, value: "30 dias" },
  ];

  const handlePress = (value) => {
    setSelectedOption(value);
    setModalVisible(false);
  };

  useEffect(() => {
    console.log("stoy usuario", id_usuario);
    if (id_usuario != "") {
      listarPorId();
    } else {
      listar();
      console.log("loco");
    }
  }, [refresh]);

  return (
    <View style={listado.containerLogin}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      <View style={listado.espaciador}></View>

      {id_usuario != "" ? (
        usuario == "" ? (
          <View>
            <ActivityIndicator animating={true} color="gray" />
          </View>
        ) : (
          <View style={listado.cuerpo_principal}>
            <View style={listado.contenedorFecha}>
              <View style={listado.contenedorFecha1}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={listado.lis_boton_opciones}
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
                  <View style={listado.modal_container_gps}>
                    <View style={listado.modal_container_gps_contenedor}>
                      <Text style={{ textAlign: "left" }}>Selecciona </Text>
                      {tiempos.map((option, index) => (
                        <TouchableOpacity
                          key={option.id}
                          style={listado.modal_container_gps_option}
                          onPress={() => handlePress(option)}
                        >
                          <Text>{option.value}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={listado.contenedorFecha3}>
                <TouchableOpacity onPress={() => listarPorId()}>
                  <MaterialIcons size={30} name="search" color="#0069D4" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={listado.espaciador}></View>

            <View style={listado.resultados}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {usuario != "" ? (
                  usuario.map((obj, indice) => (
                    <View
                      key={indice}
                      bottomDivider
                      style={listado.lis_cuerpo_contenedor}
                    >
                      <View style={listado.lis_col_uno}>
                        <MaterialCommunityIcons
                          name="bell-alert"
                          size={26}
                          color="#FFE15D"
                        />
                      </View>
                      <View style={listado.contenedor_info}>
                        <View style={listado.lado_izquierdo}>
                          {/* <Text style={listado.texto_info}>Usuario : {indice + 1} </Text> */}
                          <Text style={listado.texto_info_derecha_titulo}>
                            {obj.nombres}
                          </Text>
                          <Text style={listado.texto_info_derecha}>
                            <Ionicons
                              name="calendar"
                              size={20}
                              color="#2B3A55"
                            />{" "}
                            {obj.dia_asistencia}{" "}
                          </Text>
                          <Text style={listado.texto_info_derecha}>
                            Hora ingreso{" "}
                          </Text>

                          <Text style={listado.texto_info_derecha}>
                            Hora refrigerio{" "}
                          </Text>
                          <Text style={listado.texto_info_derecha}>
                            Hora salida{" "}
                          </Text>
                        </View>

                        <View style={listado.lado_derecho}>
                          <Text style={listado.texto_info_izquierda_titulo}>
                            {obj.apellidos}
                          </Text>

                          <Text style={listado.texto_info_izquierda}></Text>
                          <Text style={listado.texto_info_izquierda}>
                            :{obj.hora_ingreso}
                          </Text>
                          <Text style={listado.texto_info_izquierda}>
                            : {obj.hora_refrigerio}
                          </Text>
                          <Text style={listado.texto_info_izquierda}>
                            : {obj.hora_salida}
                          </Text>
                        </View>
                      </View>
                      <View style={listado.lis_col_tres}>
                        {/* EJEMPLO */}
                        <Image
                          style={listado.imagen_check}
                          source={require("../assets/checklist.png")}
                        ></Image>
                      </View>
                    </View>
                  ))
                ) : (
                  <ActivityIndicator animating={true} color="black" />
                )}
              </ScrollView>
            </View>
          </View>
        )
      ) : (
        <View style={listado.cuerpo_principal}>
          <View style={listado.contenedorFecha}>
            <View style={listado.contenedorFecha1}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={listado.lis_boton_opciones}
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
                <View style={listado.modal_container_gps}>
                  <View style={listado.modal_container_gps_contenedor}>
                    <Text style={{ textAlign: "left" }}>Selecciona </Text>
                    {tiempos.map((option, index) => (
                      <TouchableOpacity
                        key={option.id}
                        style={listado.modal_container_gps_option}
                        onPress={() => handlePress(option)}
                      >
                        <Text>{option.value}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
            </View>

            <View style={listado.contenedorFecha3}>
              <TouchableOpacity onPress={() => listar()}>
                <MaterialIcons size={30} name="search" color="#0069D4" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={listado.espaciador}></View>

          <View style={listado.resultados}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh2}
                />
              }
            >
              {usuario != "" ? (
                usuario.map((obj, indice) => (
                  <View
                    key={indice}
                    bottomDivider
                    style={listado.lis_cuerpo_contenedor}
                  >
                    <View style={listado.lis_col_uno}>
                      <Feather name="user" size={26} color="#FFE15D" />
                    </View>
                    <View style={listado.contenedor_info}>
                      <View style={listado.lado_izquierdo}>
                        {/* <Text style={listado.texto_info}>Usuario : {indice + 1} </Text> */}
                        <Text style={listado.texto_info_derecha_titulo}>
                          {obj.nombres}
                        </Text>
                        <Text style={listado.texto_info_derecha}>
                          <Ionicons name="calendar" size={20} color="#2B3A55" />{" "}
                          {obj.dia_asistencia}{" "}
                        </Text>
                        <Text style={listado.texto_info_derecha}>
                          Hora ingreso{" "}
                        </Text>

                        <Text style={listado.texto_info_derecha}>
                          Hora refrigerio{" "}
                        </Text>
                        <Text style={listado.texto_info_derecha}>
                          Hora salida{" "}
                        </Text>
                      </View>

                      <View style={listado.lado_derecho}>
                        <Text style={listado.texto_info_izquierda_titulo}>
                          {obj.apellidos}
                        </Text>

                        <Text style={listado.texto_info_izquierda}></Text>
                        <Text style={listado.texto_info_izquierda}>
                          :{obj.hora_ingreso}
                        </Text>
                        <Text style={listado.texto_info_izquierda}>
                          : {obj.hora_refrigerio}
                        </Text>
                        <Text style={listado.texto_info_izquierda}>
                          : {obj.hora_salida}
                        </Text>
                      </View>
                    </View>
                    <View style={listado.lis_col_tres}>
                      {/* EJEMPLO */}
                      <Image
                        style={listado.imagen_check}
                        source={require("../assets/checklist.png")}
                      ></Image>
                    </View>
                  </View>
                ))
              ) : (
                <ActivityIndicator animating={true} color="black" />
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
