-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2024 a las 02:17:10
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `id_tipo_alerta` int(11) NOT NULL,
  `mensaje_alerta` varchar(300) NOT NULL,
  `foto_alerta` varchar(255) DEFAULT NULL,
  `fecha_alerta` date NOT NULL,
  `leido` int(11) NOT NULL DEFAULT 1,
  `estado` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alertas`
--

INSERT INTO `alertas` (`id`, `usuario_id`, `id_tipo_alerta`, `mensaje_alerta`, `foto_alerta`, `fecha_alerta`, `leido`, `estado`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'Trafico papai', '', '2023-02-18', 0, 1, '2023-03-27 18:31:16', '2023-03-27 18:31:16'),
(2, 4, 2, 'Motivos de salud por eso no puedo llegar', '', '2023-02-19', 0, 1, '2023-03-27 18:31:16', '2023-03-27 18:31:16'),
(3, 5, 3, 'Un problema familiar señor roberto, por eso llegare un poco tarde a las 8.:40, asi que llegare un poco mas tarde jefe', '', '2023-02-21', 0, 1, '2023-03-27 18:31:16', '2023-03-27 18:31:16'),
(4, 5, 2, 'Medicoo pipipi', '', '2023-02-21', 0, 1, '2023-03-27 18:31:16', '2023-03-27 18:31:16'),
(25, 5, 3, 'La cama rotaaaa', 'c21f812d-43a1-4031-b73f-cabc1cb223ad.jpg', '2023-03-23', 1, 1, '2023-03-27 18:31:16', '2023-03-27 18:31:16'),
(26, 5, 2, 'Vengan a limpiar el cuarto de don pepito que los llama por favor el baño esta demasiado sucio ayuda pero ya !', NULL, '2023-03-24', 1, 1, '2023-03-24 18:31:16', '2023-03-24 18:31:16'),
(27, 5, 1, 'No funciona la TV', '036e8319-b8ee-401b-92d5-ed263cf330b9.jpg', '2023-03-28', 0, 1, '2023-03-28 00:21:59', '2023-03-28 00:21:59'),
(29, 3, 3, 'Saludvita', NULL, '2024-02-08', 1, 1, '2024-02-08 22:36:14', '2024-02-08 22:36:14'),
(30, 3, 1, 'Demasiado tráfico aaui rm lima', NULL, '2024-02-08', 1, 1, '2024-02-08 22:37:34', '2024-02-08 22:37:34'),
(31, 3, 1, 'Ggfjfdjhj', NULL, '2024-02-09', 1, 1, '2024-02-09 21:48:41', '2024-02-09 21:48:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `dia_asistencia` date NOT NULL,
  `hora_ingreso` time DEFAULT NULL,
  `hora_refrigerio` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `latitud` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id`, `empleado_id`, `dia_asistencia`, `hora_ingreso`, `hora_refrigerio`, `hora_salida`, `latitud`, `longitud`, `created_at`, `updated_at`) VALUES
(4, 1, '2023-02-17', '07:18:26', '17:47:35', '13:01:32', '-11.8161463', '-77.1336443', '2023-02-17 22:18:26', '2023-02-17 22:18:26'),
(5, 3, '2023-02-17', '08:15:36', '18:24:14', '18:24:31', '-11.8161333', '-77.1336411', '2023-02-17 23:15:36', '2023-02-17 23:15:36'),
(6, 5, '2023-02-18', '07:40:41', '12:48:53', NULL, '-11.8161446', '-77.1336551', '2023-02-18 00:13:41', '2023-02-18 00:13:41'),
(8, 1, '2023-02-18', '11:04:14', '17:47:35', '13:01:32', '-11.8161427', '-77.1336544', '2023-02-18 16:04:14', '2023-02-18 16:04:14'),
(9, 4, '2023-02-18', '07:20:18', '12:53:23', '18:33:05', '-11.8161479', '-77.1336469', '2023-02-18 16:20:19', '2023-02-18 16:20:19'),
(10, 4, '2023-02-19', '18:45:22', '12:53:23', '18:33:05', '-11.8161505', '-77.1336526', '2023-02-19 23:45:23', '2023-02-19 23:45:23'),
(11, 4, '2023-02-20', '13:22:14', '12:53:23', '18:33:05', '-11.8161385', '-77.1336408', '2023-02-20 18:22:15', '2023-02-20 18:22:15'),
(12, 12, '2023-02-20', '15:55:16', '18:13:24', '18:13:45', '-11.8161447', '-77.1336558', '2023-02-20 20:55:18', '2023-02-20 20:55:18'),
(13, 4, '2023-02-21', '11:00:40', '12:53:23', '18:33:05', '-11.8161484', '-77.1336474', '2023-02-21 16:00:40', '2023-02-21 16:00:40'),
(14, 5, '2023-02-21', '12:47:04', '12:48:53', NULL, '-11.8161397', '-77.1336407', '2023-02-21 17:47:05', '2023-02-21 17:47:05'),
(15, 1, '2023-02-23', '12:43:34', '17:47:35', '13:01:32', '-11.8161131', '-77.1337531', '2023-02-23 17:43:35', '2023-02-23 17:43:35'),
(16, 4, '2023-02-23', '12:53:10', '12:53:23', '18:33:05', '-11.8161436', '-77.1336509', '2023-02-23 17:53:11', '2023-02-23 17:53:11'),
(17, 13, '2023-02-23', '18:35:21', NULL, NULL, '-11.8161512', '-77.1336563', '2023-02-23 23:35:21', '2023-02-23 23:35:21'),
(18, 1, '2023-02-25', '17:55:56', '17:47:35', '13:01:32', '-11.8161455', '-77.1336505', '2023-02-25 22:55:57', '2023-02-25 22:55:57'),
(23, 1, '2023-02-28', '11:47:35', '17:47:35', '13:01:32', '-11.8161614', '-77.1336605', '2023-02-28 16:47:35', '2023-02-28 16:47:35'),
(24, 1, '2023-03-01', '12:35:50', '17:47:35', '13:01:32', '-11.8161591', '-77.1336595', '2023-03-01 17:35:50', '2023-03-01 17:35:50'),
(25, 3, '2023-03-01', '18:06:04', '18:24:14', '18:24:31', '-11.8161556', '-77.1336551', '2023-03-01 23:06:04', '2023-03-01 23:06:04'),
(26, 12, '2023-03-01', '18:11:14', '18:13:24', '18:13:45', '-11.8161434', '-77.1336521', '2023-03-01 23:11:14', '2023-03-01 23:11:14'),
(27, 6, '2023-03-01', '18:20:12', NULL, NULL, '-11.8161177', '-77.1336579', '2023-03-01 23:20:11', '2023-03-01 23:20:11'),
(28, 9, '2023-03-01', '18:20:48', NULL, NULL, '-11.8161455', '-77.1336597', '2023-03-01 23:20:47', '2023-03-01 23:20:47'),
(29, 1, '2024-01-03', '10:49:23', '17:47:35', NULL, '-11.8161096', '-77.1336567', '2024-01-03 15:49:23', '2024-01-03 15:49:23'),
(30, 1, '2024-01-30', '07:55:44', '17:47:35', NULL, '-11.8161918', '-77.1336857', '2024-01-30 18:55:44', '2024-01-30 18:55:44'),
(31, 1, '2024-02-03', '11:06:05', NULL, NULL, '-11.8161821', '-77.1336797', '2024-02-03 16:06:05', '2024-02-03 16:06:05'),
(32, 1, '2024-02-02', '07:04:27', NULL, NULL, '', '', '2024-02-03 23:04:44', '2024-02-03 23:04:44'),
(33, 3, '2024-02-01', '07:08:28', '18:24:14', '18:24:31', '', '', '2024-02-03 23:08:46', '2024-02-03 23:08:46'),
(34, 1, '2024-02-05', '07:14:06', NULL, NULL, '-11.8161927', '-77.1336817', '2024-02-05 17:14:05', '2024-02-05 17:14:05'),
(35, 3, '2024-02-05', '13:48:08', '18:24:14', '18:24:31', '-11.8161927', '-77.1336817', '2024-02-05 18:48:08', '2024-02-05 18:48:08'),
(36, 5, '2024-02-05', '07:29:52', NULL, NULL, '-11.8161831', '-77.1336882', '2024-02-06 01:29:52', '2024-02-06 01:29:52'),
(37, 6, '2024-02-05', '07:08:42', NULL, NULL, '-11.8161831', '-77.1336882', '2024-02-06 02:08:41', '2024-02-06 02:08:41'),
(38, 7, '2024-02-05', '06:10:02', NULL, NULL, '-11.8161831', '-77.1336882', '2024-02-06 02:10:01', '2024-02-06 02:10:01'),
(39, 1, '2024-02-06', '07:31:49', NULL, NULL, '-11.8161724', '-77.1336803', '2024-02-06 18:31:49', '2024-02-06 18:31:49'),
(40, 12, '2024-02-05', NULL, NULL, NULL, '-11.8161724', '-77.1336803', '2024-02-06 18:34:00', '2024-02-06 18:34:00'),
(41, 3, '2024-02-06', '07:50:06', '18:24:14', '18:24:31', '-11.8161724', '-77.1336803', '2024-02-06 18:50:06', '2024-02-06 18:50:06'),
(42, 5, '2024-02-06', '07:49:36', NULL, NULL, '-11.8161703', '-77.1336781', '2024-02-06 20:49:35', '2024-02-06 20:49:35'),
(43, 12, '2024-02-06', '16:09:17', NULL, NULL, '-11.8161703', '-77.1336781', '2024-02-06 21:09:17', '2024-02-06 21:09:17'),
(44, 5, '2024-02-07', '08:49:36', NULL, NULL, '-11.8161703', '-77.1336781', '2024-02-06 20:49:35', '2024-02-06 20:49:35'),
(45, 5, '2024-02-08', '06:49:36', NULL, NULL, '-11.8161703', '-77.1336781', '2024-02-06 20:49:35', '2024-02-06 20:49:35'),
(46, 5, '2024-02-09', '09:49:36', NULL, NULL, '-11.8161703', '-77.1336781', '2024-02-06 20:49:35', '2024-02-06 20:49:35'),
(47, 3, '2024-02-08', '16:28:13', '18:24:14', '18:24:31', '-11.8161714', '-77.1336773', '2024-02-08 21:28:14', '2024-02-08 21:28:14'),
(48, 1, '2024-02-08', '18:29:56', '18:32:12', '18:32:21', '-11.816185', '-77.1336749', '2024-02-08 23:29:56', '2024-02-08 23:29:56'),
(49, 3, '2024-02-09', '16:32:09', NULL, NULL, '-11.8161821', '-77.1336788', '2024-02-09 21:32:11', '2024-02-09 21:32:11'),
(50, 3, '2024-02-13', '15:12:15', NULL, NULL, '-11.8161954', '-77.1336711', '2024-02-13 20:12:16', '2024-02-13 20:12:16'),
(51, 3, '2024-02-16', '07:53:09', NULL, NULL, '-11.8161748', '-77.1336792', '2024-02-16 17:53:09', '2024-02-16 17:53:09'),
(52, 3, '2024-02-23', '17:42:02', NULL, NULL, '-11.8162107', '-77.1336681', '2024-02-23 22:42:02', '2024-02-23 22:42:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `avisos` (
  `id` int(11) NOT NULL,
  `area_aviso` varchar(100) DEFAULT NULL,
  `tipo_aviso` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `aviso_mensaje` varchar(500) NOT NULL,
  `fecha_aviso` date NOT NULL,
  `leido` int(11) NOT NULL DEFAULT 1,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `avisos`
--

INSERT INTO `avisos` (`id`, `area_aviso`, `tipo_aviso`, `titulo`, `aviso_mensaje`, `fecha_aviso`, `leido`, `estado`) VALUES
(5, 'Gerenciae ed', 'URGENTE', 'VENIR A REUNIÓN 5', 'Hola estimados clientes, por favor completar sus datos por ejemplo su Dni.', '2023-03-24', 1, 1),
(6, 'Gerencia', 'INFORMATIVO', 'Completar sus datos por favor', 'Hola estimados clientes, por favor completar sus datos por ejemplo su Dni.', '2023-03-24', 1, 1),
(7, 'Gerencia', 'INFORMATIVO', 'Descargar sus EPP', 'Hola estimados clientes, por favor completar sus datos por ejemplo su Dni.', '2023-03-24', 1, 1),
(8, 'Gerencia', 'INFORMATIVO', 'Saludar al jefe', 'Hola estimados clientes, por favor completar sus datos por ejemplo su Dni.', '2023-03-24', 1, 1),
(9, 'Gerencia', 'URGENTE', 'VENIR A REUNIÓN 5pm', 'Hola estimados clientes, por favor completar sus datos por ejemplo su Dni.', '2024-02-07', 1, 1),
(10, NULL, 'URGENTE', 'Pruebs 1', 'Hola soy pruebs', '2024-02-08', 1, 1),
(11, NULL, 'URGENTE', 'Prueba 2', 'Prueba de entrada 2 ', '2024-02-08', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `nombre_habitacion` varchar(200) NOT NULL,
  `imagen_ruta` varchar(400) NOT NULL,
  `numero_habitacion` int(11) NOT NULL,
  `detalle_habitacion` varchar(500) NOT NULL,
  `tipo_habitacion` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `estado` int(11) NOT NULL COMMENT '1|Disponible 2|Pendiente 3|Ocupado 4|Limpieza',
  `piso` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `nombre_habitacion`, `imagen_ruta`, `numero_habitacion`, `detalle_habitacion`, `tipo_habitacion`, `precio`, `estado`, `piso`, `status`) VALUES
(1, 'Habitacion individual', 'require(\'./assets/sa.jpg\')', 201, 'Habitación individual, 5m x 5m, cama dos plazas, tv de 45, espejos, aire acondicionado, baño agua caliente, agua fria e internet.', 1, 25, 1, 2, 1),
(2, 'Habitación doble - simple', 'require(\'./assets/habita2.jpg\')', 202, 'Habitación doble - simple, 5m x 5m, cama dos plazas, tv de 45, espejos, aire acondicionado, baño agua caliente, agua fria e internet.', 1, 30, 1, 2, 1),
(3, 'Habitación matrimonial-Sill', 'require(\'./assets/habita2.jpg\')', 203, 'Habitación matrimonial Sillón tántrico, 7m x 5m, cama dos plazas, tv de 45, espejos, aire acondicionado, baño agua caliente, agua fria e internet.', 1, 35, 2, 2, 1),
(4, 'Habitación matrimonial-Sill', 'require(\'./assets/habita2.jpg\')', 204, 'Habitación matrimonial sillón tántrico, 7m x 5m, cama dos plazas, tv de 45, espejos, aire acondicionado, baño agua caliente, agua fria e internet.', 2, 35, 1, 2, 1),
(5, 'Habitación Matrimonial -Vip', 'require(\'./assets/habita2.jpg\')', 205, 'Habitación Matrimonial Vip, 8m x 6m, cama dos plazas, tv de 50, espejos, aire acondicionado, baño agua caliente, agua fría e internet.', 2, 45, 4, 2, 1),
(6, 'Habitación Matrimonial -Vip', '', 301, 'Habitación Matrimonial Vip, 8m x 6m, cama dos plazas, tv de 50, espejos, aire acondicionado, baño agua caliente, agua fría e internet.', 2, 45, 1, 3, 1),
(7, 'Habitación Matrimonial -Vip', '', 302, 'Habitación Matrimonial Vip, 8m x 6m, cama dos plazas, tv de 50, espejos, aire acondicionado, baño agua caliente, agua fría e internet.', 1, 45, 1, 3, 1),
(8, 'Habitación-Jacuzzi-Vip', '', 303, 'Habitación Jacuzzi Vip, 8m x 7m, cama dos plazas, tv de 50, espejos, aire acondicionado, baño agua caliente, jacuzzi de agua fría e internet.', 1, 60, 1, 3, 1),
(9, 'Habitación-Jacuzzy-Vip', '', 304, 'Habitación Jacuzzi Vip, 8m x 7m, cama dos plazas, tv de 50, espejos, aire acondicionado, baño agua caliente, jacuzzi de agua fría e internet.', 1, 60, 1, 3, 1),
(10, 'Habitación-jacuzzi-Premier', '', 305, 'Habitación Jacuzzi Vip, 8m x 8m, cama dos plazas, tv de 60, espejos, aire acondicionado, baño agua caliente, jacuzzi de agua espumas , vino, frio bar e internet.', 2, 90, 1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id` int(11) NOT NULL,
  `apertura` date NOT NULL,
  `cierre` date NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id` int(11) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `precio_habitacion` int(11) NOT NULL,
  `horas` int(11) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  `monto_total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` int(11) NOT NULL COMMENT '1|Solicitado 2|Aprobado 3|Cancelado 4|Completado',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`id`, `habitacion_id`, `usuario_id`, `fecha_reserva`, `precio_habitacion`, `horas`, `dias`, `monto_total`, `created_at`, `estado`, `updated_at`) VALUES
(7, 1, 5, '2023-03-25', 25, NULL, NULL, 25, '2023-03-25 18:28:28', 4, '2023-03-25 18:28:28'),
(8, 2, 6, '2023-03-25', 30, NULL, NULL, 30, '2023-03-25 22:56:43', 3, '2023-03-25 22:56:43'),
(9, 1, 5, '2023-03-26', 25, NULL, NULL, 25, '2023-03-26 00:05:12', 4, '2023-03-26 00:05:12'),
(10, 2, 7, '2023-03-26', 30, NULL, NULL, 30, '2023-03-26 00:28:44', 4, '2023-03-26 00:28:44'),
(11, 1, 9, '2023-03-26', 25, NULL, NULL, 25, '2023-03-26 00:44:53', 4, '2023-03-26 00:44:53'),
(12, 5, 5, '2023-03-28', 45, NULL, NULL, 45, '2023-03-28 00:06:32', 4, '2023-03-28 00:06:32'),
(13, 3, 5, '2023-03-28', 35, NULL, NULL, 35, '2023-03-28 17:33:30', 1, '2023-03-28 17:33:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` int(11) NOT NULL,
  `nombre_sede` varchar(100) NOT NULL,
  `ruc_sede` bigint(20) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id`, `nombre_sede`, `ruc_sede`, `estado`) VALUES
(1, 'Empresa Electrolux', 20538856674, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_alerta`
--

CREATE TABLE `tipo_alerta` (
  `id` int(11) NOT NULL,
  `nombre_alerta` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_alerta`
--

INSERT INTO `tipo_alerta` (`id`, `nombre_alerta`, `estado`) VALUES
(1, 'Trafico', 1),
(2, 'Familiar', 1),
(3, 'Salud', 1),
(4, 'Otros', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `sexo` int(1) NOT NULL COMMENT '1:Masculino|2:Femenino',
  `dni` int(8) DEFAULT NULL,
  `correo` varchar(200) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `tipo` int(11) NOT NULL,
  `nombre_imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1,
  `sw_mayoredad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombres`, `apellidos`, `sexo`, `dni`, `correo`, `contrasena`, `tipo`, `nombre_imagen`, `created_at`, `updated_at`, `status`, `sw_mayoredad`) VALUES
(1, 'Manuel Angel', 'Rojas Sanchez', 1, NULL, 'manuelito', '12345', 1, 'c8cdeb18-9265-4391-912d-716daa06cb14.jpeg', '2023-02-08 23:17:18', '2023-02-08 23:17:18', 1, 0),
(2, 'dadads', NULL, 1, 14859687, 'dasdadad', '12121', 0, NULL, '2023-02-14 01:02:03', '2023-02-14 01:02:03', 1, 0),
(3, 'Mariango', 'Velez', 1, NULL, 'mariango@gmail.com', '123456', 2, NULL, '2023-02-14 01:25:52', '2023-02-14 01:25:52', 1, 0),
(4, 'Luis llaves', 'cerrojos pastor', 2, NULL, 'llaves24@gmail.com', '12345', 1, 'b55d86b3-67c2-4a46-a038-deecd89638e5.jpeg', '2023-02-14 01:29:27', '2023-02-14 01:29:27', 1, 0),
(5, 'Esteban manuel', 'Lopez bueno', 1, 74859632, 'Jesusas@gmail.com', '12345', 2, NULL, '2023-02-14 01:44:43', '2023-02-14 01:44:43', 1, 0),
(6, 'Martin', 'Aguirre', 2, NULL, 'martin@gmail.com', '12345', 2, NULL, '2023-02-14 01:46:04', '2023-02-14 01:46:04', 1, 0),
(7, 'Percy Andree', 'Torres Lopez', 1, NULL, 'Percy@gmail.com', '12345', 2, '63c59aaa-fbe8-4d63-a7ba-4c60d8e9a221.jpeg', '2023-02-19 23:53:02', '2023-02-19 23:53:02', 1, 0),
(9, 'loco', NULL, 1, NULL, 'manuel_13@gmail.com', '12355', 2, NULL, '2023-02-20 20:10:14', '2023-02-20 20:10:14', 1, 0),
(12, 'Edgar', NULL, 1, NULL, 'mikito@gmail.com', '12345', 2, NULL, '2023-02-20 20:21:15', '2023-02-20 20:21:15', 1, 0),
(13, 'lucho cuellar', 'rojas sanchez', 1, NULL, 'cuellar@gmail.com', '12345', 2, NULL, '2023-02-23 23:34:55', '2023-02-23 23:34:55', 1, 0),
(14, 'Paolo Nome', 'Hurtado Reynosi', 1, NULL, 'Hurtado_14@gmail.com', '123456', 2, NULL, '2023-03-28 18:21:21', '2023-03-28 18:21:21', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo_alerta` (`id_tipo_alerta`),
  ADD KEY `alertas_usuarios` (`usuario_id`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado_id` (`empleado_id`);

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `habitacion_id` (`habitacion_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_alerta`
--
ALTER TABLE `tipo_alerta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertas`
--
ALTER TABLE `alertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `avisos`
--
ALTER TABLE `avisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_alerta`
--
ALTER TABLE `tipo_alerta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD CONSTRAINT `alertas_ibfk_1` FOREIGN KEY (`id_tipo_alerta`) REFERENCES `tipo_alerta` (`id`),
  ADD CONSTRAINT `alertas_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `reservaciones_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`),
  ADD CONSTRAINT `reservaciones_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
