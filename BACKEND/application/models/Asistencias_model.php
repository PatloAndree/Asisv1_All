<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Asistencias_model extends CI_Model {



	// function validar_login($email = '', $password = ''){
	// 	$this->db->select('correo');
	// 	$this->db->where('correo', $email);
	// 	$queryResult = $this->db->get('users');
	// 	if ($queryResult->num_rows() > 0) {
	// 		$this->db->select('id,nombres, apellidos, 
	// 		correo, contrasena, tipo');
	// 		$this->db->where('correo', $email);
			
	// 		$this->db->where('contrasena', $password);
	// 		$this->db->where('status', '1');

	// 		$queryUsuario = $this->db->get('users');

	// 		if ($queryUsuario->num_rows() == 1) {
	// 			return $queryUsuario->row();
	// 		} else {
	// 			return '0';
	// 		}
	// 	} else {
	// 		return '-1';
	// 	}
	// }

	function agregarAsistencia($dataInsert){
		if ($this->db->insert('asistencias',$dataInsert)) {
            return '1';
        }else{
            return '0';
        }
	}

	function obtenerAsistencia($usuario_id,$fecha_hoy){
		$this->db->where('empleado_id',$usuario_id);
		$this->db->where('dia_asistencia',$fecha_hoy);

		$usuario=$this->db->get('asistencias');
		if($usuario->num_rows()>0){
			return $usuario->row();
		}else{
			return 0;
		}
	}

	
    function obtenerAsistencias($tiempito){
        // $query = "SELECT 
		// u.nombres,
        // u.apellidos, 
		// a.dia_asistencia,
        // a.hora_ingreso,
        // a.hora_refrigerio,
        // a.hora_salida
		// FROM asistencias a 
		// LEFT JOIN users u ON u.id = a.empleado_id order by a.dia_asistencia DESC";

		// $usuarios=$this->db->query($query);
	
		// if($usuarios->num_rows()>0){
		// 	return $usuarios->result();
		// }else{
		// 	return 0;
		// }

		$query = "SELECT 
		u.nombres,
		u.apellidos, 
		a.dia_asistencia,
		a.hora_ingreso,
		a.hora_refrigerio,
			a.hora_salida
		FROM asistencias a 
		LEFT JOIN users u ON u.id = a.empleado_id 
		WHERE a.dia_asistencia BETWEEN DATE_SUB(CURDATE(), INTERVAL $tiempito DAY) AND CURDATE()
		ORDER BY a.dia_asistencia DESC";
	
		$usuarios = $this->db->query($query);
	
		if ($usuarios->num_rows() > 0) {
			return $usuarios->result();
		} else {
			return 0;
		}
	}


	function obtenerAsistenciasPanel(){
		// $query = "SELECT
		// 	u.nombres,
		// 	u.apellidos,
		// 	GROUP_CONCAT(CONCAT(a.hora_ingreso)) as horas_ingreso
		// FROM asistencias a
		// LEFT JOIN users u ON u.id = a.empleado_id
		// WHERE WEEK(a.dia_asistencia) = WEEK(CURDATE())
		// GROUP BY u.id
		// ORDER BY u.nombres, u.apellidos ASC";

		// $query = "SELECT 
		// 		u.nombres,
		// 		u.apellidos,
		// 		GROUP_CONCAT(
		// 			CASE DAYOFWEEK(a.dia_asistencia)
		// 			WHEN 1 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 2 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 3 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 4 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 5 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 6 THEN CONCAT(a.hora_ingreso)
		// 			WHEN 7 THEN CONCAT(a.hora_ingreso)
		// 			END
		// 			ORDER BY a.dia_asistencia ASC
		// 		) as horas_ingreso
		// 	FROM 
		// 		asistencias a
		// 	LEFT JOIN 
		// 		users u ON u.id = a.empleado_id
		// 	WHERE 
		// 		WEEK(a.dia_asistencia) = WEEK(CURDATE())
		// 	GROUP BY 
		// 		u.id
		// 	ORDER BY 
		// 		MAX(a.hora_ingreso) DESC";

		// $query = "SELECT 
		// 			u.nombres,
		// 			u.apellidos,
		// 			GROUP_CONCAT(
		// 				DISTINCT COALESCE(
		// 					CASE DAYOFWEEK(a.dia_asistencia)
		// 						WHEN 1 THEN a.hora_ingreso
		// 						WHEN 2 THEN a.hora_ingreso
		// 						WHEN 3 THEN a.hora_ingreso
		// 						WHEN 4 THEN a.hora_ingreso
		// 						WHEN 5 THEN a.hora_ingreso
		// 						WHEN 6 THEN a.hora_ingreso
		// 						WHEN 7 THEN a.hora_ingreso
		// 					END,
		// 					'0'  -- Valor predeterminado si no hay datos para el día
		// 				)
		// 				ORDER BY a.dia_asistencia ASC
		// 			) as horas_ingreso_array
		// 		FROM 
		// 			asistencias a
		// 		LEFT JOIN 
		// 			users u ON u.id = a.empleado_id
		// 		WHERE 
		// 			WEEK(a.dia_asistencia) = WEEK(CURDATE())
		// 		GROUP BY 
		// 			u.id
		// 		ORDER BY 
		// 			MAX(a.hora_ingreso) DESC";
		$query = "SELECT 
		u.nombres,
		u.apellidos,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 1 THEN a.hora_ingreso END), '0') AS domingo,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 2 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 0 THEN '0' ELSE NULL END) AS lunes,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 3 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 1 THEN '0' ELSE NULL END) AS martes,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 4 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 2 THEN '0' ELSE NULL END) AS miercoles,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 5 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 3 THEN '0' ELSE NULL END) AS jueves,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 6 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 4 THEN '0' ELSE NULL END) AS viernes,
		COALESCE(MAX(CASE WHEN DAYOFWEEK(a.dia_asistencia) = 7 THEN a.hora_ingreso END), 
				 CASE WHEN WEEKDAY(CURDATE()) > 5 THEN '0' ELSE NULL END) AS sábado
	FROM 
		users u
	LEFT JOIN 
		asistencias a ON u.id = a.empleado_id AND WEEK(a.dia_asistencia) = WEEK(CURDATE())
	GROUP BY 
		u.id
	ORDER BY 
		MAX(a.hora_ingreso) DESC";
		$usuarios=$this->db->query($query);
	
		if($usuarios->num_rows()>0){
			return $usuarios->result();
		}else{
			return 0;
		}
	}



	function obtenerAsistenciasPorId($usuario_id){
        $query = "SELECT 
		u.nombres,
        u.apellidos, 
		a.dia_asistencia,
        a.hora_ingreso,
        a.hora_refrigerio,
        a.hora_salida
		FROM asistencias a 
		LEFT JOIN users u ON u.id = a.empleado_id
		WHERE empleado_id = $usuario_id order by a.dia_asistencia DESC" ;
		

		$usuarios=$this->db->query($query);
	
		if($usuarios->num_rows()>0){
			return $usuarios->result();
		}else{
			return 0;
		}
	}


	// function updateUsuario($usuario_id,$dataUpdate){
	// 	$this->db->where('id',$usuario_id);	
	// 	if ($this->db->update('users',$dataUpdate)) {
    //         return 1;
    //     }else{
    //         return 0;
    //     }
	// }

	function editarAsistencia($usuario_id,$fecha_hoy,$hora_refrigerio){
		// $this->db->where('id',$usuario_id);	
		$this->db->select('empleado_id,dia_asistencia');
		$this->db->where('empleado_id', $usuario_id);
		$this->db->where('dia_asistencia', $fecha_hoy);
		$queryResult = $this->db->get('asistencias');

		if ($queryResult->num_rows() > 0) {
			$this->db->set('hora_refrigerio',$hora_refrigerio)->where('empleado_id',$usuario_id)->where('dia_asistencia',$fecha_hoy)->update('asistencias');
		
			return 1;	
		}
		else{
            return 0;
        }
	}

    function editarAsistencia2($usuario_id,$fecha_hoy,$hora_salida){
		// $this->db->where('id',$usuario_id);	
		$this->db->select('empleado_id,dia_asistencia');
		$this->db->where('empleado_id', $usuario_id);
		$this->db->where('dia_asistencia', $fecha_hoy);
		$queryResult = $this->db->get('asistencias');

		if ($queryResult->num_rows() > 0) {
			$this->db->set('hora_salida',$hora_salida)->where('empleado_id',$usuario_id)->where('dia_asistencia',$fecha_hoy)->update('asistencias');
		
			return 1;	
		}
		else{
            return 0;
        }
	}

}