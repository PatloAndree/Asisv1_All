<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Avisos_model extends CI_Model {

    function agregarAviso($dataInsert){
		if ($this->db->insert('avisos',$dataInsert)) {
            return '1';
        }else{
            return '0';
        }
	}

	function updateAviso($aviso_id,$dataUpdate){
		$this->db->where('id',$aviso_id);	
		if ($this->db->update('avisos',$dataUpdate)) {
            return 1;
        }else{
            return 0;
        }
	}



    function getAvisos(){
		$query = "SELECT * from avisos WHERE estado=1 ORDER BY fecha_aviso DESC";
		$alertas=$this->db->query($query);
	
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}

	function getNotificacionesAlertas(){
		$query = "SELECT 
		u.nombres,
        u.apellidos, 
		a.mensaje_alerta,
        a.fecha_alerta,
        t.nombre_alerta,

		FROM alertas a 
		LEFT JOIN users u ON u.id = a.usuario_id
		LEFT JOIN tipo_alerta t ON t.id = a.id_tipo_alerta";
		$alertas=$this->db->query($query);
	
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}

	function getNotificacionesAvisosPorId($usuario_id){
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
		WHERE usuario_id = $usuario_id
		";

		$alertas=$this->db->query($query);
		if($alertas->num_rows()>0){
			return $alertas->result();
		}else{
			return 0;
		}
	}


}