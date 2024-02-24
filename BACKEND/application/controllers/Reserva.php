<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Reserva extends CI_Controller {

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
    
    public function getReservas()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$this->load->model('Reservas_model');
		$datos = $this->Reservas_model->getReservas();
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	public function agregarReserva(){
		$request = json_decode(file_get_contents('php://input'));
		$habitacion_id = $request->habitacion_id;
		$usuario_id = $request->usuario_id;

		$dataInsert['habitacion_id'] = $request->habitacion_id;
		$dataInsert['usuario_id'] = $request->usuario_id;
		$dataInsert['fecha_reserva'] = $request->fecha_reserva;
		$dataInsert['precio_habitacion'] = $request->precio;
		$dataInsert['monto_total'] = $request->monto_total;
		$dataInsert['estado'] = $request->estado;
	
		$this->load->model('Reservas_model');
		$sw_insert = $this->Reservas_model->agregarReserva($dataInsert,$habitacion_id,$usuario_id);
		if ($sw_insert > 0) {			
			echo 1;
		}else{
			echo 0 ;
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

	public function getAlertasActivas()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$this->load->model('Alertas_model');
		$datos = $this->Alertas_model->getAlertasActivas();
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

	public function getDesactivarAlertas(){
		$request = json_decode(file_get_contents('php://input'));
		$alerta_id = $request->alerta_id;
		// $dataUpdate['tipo'] = 2;
		$this->load->model('Alertas_model');
		$sw_update = $this->Alertas_model->getDesactivarAlertas($alerta_id);
		if ($sw_update > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}

	public function getNotificacionesAlertasPorId()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$this->load->model('Alertas_model');
		$datos = $this->Alertas_model->getNotificacionesAlertasPorId($usuario_id);
		if ($datos == '0') {
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
		} else {
			echo json_encode($datos);
		}
	}

   


}
