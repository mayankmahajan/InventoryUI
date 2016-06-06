 <?php
    if($_GET["serial_number"] != undefined or $_GET["serial_number"] != ){
    	$serial_number = "serial_number=\'".$_GET["serial_number"]."\'";
    }
    $serial_number = "serial_number=".$_GET["serial_number"];
    $cores = "cores=".$_GET["cores"];
    $manufacturer = "manufacturer=".$_GET["manufacturer"];
    $management_ip = "management_ip=".$_GET["management_ip"];
    $profile_name = "profile_name=".$_GET["profile_name"];
    $ram = "ram=".$_GET["ram"];
    $hard_disk = "hard_disk=".$_GET["hard_disk"];
    $primary_owner = "primary_owner=".$_GET["primary_owner"];
    $secondary_owner = "secondary_owner=".$_GET["secondary_owner"];
    $tertiary_owner = "tertiary_owner=".$_GET["tertiary_owner"];
    $project_name = "project_name=".$_GET["project_name"];
    $hardware_type = "hardware_type=".$_GET["hardware_type"];
    
    $result = exec("python inventory_management.py $serial_number $cores $manufacturer $management_ip $profile_name $ram $hard_disk $primary_owner $secondary_owner $tertiary_owner $project_name");
    echo $result;
    
  ?>
