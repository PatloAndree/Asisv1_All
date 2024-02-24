<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login_model extends CI_Model {



	function validar_login($email = '', $password = ''){
		$this->db->select('correo');
		$this->db->where('correo', $email);
		$queryResult = $this->db->get('users');
		if ($queryResult->num_rows() > 0) {
			$this->db->select('id,nombres, apellidos, 
			correo, contrasena, tipo');
			$this->db->where('correo', $email);
			
			$this->db->where('contrasena', $password);
			$this->db->where('status', '1');

			$queryUsuario = $this->db->get('users');

			if ($queryUsuario->num_rows() == 1) {
				return $queryUsuario->row();
			} else {
				return '0';
			}
		} else {
			return '-1';
		}
	}

	function agregarUser($dataInsert,$correo){
		// $this->db->select('correo');
		// $selectCorreo = $this->db->where('correo', $correo);
		// $query = "SELECT id,nombres,apellidos FROM users WHERE correo=$correo";
		// $response=$this->db->query($query);

		$this->db->select('correo');
		$this->db->where('correo', $correo);
		$queryResult = $this->db->get('users');
		// $resultado = $response->num_rows()<0
		if($queryResult->num_rows() > 0 ){
            return '0';
        }else{
			$this->db->insert('users',$dataInsert);
			return '1';
        }
	}

	function obtenerUsuario($usuario_id){
		$this->db->where('id',$usuario_id);
		$this->db->where('status',"1");
		$usuario=$this->db->get('users');
		if($usuario->num_rows()>0){
			return $usuario->row();
		}else{
			return 0;
		}
	}

	function updateUsuario($usuario_id,$dataUpdate){
		$this->db->where('id',$usuario_id);	
		if ($this->db->update('users',$dataUpdate)) {
            return 1;
        }else{
            return 0;
        }
	}

	function recuperarContrasena($correo,$password){
		// $this->db->where('id',$usuario_id);	
		$this->db->select('correo');
		$this->db->where('correo', $correo);
		$queryResult = $this->db->get('users');
		if ($queryResult->num_rows() > 0) {
			$this->db->set('contrasena',$password)->where('correo',$correo)->update('users');
		
			return 1;	
		}
		else{
            return 0;
        }
	}

	function grabarImagen($id_usuario,$nombreImagen){
		$this->db->select('nombres,apellidos');
		$this->db->where('id', $id_usuario);
		// $this->db->where('dia_asistencia', $fecha_hoy);
		$queryResult = $this->db->get('users');

		if ($queryResult->num_rows() > 0) {
			$this->db->set('nombre_imagen',$nombreImagen)->where('id',$id_usuario)->update('users');
			return 1;	
		}
		else{
            return 0;
        }
	}

	// if($adjunto != ""){
	// 	$ifp = fopen(ROOTPATH."public".(PHP_SHLIB_SUFFIX == "dll"?str_replace("/","\\",$nombre_file):$nombre_file), 'wb' );
	// 	fwrite( $ifp, base64_decode($adjunto) );
	// 	fclose( $ifp ); 
	// }
}