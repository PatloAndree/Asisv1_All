<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Asistencia extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
	}

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{	
		$this->load->helper('url');
		echo "entrando correcto";
		// $data['hola'] = "ALBERTO FUJIMORI";
		// $this->load->view('usuarios_view', $data) ;

	}
	public function login(){

		$request = json_decode(file_get_contents('php://input'));
		$email = $request->usuario;
		$password = $request->contrasena;
		$this->load->model('Login_model');
		$resultAdmin = $this->Login_model->validar_login($email,$password);
		
		if($resultAdmin == '-1') {
			$dataResult = array("error" => '1', "msn" => "¡Verifique sus credenciales!");
		}  
		else if ($resultAdmin == '0') {
			$dataResult = array("error" => '1', "msn" => "¡Las credenciales ingresadas son incorrectos!");
		} else if (is_object($resultAdmin)) {

			$dataResult = array("error" => '0', "msn" => "Credenciales correctas");
		}

		echo json_encode($resultAdmin);

	}

	public function agregarAsistencia(){
		$request = json_decode(file_get_contents('php://input'));
		$dataInsert['empleado_id'] = $request->empleado_id;
		$dataInsert['dia_asistencia'] = $request->dia_fecha;
		$dataInsert['hora_ingreso'] = $request->hora_ingreso;
		$dataInsert['latitud'] = $request->latitud;
		$dataInsert['longitud'] = $request->longitud;
		$this->load->model('Asistencias_model');
		$sw_insert = $this->Asistencias_model->agregarAsistencia($dataInsert);
		if ($sw_insert > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}



	public function getAsistencia()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$fecha_hoy = $request->fechadehoy;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->obtenerAsistencia($usuario_id,$fecha_hoy);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}
    public function getAsistencias()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$tiempito = $request->tiempo;
		// $fecha_hoy = $request->fechadehoy;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->obtenerAsistencias($tiempito);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	public function getAsistenciasPanel()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		// $usuario_id = $request->usuario;
		// $fecha_hoy = $request->fechadehoy;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->obtenerAsistenciasPanel();
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	   public function getAsistenciasPorId()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		// $fecha_hoy = $request->fechadehoy;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->obtenerAsistenciasPorId($usuario_id);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	

	// public function editarUsuario(){
	// 	$request = json_decode(file_get_contents('php://input'));
	// 	$usuario_id = $request->id;
	// 	$dataUpdate['nombres'] = $request->nombres;
	// 	$dataUpdate['apellidos'] = $request->apellidos;
	// 	$dataUpdate['correo'] = $request->correo;
	// 	$dataUpdate['contrasena'] = $request->contrasena;
	// 	// $dataUpdate['tipo'] = 2;
	// 	$this->load->model('Login_model');
	// 	$sw_update = $this->Login_model->updateUsuario($usuario_id,$dataUpdate);
	// 	if ($sw_update > 0) {			
	// 		echo 1;
	// 	}else{
	// 		echo 0 ;
	// 	}
	// }


	public function editarAsistencia(){
        $request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$fecha_hoy = $request->fechadehoy;
		$hora_refrigerio = $request->hora_refrigerio;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->editarAsistencia($usuario_id,$fecha_hoy,$hora_refrigerio);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}
    public function editarAsistencia2(){
        $request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$fecha_hoy = $request->fechadehoy;
		$hora_salida = $request->hora_salida;
		$this->load->model('Asistencias_model');
		$datos = $this->Asistencias_model->editarAsistencia2($usuario_id,$fecha_hoy,$hora_salida);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}
}
