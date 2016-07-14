 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    
    $result = exec("python inventory_management.py $api ");
    echo $result;    
  ?>
