 <?php
    
    if($_GET["api"] != undefined or $_GET["api"] != ''){
    	$api = "api=\'".$_GET["api"]."\'";
    }
    if($_GET["serial_number"] != undefined or $_GET["serial_number"] != ''){
    	$serial_number = "serial_number=\'".$_GET["serial_number"]."\'";
    }
    if($_GET["setup_ip"] != 'undefined'){
    	$setup_ip = "setup_ip=\'".$_GET["setup_ip"]."\'";
    }
    if($_GET["role"] != 'undefined'){
    	$role = "role=\'".$_GET["role"]."\'";
    }
    if($_GET["vip"] != 'undefined'){
    	$vip = "vip=\'".$_GET["vip"]."\'";
    }
    if($_GET["ram"] != 'undefined'){
    	$ram = "ram=\'".$_GET["ram"]."\'";
    }
    if($_GET["hard_disk"] != 'undefined'){
    	$hard_disk = "hard_disk=\'".$_GET["hard_disk"]."\'";
    }
    if($_GET["storage_size"] != 'undefined'){
    	$storage_size = "storage_size=\'".$_GET["storage_size"]."\'";
    }
    if($_GET["storage_ip"] != 'undefined'){
    	$storage_ip = "storage_ip=\'".$_GET["storage_ip"]."\'";
    }
    if($_GET["storage_initiator_name"] != 'undefined'){
    	$storage_initiator_name = "storage_initiator_name=\'".$_GET["storage_initiator_name"]."\'";
    }
    if($_GET["project_name"] != 'undefined'){
    	$project_name = "project_id=\'".$_GET["project_name"]."\'";
    }
    if($_GET["storage_target_ip"] != 'undefined'){
    	$storage_target_ip = "storage_target_ip=\'".$_GET["storage_target_ip"]."\'";
    }
    if($_GET["creation_time"] != 'undefined'){
    	$creation_time = "creation_time=\'".$_GET["creation_time"]."\'";
    }
    if($_GET["current_version"] != 'undefined'){
    	$current_version = "current_version=\'".$_GET["current_version"]."\'";
    }
    if($_GET["vm_id"] != 'undefined'){
    	$vm_id = "vm_id=\'".$_GET["vm_id"]."\'";
    }
    if($_GET["comments"] != 'undefined'){
    	$comments = "comments=\'".$_GET["comments"]."\'";
    }
    if($_GET["cores"] != 'undefined'){
        $cores = "cores=\'".$_GET["cores"]."\'";
    }
    if($_GET["created_by"] != 'undefined'){
        $created_by = "created_by=\'amit.saxena\'";
    }


    
    $result = exec("python inventory_management.py $api $serial_number $manufacturer $setup_ip $role $vip $ram $hard_disk $storage_size $storage_ip $storage_initiator_name $project_name $storage_target_ip $creation_time $current_version $vm_id $comments $cores $created_by");
    echo $result;    
  ?>
