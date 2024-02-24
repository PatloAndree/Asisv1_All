<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Usuarios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
	}
	public function index()
	{	
		$this->load->helper('url');
		
		// $this->load->view('usuarios_view') ;
        echo "dhadadad";

	}

	public function Login (){

	}
	public function getUsuarios(){
		$this->load->model('Usuarios_model');
		$datos = $this->Usuarios_model->getUsuarios();
		$data = json_encode($datos);
		echo $data;
		// $general = array();
		// foreach ($datos as $valor) {
		// 	$lista = array(
		// 		'id' => $valor->id,
		// 		'nombres' =>$valor->nombres,
		// 		'apellidos' =>$valor->apellidos,
		// 		'correo' =>$valor->correo,
		// 		'contrasena' =>$valor->contrasena,

		// 	);
		// 	// array_push($lista, $general);
		// }
		
		// print_r($lista);
	}
}
