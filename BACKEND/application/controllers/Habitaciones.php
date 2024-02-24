<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Habitaciones extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{	
		$this->load->helper('url');
		echo "entrando correcto";
		// $data['hola'] = "ALBERTO FUJIMORI";
		// $this->load->view('usuarios_view', $data) ;
	}
    
    public function getHabitaciones()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$this->load->model('Habitaciones_model');
		$datos = $this->Habitaciones_model->getHabitaciones();
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	public function getNotificacionesAlertas()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$this->load->model('Alertas_model');
		$datos = $this->Alertas_model->getNotificacionesAlertas();
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	public function getNotificacionesAvisosPorId()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$this->load->model('Alertas_model');
		$datos = $this->Avisos_model->getNotificacionesAvisosPorId($usuario_id);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

    public function agregarAviso(){
		$request = json_decode(file_get_contents('php://input'));
		$dataInsert['area_aviso'] = $request->area_aviso;
		$dataInsert['tipo_aviso'] = $request->tipo_aviso;
		$dataInsert['titulo'] = $request->titulo;
		$dataInsert['aviso_mensaje'] = $request->message;
		$dataInsert['fecha_aviso'] = $request->fecha;
		$this->load->model('Avisos_model');
		$sw_insert = $this->Avisos_model->agregarAviso($dataInsert);
		if ($sw_insert > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}


}
