<?php

session_start();
include('connection.php');

class LoginUser extends connection
{
    function __construct()
    {
        $this->connectionDB();
		$this->test();
    }
	
	function test(){
	    echo "hi ni";
		exit();
	}

  function login()
  {

      $user_name = $_REQUEST['username'];
      $user_pass = $_REQUEST['password'];



      $check_sql = "select id,user_name,password from tbl_users where user_name='$user_name' and password='$user_pass'";
      $check_query = pg_query($check_sql);
      $rs = pg_fetch_array($check_query);
    //  print_r($rs);
	if( $rs){
      if ($rs['user_name'] == $user_name && $rs['password']==$user_pass) {
          $_SESSION['logedin']=$rs['user_name'];
          $_SESSION['user_id']=$rs['id'];
		 // echo "hi";
          return "success";
      }else{
          return "failed";
      }
	}else{
		return "failed";
	}
  }

}
   $loginuser=new LoginUser();

   if(isset($_SESSION['logedin'])){
       echo "you are already login";
   }else {
        $res=$loginuser->login();
		if($res=="success"){
			echo "success";
		}else{
			echo "failed";
		}
   }
?>

