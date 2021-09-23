<?php 
include 'includes/layout/header.php'; 
include 'includes/functions/functions.php';

$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if(!$id){
  die('No es válido');
}

$result = getContactById($id);

$contact = $result->fetch_assoc();

?>
<div class="bar-container">
  <div class="container bar">
    <a href="index.php" class="btn-back">Volver</a>
    <h1>Editar contacto</h1>
  </div>
</div>

<div class="container section form-container shadow">
  <form action="#" id="contact">
    <legend>Edite el contacto</legend>

    <?php include 'includes/layout/form.php'; ?>
  </form>
</div>

<?php include 'includes/layout/footer.php'; ?>