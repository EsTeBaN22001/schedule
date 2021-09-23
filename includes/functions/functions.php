<?php 

function getContacts(){
  include 'db.php';

  try {
    return $conn->query('SELECT * FROM contacts');
  } catch (Exception $e) {
    echo 'Error! ' . $e->getMessage() . '</br>';
    return false;
  }
}

function getContactById($id){
  include 'db.php';

  try {
    return $conn->query("SELECT * FROM contacts WHERE id = $id");
  } catch (Exception $e) {
    echo 'Error! ' . $e->getMessage() . '</br>';
    return false;
  }
}

?>