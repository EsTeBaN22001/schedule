<div class="fields">
  <div class="field">
    <label for="name">Nombre:</label>
    <input 
    type="text" 
    id="name" 
    placeholder="Nombre del contacto"
    value="<?php echo (isset($contact["name"])) ? $contact["name"] : ""; ?>">
  </div>
  <div class="field">
    <label for="company">Empresa:</label>
    <input 
    type="text" 
    id="company" 
    placeholder="Nombre de la empresa"
    value="<?php echo (isset($contact["company"])) ? $contact["company"] : ""; ?>">
  </div>
  <div class="field">
    <label for="phone">Telefono:</label>
    <input 
    type="tel" 
    id="phone" 
    placeholder="Número de telefono"
    value="<?php echo (isset($contact["phone"])) ? $contact["phone"] : ""; ?>">
  </div>
</div>
<div class="field submit">
  <?php 
    $btnText =  (isset($contact['name'])) ? 'Guardar' : 'Añadir';
    $action = (isset($contact['name'])) ? 'edit' : 'create';
  ?>
  <input type="hidden" value="<?php echo $action; ?>" id="action">
  <?php if(isset($contact['id'])): ?>
    <input type="hidden" id="id" value="<?php echo $contact['id']; ?>">
  <?php endif; ?>
  <input type="submit" value="<?php echo $btnText; ?>">
</div>