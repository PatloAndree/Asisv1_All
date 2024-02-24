<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuarios_model extends CI_Model {



	function getUsuarios(){
		$query = "SELECT * FROM users WHERE status=1";
		$usuarios=$this->db->query($query);
	
		if($usuarios->num_rows()>0){
			return $usuarios->result();
		}else{
			return 0;
		}
	}
}