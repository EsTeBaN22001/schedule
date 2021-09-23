<?php
if($_POST['action'] == 'create'){
  // Creará un nuevo registro en la base de datos
  require_once('../functions/db.php');

  // Validar las entradas
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $company = filter_var($_POST['company'], FILTER_SANITIZE_STRING);
  $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);

  try {
    $stmt = $conn->prepare("INSERT INTO contacts (name, company, phone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $company, $phone);
    $stmt->execute();
    if($stmt->affected_rows == 1){
      $response = array(
        'response' => 'Correct',
        'id_inserted' => $stmt->insert_id,
        'data' => array(
          'name' => $name,
          'company' => $company,
          'phone' => $phone
        )
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