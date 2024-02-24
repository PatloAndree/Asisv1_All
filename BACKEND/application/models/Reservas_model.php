<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reservas_model extends CI_Model {

    function agregarReserva($dataInsert,$habitacion_id,$usuario_id){

        $this->db->select('fecha_reserva,habitacion_id');
		$this->db->where('usuario_id', $usuario_id);
		$queryResult = $this->db->get('reservaciones');
        if($queryResult->num_rows() > 0){
            return '0';
        }else{
            if ($this->db->insert('reservaciones',$dataInsert)) {
                $this->db->set('estado',2)->where('id',$habitacion_id)->update('habitaciones');
                return '1';
            }else{
                return '0';
            }
        }

		// if ($queryResult->num_rows() > 0) {
		// 	$this->db->set('nombre_imagen',$nombreImagen)->where('id',$id_usuario)->update('users');
		// 	return 1;	
		// }
		// else{
        //     return 0;
        // }


		
	}


    function getReservas(){
		// $query = "SELECT * from reservaciones ";
		// $reservaciones=$this->db->query($query);
		// if($reservaciones->num_rows()>0){
		// 	return $reservaciones->result();
		// }else{
		// 	return 0;
		// }

        $query = "SELECT 
		u.nombres,
        u.apellidos, 
		h.nombre_habitacion,
        h.numero_habitacion,
        h.precio,
        r.created_at

		FROM reservaciones r 
		LEFT JOIN users u ON u.id = r.usuario_id
		LEFT JOIN habitaciones h ON h.id = r.habitacion_id";
		$reservaciones=$this->db->query($query);
	
		if($reservaciones->num_rows()>0){
			return $reservaciones->result();
		}else{
			return 0;
		}
	}

	function getDesactivarAlertas($alerta_id){
		// $this->db->where('id',$usuario_id);	
		$this->db->select('usuario_id,mensaje_alerta');
		$this->db->where('id', $alerta_id);
		$queryResult = $this->db->get('alertas');

		if ($queryResult->num_rows() > 0) {
			$this->db->set('leido',0)->where('id',$alerta_id)->update('alertas');
		
			return 1;	
		}
		else{
            return 0;
        }
	}


	function getNotificacionesAlertas(){
		$query = "SELECT 
		a.id,
		u.nombres,
        u.apellidos, 
		a.mensaje_alerta,
        a.fecha_alerta,
        t.nombre_alerta,
		a.leido
		FROM alertas a 
		LEFT JOIN users u ON u.id = a.usuario_id
		LEFT JOIN tipo_alerta t ON t.id = a.id_tipo_alerta order by a.fecha_alerta DESC";
		$alertas=$this->db->query($query);
	
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}
	function getAlertasActivas(){
		$query = "SELECT 
		u.nombres,
        u.apellidos, 
		a.mensaje_alerta,
        a.fecha_alerta,
        t.nombre_alerta
		FROM alertas a 
		LEFT JOIN users u ON u.id = a.usuario_id
		LEFT JOIN tipo_alerta t ON t.id = a.id_tipo_alerta
		WHERE a.leido = 1";
		$alertas=$this->db->query($query);
	
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}

	function getNotificacionesAlertasPorId($usuario_id){
		// $query = "SELECT * from alertas WHERE estado=1";
		$query = "SELECT 
		u.nombres,
        u.apellidos, 
		a.mensaje_alerta,
        a.fecha_alerta,
        t.nombre_alerta
		FROM alertas a 
		LEFT JOIN users u ON u.id = a.usuario_id
		LEFT JOIN tipo_alerta t ON t.id = a.id_tipo_alerta
		WHERE usuario_id = $usuario_id ORDER BY a.fecha_alerta DESC
		";

		$alertas=$this->db->query($query);
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}


}