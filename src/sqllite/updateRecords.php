 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    if($_GET["serial_number"] != undefined or $_GET["serial_number"] != ''){
    	$serial_number = 'serial_number="\''.$_GET["serial_number"].'\'"';
    }
    if($_GET["manufacturer"] != 'undefined'){
    	$manufacturer = 'manufacturer="\''.$_GET["manufacturer"].'\'"';
    }
    if($_GET["management_ip"] != 'undefined'){
    	$management_ip = 'management_ip="\''.$_GET["management_ip"].'\'"';
    }
    if($_GET["profile_name"] != 'undefined'){
    	$profile_name = 'profile_name="\''.$_GET["profile_name"].'\'"';
    }
    if($_GET["ram"] != 'undefined'){
    	$ram = 'ram="\''.$_GET["ram"].'\'"';
    }
    if($_GET["hard_disk"] != 'undefined'){
    	$hard_disk = 'hard_disk="\''.$_GET["hard_disk"].'\'"';
    }
    if($_GET["primary_owner"] != 'undefined'){
    	$primary_owner = 'primary_owner="\''.$_GET["primary_owner"].'\'"';
    }
    if($_GET["secondary_owner"] != 'undefined'){
    	$secondary_owner = 'secondary_owner="\''.$_GET["secondary_owner"].'\'"';
    }
    if($_GET["tertiary_owner"] != 'undefined'){
    	$tertiary_owner = 'tertiary_owner="\''.$_GET["tertiary_owner"].'\'"';
    }
    if($_GET["project_name"] != 'undefined'){
    	$project_name = 'project_id="\''.$_GET["project_name"].'\'"';
    }
    if($_GET["product_name"] != 'undefined'){
    	$product_name = 'product_name="\''.$_GET["product_name"].'\'"';
    }
    if($_GET["setup_name"] != 'undefined'){
    	$setup_name = 'setup_name="\''.$_GET["setup_name"].'\'"';
    }
    if($_GET["base_os_ip"] != 'undefined'){
    	$base_os_ip = 'base_os_ip="\''.$_GET["base_os_ip"].'\'"';
    }
    if($_GET["base_os_username"] != 'undefined'){
    	$base_os_username = 'base_os_username="\''.$_GET["base_os_username"].'\'"';
    }
    if($_GET["base_os_password"] != 'undefined'){
    	$base_os_password = 'base_os_password="\''.$_GET["base_os_password"].'\'"';
    }
    if($_GET["vm"] != 'undefined'){
    	$vm = 'vm="\''.$_GET["vm"].'\'"';
    }
    if($_GET["comments"] != 'undefined'){
    	$comments = 'comments="\''.$_GET["comments"].'\'"';
    }
    if($_GET["cores"] != 'undefined'){
    	$cores = 'cores="\''.$_GET["cores"].'\'"';
    }
    if($_GET["created_by"] != 'undefined'){
        $created_by = "created_by=\'amit.saxena\'";
    }


    
    $result = exec("python inventory_management.py $api $serial_number $manufacturer $management_ip $profile_name $ram $hard_disk $primary_owner $secondary_owner $tertiary_owner $project_name $product_name $setup_name $base_os_ip $base_os_username $base_os_password $vm $comments $cores $created_by");
    echo $result;    
  ?>
