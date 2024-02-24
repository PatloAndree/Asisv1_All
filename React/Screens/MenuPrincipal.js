import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaProvider,
  Text,
  View,
  Image,
  Alert,
  Modal,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Dimensions,
} from "react-native";
import { Badge, Divider, ActivityIndicator } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";;
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "../Shared/axios";
import { menu_index } from "../Shared/Estilos";
import Slider from "../Components/MenuPrincipal/Slider";

export default function MenuPrincipal(props) {
  const [usuario, setUsuario] = useState(
    props.route.params?.nombreUsuario || ""
  );
  const [estado_tipo, setTipo] = useState(props.route.params?.tipo || "");
  const [id, setId] = useState(props.route.params?.id_usuario || "");
  const [image, setImage] = useState(null);
  const [noti, setNoti] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const focus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuControl, setMenuControl] = useState("menu");
  const [datosUsuario, setDatosUsuario] = useState([]);

  const AbrirModal = (value) => {
    if (value === true) {
      setModalVisible(true);
      setMenuControl("menu-open");
    } else {
      setModalVisible(false);
      setMenuControl("menu");
    }
  };

  const handlePress = (value) => {
    setSelectedOption(value);
    setModalVisible(false);
    console.log("Selected value:", value);
  };

  const listarAlertas = async () => {
    await axios({
      method: "get",
      url: "alertas/getAlertasActivas",
      data: null,
    })
      .then(async function (d) {
        let datos = d.data;
        // console.log(datos.length);
        setNoti(datos.length);
        // var result=[];
        // datos.forEach(function(element) {
        //     result.push(element.nombre_alerta);
        // });
        // setAlertas(result);
        //   console.log("entrando");
      })
      .catch(function (error) {
        console.log(error);
        console.log("no entro");
      });
  };

  const traerData = async () => {
    let valores = JSON.parse(datos_sesion);
    if (valores != null && valores.nombre_imagen != null) {
      setImage(valores.nombre_imagen);
    }
    console.log("traer data");
  };

  const listar_asistencias = async () => {
    await axios({
      method: "get",
      url: "asistencia/getAsistenciasPanel",
      data: null,
    })
      .then(async function (d) {
        let datos = d.data;
        if (datos != null && datos != "") {
          setDatosUsuario(datos);
          // console.log(datos);
        }
      })
      .catch(function (error) {
        console.log(error);
        // console.log("no entro");
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      listar_asistencias(), setRefreshing(false);
    }, 1000);
  }, []);

  const salirApp = () => {
    setModalVisible(false);
    setMenuControl("menu");
    Alert.alert("Espera!", "¿ Desea cerrar su cesión ?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Si, salir",
        onPress: () => {
          BackHandler.removeEventListener("hardwareBackPress", salirApp),
            props.navigation.push("Login");
        },
      },
    ]);
    return true;
  };

  useEffect(
    () => {
      listar_asistencias();
      if (focus == true) {
        BackHandler.addEventListener("hardwareBackPress", salirApp);
      }
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", salirApp);
    },
    [focus, refresh],
    [salirApp]
  );

  return (
    <View style={menu_index.contenedor}>
      <StatusBar backgroundColor="#FCFCFC" barStyle="light-content" />

      <View style={menu_index.espaciador}></View>

      {/* ABRE BARRA ALTA */}
      <View style={menu_index.detalle_usuario}>
        <View style={menu_index.fila1}>
          <View style={menu_index.detalle_usuario_c2}>
            <TouchableOpacity onPress={() => AbrirModal(true)}>
              <MaterialCommunityIcons
                name={menuControl}
                size={34}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <View style={menu_index.detalle_usuario_c1}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("MenuPerfil", { id_usuario: id })
              }
            >
              <Image
                style={menu_index.imagen_logo}
                source={require("../assets/avatar.jpg")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={menu_index.fila2}>
          <View style={menu_index.detalle_usuario_c3}>
            <Text style={menu_index.titulo}>Hola 😉, </Text>
            <Text style={menu_index.subtitulo}>{usuario}</Text>
            {/* <Text style={menu_index.subtitulo}></Text> */}
          </View>
        </View>
      </View>
      {/* CIERRA BARRA ALTA */}

      {/* ABRE CUERPO MEDIO */}
      <View style={menu_index.cuerpoMedio}>
        <View style={menu_index.espaciador}></View>

        <View style={menu_index.menu_grid}>
          {/* ADMIN */}
          {estado_tipo == 1 ? (
            <View style={menu_index.Campo}>
              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Marcar", {
                      id_usuario: id,
                    })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/calendar.png")}
                  />
                  <Text style={menu_index.buttonText}>Marcar</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Avisos")}
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/avisos.png")}
                  />
                  <Text style={menu_index.buttonText}>Crear</Text>
                  <Text style={menu_index.buttonText}>Aviso</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Listado")}
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/general.png")}
                  />
                  <Text style={menu_index.buttonText}>Listado</Text>
                  <Text style={menu_index.buttonText}>General</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  style={menu_index.buttonLg}
                  onPress={() =>
                    props.navigation.navigate("Alertas", {
                      id_usuario: id,
                      tipo: estado_tipo,
                    })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/faro.png")}
                  />
                  <Text style={menu_index.buttonText}>Alertas</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // USUARIO
            <View style={menu_index.Campo}>
              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Marcar", {
                      id_usuario: id,
                    })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/calendar.png")}
                  />
                  <Text style={menu_index.buttonText}>Marcar</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Avisos", { id_usuario: id })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/avisos.png")}
                  />
                  <Text style={menu_index.buttonText}>Avisos</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Listado", { id_usuario: id })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/history.png")}
                  />
                  {/* <Text style={menu_index.buttonText}>Ver</Text> */}
                  <Text style={menu_index.buttonText}>Record</Text>
                </TouchableOpacity>
              </View>

              <View style={menu_index.contorno_img}>
                <TouchableOpacity
                  style={menu_index.buttonLg}
                  onPress={() =>
                    props.navigation.navigate("Alertas", {
                      id_usuario: id,
                      tipo: estado_tipo,
                    })
                  }
                >
                  <Image
                    style={menu_index.imagen_menu}
                    source={require("../assets/faro.png")}
                  />
                  <Text style={menu_index.buttonText}>Alertar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* ADMINISTRADOR PANTALLA */}
        {estado_tipo == 1 ? (
          <View style={menu_index.menu_central}>
            {datosUsuario != "" ? (
              <View>
                <View style={menu_index.menu_titulo_container}>
                  <Text style={menu_index.menu_titulo_asistencia}>
                    ASISTENCIA SEMANAL
                  </Text>
                  <FontAwesome name="calendar" size={18} color="#818181" />
                </View>
                <View style={menu_index.menu_central_fila}>
                  <View style={menu_index.menu_central_columnas}>
                    <Text style={menu_index.text_modal_boton}>Empleados</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>L</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>M</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>M</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>J</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>V</Text>
                  </View>
                </View>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {datosUsuario != null && datosUsuario != "" ? (
                    datosUsuario.map((item, index) => (
                      <View key={index}>
                        <View style={menu_index.menu_central_fila_rows}>
                          <View style={menu_index.menu_central_columnas}>
                            <Text style={menu_index.text_modal_tabla}>
                              {item.nombres && item.apellidos ? (
                                item.nombres.split(" ")[0] +
                                " " +
                                item.apellidos.split(" ")[0]
                              ) : (
                                <Text> {item.nombres} ...</Text>
                              )}
                            </Text>
                          </View>

                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.lunes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.lunes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.lunes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.martes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.martes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.martes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.miercoles == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.miercoles == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.miercoles < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.jueves == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.jueves == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.jueves < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.viernes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.viernes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.viernes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                        </View>
                        <Divider />
                      </View>
                    ))
                  ) : (
                    <Text>No hay asistencias registradas</Text>
                  )}
                </ScrollView>
              </View>
            ) : (
              <ActivityIndicator animating={true} color={"#606470"} />
            )}
          </View>
        ) : (
          //  USUARIO PANTALLA
          <View style={menu_index.menu_central}>
            {datosUsuario != "" ? (
              <View>
                <View style={menu_index.menu_titulo_container}>
                  <Text style={menu_index.menu_titulo_asistencia}>
                    ASISTENCIA SEMANAL
                  </Text>
                  <FontAwesome name="calendar" size={18} color="#818181" />
                </View>
                <Divider />
                <View style={menu_index.menu_central_fila}>
                  <View style={menu_index.menu_central_columnas}>
                    <Text style={menu_index.text_modal_boton}>Empleados</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>L</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>M</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>M</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>J</Text>
                  </View>
                  <View style={menu_index.menu_central_columnas_dias}>
                    <Text style={menu_index.text_modal_boton}>V</Text>
                  </View>
                </View>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {datosUsuario != null && datosUsuario != "" ? (
                    datosUsuario.map((item, index) => (
                      <View key={index}>
                        <View style={menu_index.menu_central_fila_rows}>
                          <View style={menu_index.menu_central_columnas}>
                            <Text style={menu_index.text_modal_tabla}>
                              {item.nombres && item.apellidos ? (
                                item.nombres.split(" ")[0] +
                                " " +
                                item.apellidos.split(" ")[0]
                              ) : (
                                <Text> {item.nombres} ...</Text>
                              )}
                            </Text>
                          </View>

                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.lunes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.lunes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.lunes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.martes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.martes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.martes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.miercoles == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.miercoles == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.miercoles < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.jueves == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.jueves == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.jueves < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                          <View style={menu_index.menu_central_columnas_dias}>
                            <Text>
                              {item.viernes == 0 ? (
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#FF8080"
                                />
                              ) : item.viernes == null ? (
                                <MaterialCommunityIcons
                                  name="dots-horizontal"
                                  size={18}
                                  color="#A9A9A9"
                                />
                              ) : item.viernes < "08:00:00" ? (
                                <FontAwesome
                                  name="check-square-o"
                                  size={18}
                                  color="#65B741"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="alert-circle-check-outline"
                                  size={18}
                                  color="#FE7A36"
                                />
                              )}
                            </Text>
                          </View>
                        </View>
                        <Divider />
                      </View>
                    ))
                  ) : (
                    <Text>No hay asistencias registradas</Text>
                  )}
                </ScrollView>
              </View>
            ) : (
              <ActivityIndicator animating={true} color={"#606470"} />
            )}
          </View>
        )}

        <View style={menu_index.slider}>
          <Text style={menu_index.textoSlider}>Anuncios :</Text>
          <Slider />
        </View>

        <View style={menu_index.espaciador}></View>

        {/* AVISO MENU */}
        <View style={menu_index.menu_aviso}>
          <View style={menu_index.menu_aviso_texto}>
            <Text style={menu_index.titulo_aviso}>
              ¿En que te podemos ayudar?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Manual")}
            >
              <Text style={menu_index.subtitulo_aviso}>
                Resuelve tus dudas aquí
              </Text>
            </TouchableOpacity>
            <Divider />
          </View>
          <View style={menu_index.menu_aviso_img}>
            <Image
              style={menu_index.imagen_aviso}
              source={require("../assets/questions.png")}
            ></Image>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => AbrirModal(false)}
      >
        <View style={menu_index.modal_container_gps}>
          <View style={menu_index.modal_container_gps_contenedor}>
            <View style={menu_index.modal_container_gps_contenedor_cuerpo}>
              <View style={menu_index.modal_container_gps_option}>
                <Text style={menu_index.text_modal}>Opciones</Text>
              </View>
              <Divider />
              <View style={menu_index.modal_container_gps_option}>
                <TouchableOpacity
                  style={menu_index.modal_container_gps_option_boton}
                  onPress={() => {
                    setMenuControl("menu"),
                      AbrirModal(false),
                      props.navigation.navigate("MenuPerfil", {
                        id_usuario: id,
                      });
                  }}
                >
                  <FontAwesome name="user" size={26} color="#3E54AC" />
                  <Text style={menu_index.text_modal_boton}>Perfil</Text>
                </TouchableOpacity>
              </View>
              <Divider />
              <View style={menu_index.modal_container_gps_option}>
                <TouchableOpacity
                  style={menu_index.modal_container_gps_option_boton}
                  onPress={() => {
                    salirApp();
                  }}
                >
                  <Ionicons name="exit" size={26} color="#EA5455" />
                  <Text style={menu_index.text_modal_boton}>Salir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
