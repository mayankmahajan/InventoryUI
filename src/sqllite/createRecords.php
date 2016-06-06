
 <?php
    $x= $_GET["arg1"];
    
    $result = exec("python inventory_management.py $x");
    echo $x
    echo $result
  ?>