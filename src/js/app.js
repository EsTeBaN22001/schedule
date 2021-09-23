const form = document.querySelector('#contact');
const listContacts = document.querySelector('#list-contacts tbody');
const inputSearch = document.querySelector('#search');

eventListeners();

function eventListeners(){
  // Ejecución del formulario crear o editar
  form.addEventListener('submit', readForm);

  // Listener para eliminar el boton
  if(listContacts){
    listContacts.addEventListener('click', deleteContact);
  }

  // Listener para el input de la barra de búsqueda
  inputSearch.addEventListener('input', searchContacts);

  // Contador de contactos
  countContacts();
}

// Lee los datos del formulario
function readForm(e){
  e.preventDefault();

  // Leer los datos de los inputs
  const name = document.querySelector('#name').value;
  const company = document.querySelector('#company').value;
  const phone = document.querySelector('#phone').value;
  const action = document.querySelector('#action').value;

  if(name === '' || company === '' || phone === ''){
    showNotification('Todos los campos son obligatorios', 'error');
  }else{
    // Pasa la validación, hacer la petición ajax
    const infoContact = new FormData();
    infoContact.append('name', name);
    infoContact.append('company', company);
    infoContact.append('phone', phone);
    infoContact.append('action', action);

    if(action == 'create'){
      // Creamos un nuevo contacto
      insertToDB(infoContact);
    }else{
      // Editar el elemento
      const idReg = document.querySelector('#id').value;
      infoContact.append('id', idReg);
      updateReg(infoContact);
    }
  }
}

// Inserta los datos en la DB con ajax
function insertToDB(data){
  // Llamada ajax

  // Crear el objeto
  const xhr = new XMLHttpRequest();

  // Abrir la conexión
  xhr.open('POST', '/includes/models/create.php', true);

  // Pasar los datos
  xhr.onload = function(){
    if(this.status == 200){
      // Leemos la respuesta de php
      const response = JSON.parse(xhr.responseText);

      // Inserta un nuevo elemento a la tabla
      const newContact = document.createElement('tr');
      
      newContact.innerHTML = `
        <td>${response.data.name}</td>
        <td>${response.data.company}</td>
        <td>${response.data.phone}</td>
      `;

      // Crear un contenedor para los botones
      const actionsContainer = document.createElement('td');

      // Crear el ícono de editar
      const editIcon = document.createElement('i');
      editIcon.classList.add('fas', 'fa-pen-square');

      // Crea el boton para editar
      const editBtn = document.createElement('a');
      editBtn.appendChild(editIcon);
      editBtn.href = `edit.php?id=${response.data.id_inserted}`;
      editBtn.classList.add('btn-edit');

      // Agregar al contenedor
      actionsContainer.appendChild(editBtn);

      // Crear el ícono de eliminar
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash-alt');

      // Crea el boton para eliminar
      const deleteBtn = document.createElement('a');
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.setAttribute('data-id', response.data.id_iserted);
      deleteBtn.classList.add('btn-delete');

      // Agregar al contenedor
      actionsContainer.appendChild(deleteBtn);

      // Agregar las acciones al tr
      newContact.appendChild(actionsContainer);

      // Agregarlo con el resto de los contactos
      listContacts.appendChild(newContact);

      // Resetear el form una vez creado el contacto
      document.querySelector('form').reset();

      // Mostrar la notificación
      showNotification('Contacto creado correctamente', 'success');

      // Actualizamos el número del contador
      countContacts();
    }
  }

  // Enviar los datos
  xhr.send(data);
}

// Actualiza los datos en la DB con ajax
function updateReg(data){
  // Llamada ajax
  // Crear el objeto
  const xhr = new XMLHttpRequest();

  // Abrir la conexión
  xhr.open('POST', `/includes/models/edit.php`, true);

  // Pasar los datos
  xhr.onload = function(){
    if(this.status == 200){
      const response = JSON.parse(xhr.responseText);
      
      if(response.response == 'correct'){
        // Mostrar notificación
        showNotification('Contacto editado correctamente', 'success');
      }else{
        // Hubo un error
        showNotification('Hubo un error...', 'error');
      }

      // Después de 3 segundos redireccionar
      setTimeout(() => {
        window.location.href = 'index.php';
      }, 4000);
    }
  }

  // Enviar los datos
  xhr.send(data);
}

// Elimina los contactos
function deleteContact(e){
  if(e.target.parentElement.classList.contains('btn-delete')){
    // Tomar el id
    const id = e.target.parentElement.getAttribute('data-id');
    
    const response = confirm('Estas seguro/a?');
    if(response){
      // Llamada ajax
      // Crear el objeto
      const xhr = new XMLHttpRequest();

      // Abrir la conexión
      xhr.open('GET', `/includes/models/delete.php?id=${id}&action=delete`, true);

      // Pasar los datos
      xhr.onload = function(){
        if(this.status == 200){
          const response = JSON.parse(xhr.responseText);
          if(response.response === 'correct'){
            // Eliminar el registro del DOM
            e.target.parentElement.parentElement.parentElement.remove();

            // Mostrar notificación
            showNotification('Contacto eliminado', 'success');

            // Actualizamos el número del contador
            countContacts();
          }else{
            // Mostrar notificación
            showNotification('Hubo un error...', 'error');
          }
        }
      }

      // Enviar los datos
      xhr.send();
    }
  }
}

// Mostrar una notificación
function showNotification(message, classNotification){
  const notification = document.createElement('div');
  notification.classList.add('notification', classNotification, 'shadow');
  notification.textContent = message;

  // Formulario
  const legend = document.querySelector('form legend');
  form.insertBefore(notification, legend);

  // Mostrar y ocultar la notificación
  setTimeout(() => {
    notification.classList.add('visible');

    setTimeout(() => {
      notification.classList.remove('visible');
      
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  }, 100);
}

// Buscar contactos
function searchContacts(e){
  const expression = new RegExp(e.target.value, 'i');
  const registry = document.querySelectorAll('tbody tr');

  registry.forEach(registration => {
    registration.style.display = 'none';

    const search = registration.childNodes[1].textContent.replace(/\s/g, " ").search(expression);

    if(search != -1){
      registration.style.display = 'table-row';
    }
  })

  countContacts();
}

// Contador de contactos
function countContacts(){
  const totalContacts = document.querySelectorAll('tbody tr');
  const numberContainer = document.querySelector('.total-contacts span');

  let total = 0;

  totalContacts.forEach(contact => {
    if(contact.style.display == '' || contact.style.display == 'table-row'){
      total++;
    }
  })

  // Imprimir el número en el span del número
  numberContainer.textContent = total;
}