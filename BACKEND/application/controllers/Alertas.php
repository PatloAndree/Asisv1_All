<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Alertas extends CI_Controller {

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
    
    public function getAlertas()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$this->load->model('Alertas_model');
		$datos = $this->Alertas_model->getAlertas();
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

    public function agregarAlerta(){
		// $request = json_decode(file_get_contents('php://input'));
		// $dataInsert['usuario_id'] = $_POST['usuario'];
		// $dataInsert['id_tipo_alerta'] = $_POST['tipoalerta'];
		// $dataInsert['mensaje_alerta'] = $_POST['message'];
		// $dataInsert['fecha_alerta'] = $_POST['fecha'];
		$request = json_decode(file_get_contents('php://input'));
		$dataInsert['usuario_id'] = $request->usuario;
		$dataInsert['id_tipo_alerta'] = $request->tipoalerta;
		$dataInsert['mensaje_alerta'] = $request->message;
		$dataInsert['fecha_alerta'] = $request->fecha;

		// if($_FILES['foto']['name'] != ""){

		// 	$directory_local = 'uploads/alertas/';
	
		// 	if (is_dir($directory_local) == FALSE){
		// 		mkdir($directory_local, 0777,true);
		// 	}
		// 	$directorio_archivo = $directory_local. basename($_FILES['foto']['name']);
		// 	move_uploaded_file($_FILES['foto']['tmp_name'], $directorio_archivo);
	
		// 	$dataInsert['foto_alerta'] =$_FILES['foto']['name'];
		// }


		$this->load->model('Alertas_model');
		$sw_insert = $this->Alertas_model->agregarAlerta($dataInsert);
		if ($sw_insert > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}


}
