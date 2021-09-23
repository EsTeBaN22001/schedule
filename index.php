<?php 
  include 'includes/layout/header.php'; 
  include 'includes/functions/functions.php';
?>

<div class="bar-container">
  <h1>Agenda de contactos</h1>
</div>

<div class="container section form-container shadow">
  <form action="#" id="contact">
    <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>

    <?php include 'includes/layout/form.php'; ?>
  </form>
</div>

<div class="container section shadow contact">
  <div class="contacts-container container">
    <h2>Contactos</h2>

    <input type="text" id="search" class="search shadow" placeholder="Buscar contactos...">

    <p class="total-contacts"><span></span> Contactos</p>

    <table id="list-contacts" class="list-contacts">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Empresa</th>
          <th>Telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <?php $contacts = getContacts();
        if($contacts->num_rows): ?>
          <?php foreach($contacts as $contact){ ?>
            <tr>
              <td><?php echo $contact['name']; ?></td>
              <td><?php echo $contact['company']; ?></td>
              <td><?php echo $contact['phone']; ?></td>
              <td>
                <a href="edit.php?id=<?php echo $contact['id']; ?>" class="btn-edit">
                  <i class="fas fa-pen-square"></i>
                </a>
                <button data-id="<?php echo $contact['id']; ?>" type="button" class="btn-delete">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          <?php };
        endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php include 'includes/layout/footer.php'; ?>