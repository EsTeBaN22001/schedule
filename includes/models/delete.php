<?php

if($_GET['action'] == 'delete'){
  require_once('../functions/db.php');

  $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
  
  try {
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    if($stmt->affected_rows == 1){
      $response = array(
        'response' => 'correct'
        );
    }
    $stmt->close();
    $conn->close();
  } catch (Exception $e) {
    $response = array(
      'error' => $e->getMessage()
    );
  }
  echo json_encode($response);
}

?>