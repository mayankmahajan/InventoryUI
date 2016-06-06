
 <?php
    $x= $_POST["date"];
    
    $result = exec("python inventory_management.py");
    
    echo $result
  ?>