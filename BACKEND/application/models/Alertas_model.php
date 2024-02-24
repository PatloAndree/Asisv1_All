<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Alertas_model extends CI_Model {

    function agregarAlerta($dataInsert){
		if ($this->db->insert('alertas',$dataInsert)) {
            return '1';
        }else{
            return '0';
        }
	}


    function getAlertas(){
		$query = "SELECT id,nombre_alerta from tipo_alerta WHERE estado=1";
		$alertas=$this->db->query($query);
		if($alertas->num_rows()>0){
			return $alertas->result();
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
		a.id_tipo_alerta,
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