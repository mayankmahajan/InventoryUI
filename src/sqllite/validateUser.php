 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    if($_GET["username"] != undefined or $_GET["username"] != ''){
    	$username = 'user_name="\''.$_GET["username"].'\'"';
    }
    if($_GET["password"] != undefined or $_GET["password"] != ''){
    	$password = 'user_password="\''.$_GET["password"].'\'"';
    }


    
    $result = exec("python inventory_management.py $api $username $password");
    echo $result;    
  ?>
