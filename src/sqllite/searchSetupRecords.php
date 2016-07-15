 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    if($_GET["serial_number"] != undefined or $_GET["serial_number"] != ''){
    	$serial_number = "serial_number=\'".$_GET["serial_number"]."\'";
    }
    $result = exec("python inventory_management.py $api $serial_number");
    echo $result;    
  ?>
