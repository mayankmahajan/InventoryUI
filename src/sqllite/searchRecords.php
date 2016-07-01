 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    if($_GET["serial_number"] != undefined or $_GET["serial_number"] != ''){
    	$serial_number = "serial_number=\'".$_GET["serial_number"]."\'";
    }
    if($_GET["manufacturer"] != 'undefined'){
    	$manufacturer = "manufacturer=\'".$_GET["manufacturer"]."\'";
    }
    if($_GET["management_ip"] != 'undefined'){
    	$management_ip = "management_ip=\'".$_GET["management_ip"]."\'";
    }
    if($_GET["profile_name"] != 'undefined'){
    	$profile_name = "profile_name=\'".$_GET["profile_name"]."\'";
    }
    if($_GET["ram"] != 'undefined'){
    	$ram = "ram=\'".$_GET["ram"]."\'";
    }
    if($_GET["hard_disk"] != 'undefined'){
    	$hard_disk = "hard_disk=\'".$_GET["hard_disk"]."\'";
    }
    if($_GET["primary_owner"] != 'undefined'){
    	$primary_owner = "primary_owner=\'".$_GET["primary_owner"]."\'";
    }
    if($_GET["secondary_owner"] != 'undefined'){
    	$secondary_owner = "secondary_owner=\'".$_GET["secondary_owner"]."\'";
    }
    if($_GET["tertiary_owner"] != 'undefined'){
    	$tertiary_owner = "tertiary_owner=\'".$_GET["tertiary_owner"]."\'";
    }
    if($_GET["project_name"] != 'undefined'){
    	$project_name = "project_name=\'".$_GET["project_name"]."\'";
    }
    if($_GET["hardware_type"] != 'undefined'){
    	$hardware_type = "hardware_type=\'".$_GET["hardware_type"]."\'";
    }
    if($_GET["setup_name"] != 'undefined'){
    	$setup_name = "setup_name=\'".$_GET["setup_name"]."\'";
    }
    if($_GET["cores"] != 'undefined'){
    	$cores = "cores=\'".$_GET["cores"]."\'";
    }

    
    $result = exec("python inventory_management.py $api $serial_number $manufacturer $management_ip $profile_name $ram $hard_disk $primary_owner $secondary_owner $tertiary_owner $project_name $cores $setup_name");
    echo $result;    
  ?>
