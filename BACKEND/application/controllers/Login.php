<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Login extends CI_Controller {

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
		echo base_url();
		$data['hola'] = "ALBERTO FUJIMORI";
		$this->load->view('usuarios_view', $data) ;

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

	public function agregarUsuario(){
		$request = json_decode(file_get_contents('php://input'));
		$correo = $request->email;
		$dataInsert['nombres'] = $request->names;
		$dataInsert['correo'] = $request->email;
		$dataInsert['contrasena'] = $request->password;
		$dataInsert['sexo'] = $request->sexo;
		$dataInsert['tipo'] = 2;
		$this->load->model('Login_model');
		$sw_insert = $this->Login_model->agregarUser($dataInsert,$correo);
		if ($sw_insert > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}

	public function getUsuario()	
	{	
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->usuario;
		$this->load->model('Login_model');
		// $usuario_id = $_POST['usuarioid'];
		// $this->usuarios_model->setUsuario_id($usuario_id);
		$datos = $this->Login_model->obtenerUsuario($usuario_id);

		if ($datos == '0') {
	
			$datos = array("error" => '1', "msn" => "¡Intentalo de nuevo!");
			
		} else {
			
			echo json_encode($datos);
		}
	
	}

	public function editarUsuario(){
		$request = json_decode(file_get_contents('php://input'));
		$usuario_id = $request->id;
		$dataUpdate['nombres'] = $request->nombres;
		$dataUpdate['apellidos'] = $request->apellidos;
		$dataUpdate['correo'] = $request->correo;
		$dataUpdate['contrasena'] = $request->contrasena;
		// $dataUpdate['tipo'] = 2;
		$this->load->model('Login_model');
		$sw_update = $this->Login_model->updateUsuario($usuario_id,$dataUpdate);
		if ($sw_update > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}

	public function recuperarContrasena(){
		$request = json_decode(file_get_contents('php://input'));
		$correo = $request->email;
		$password = $request->password;
		$this->load->model('Login_model');
		$sw_update = $this->Login_model->recuperarContrasena($correo,$password);
		if ($sw_update > 0) {			
			echo 1;
		}else{
			echo 0 ;
		}
	}

	public function grabarFoto(){
			$request = json_decode(file_get_contents('php://input'));
			$user_id = $_POST['user_id'];
			$photo_name = $_FILES['foto']['name'];
			$directory_local = 'uploads/imagen/';
			if (is_dir($directory_local) == FALSE){
				mkdir($directory_local, 0777,true);
			}
			$directorio_archivo = $directory_local. basename($_FILES['foto']['name']);
			move_uploaded_file($_FILES['foto']['tmp_name'], $directorio_archivo);

			$this->load->model('Login_model');;
			$datos = $this->Login_model->grabarImagen($user_id,$photo_name);
			if($datos > 0){
				echo 1;
			}else{
				echo 0;
			}
			// echo json_encode($photo_name);

	}
}
