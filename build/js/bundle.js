const form=document.querySelector("#contact"),listContacts=document.querySelector("#list-contacts tbody"),inputSearch=document.querySelector("#search");function eventListeners(){form.addEventListener("submit",readForm),listContacts&&listContacts.addEventListener("click",deleteContact),inputSearch.addEventListener("input",searchContacts),countContacts()}function readForm(e){e.preventDefault();const t=document.querySelector("#name").value,n=document.querySelector("#company").value,o=document.querySelector("#phone").value,a=document.querySelector("#action").value;if(""===t||""===n||""===o)showNotification("Todos los campos son obligatorios","error");else{const e=new FormData;if(e.append("name",t),e.append("company",n),e.append("phone",o),e.append("action",a),"create"==a)insertToDB(e);else{const t=document.querySelector("#id").value;e.append("id",t),updateReg(e)}}}function insertToDB(e){const t=new XMLHttpRequest;t.open("POST","/includes/models/create.php",!0),t.onload=function(){if(200==this.status){const e=JSON.parse(t.responseText),n=document.createElement("tr");n.innerHTML=`\n        <td>${e.data.name}</td>\n        <td>${e.data.company}</td>\n        <td>${e.data.phone}</td>\n      `;const o=document.createElement("td"),a=document.createElement("i");a.classList.add("fas","fa-pen-square");const s=document.createElement("a");s.appendChild(a),s.href="edit.php?id="+e.data.id_inserted,s.classList.add("btn-edit"),o.appendChild(s);const i=document.createElement("i");i.classList.add("fas","fa-trash-alt");const c=document.createElement("a");c.appendChild(i),c.setAttribute("data-id",e.data.id_iserted),c.classList.add("btn-delete"),o.appendChild(c),n.appendChild(o),listContacts.appendChild(n),document.querySelector("form").reset(),showNotification("Contacto creado correctamente","success"),countContacts()}},t.send(e)}function updateReg(e){const t=new XMLHttpRequest;t.open("POST","/includes/models/edit.php",!0),t.onload=function(){if(200==this.status){"correct"==JSON.parse(t.responseText).response?showNotification("Contacto editado correctamente","success"):showNotification("Hubo un error...","error"),setTimeout(()=>{window.location.href="index.php"},4e3)}},t.send(e)}function deleteContact(e){if(e.target.parentElement.classList.contains("btn-delete")){const t=e.target.parentElement.getAttribute("data-id");if(confirm("Estas seguro/a?")){const n=new XMLHttpRequest;n.open("GET",`/includes/models/delete.php?id=${t}&action=delete`,!0),n.onload=function(){if(200==this.status){"correct"===JSON.parse(n.responseText).response?(e.target.parentElement.parentElement.parentElement.remove(),showNotification("Contacto eliminado","success"),countContacts()):showNotification("Hubo un error...","error")}},n.send()}}}function showNotification(e,t){const n=document.createElement("div");n.classList.add("notification",t,"shadow"),n.textContent=e;const o=document.querySelector("form legend");form.insertBefore(n,o),setTimeout(()=>{n.classList.add("visible"),setTimeout(()=>{n.classList.remove("visible"),setTimeout(()=>{n.remove()},500)},3e3)},100)}function searchContacts(e){const t=new RegExp(e.target.value,"i");document.querySelectorAll("tbody tr").forEach(e=>{e.style.display="none";-1!=e.childNodes[1].textContent.replace(/\s/g," ").search(t)&&(e.style.display="table-row")}),countContacts()}function countContacts(){const e=document.querySelectorAll("tbody tr"),t=document.querySelector(".total-contacts span");let n=0;e.forEach(e=>{""!=e.style.display&&"table-row"!=e.style.display||n++}),t.textContent=n}
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/eventListeners(),function(e,t,n){function o(e,t){return typeof e===t}function a(e){var t=A.className,n=l._config.classPrefix||"";if(u&&(t=t.baseVal),l._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}l._config.enableClasses&&(t+=" "+n+e.join(" "+n),u?A.className.baseVal=t:A.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)d(e,n)&&s(n,e[n]);else{var o=(e=e.toLowerCase()).split("."),i=l[o[0]];if(2==o.length&&(i=i[o[1]]),void 0!==i)return l;t="function"==typeof t?t():t,1==o.length?l[o[0]]=t:(!l[o[0]]||l[o[0]]instanceof Boolean||(l[o[0]]=new Boolean(l[o[0]])),l[o[0]][o[1]]=t),a([(t&&0!=t?"":"no-")+o.join("-")]),l._trigger(e,t)}return l}var i=[],c=[],r={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){c.push({name:e,fn:t,options:n})},addAsyncTest:function(e){c.push({name:null,fn:e})}},l=function(){};l.prototype=r,l=new l;var d,A=t.documentElement,u="svg"===A.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;d=o(e,"undefined")||o(e.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),r._l={},r.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),l.hasOwnProperty(e)&&setTimeout((function(){l._trigger(e,l[e])}),0)},r._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout((function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)}),0),delete this._l[e]}},l._q.push((function(){r.addTest=s})),l.addAsyncTest((function(){function e(e,t,n){function o(t){var o=!(!t||"load"!==t.type)&&1==a.width;s(e,"webp"===e&&o?new Boolean(o):o),n&&n(t)}var a=new Image;a.onerror=o,a.onload=o,a.src=t}var t=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],n=t.shift();e(n.name,n.uri,(function(n){if(n&&"load"===n.type)for(var o=0;o<t.length;o++)e(t[o].name,t[o].uri)}))})),function(){var e,t,n,a,s,r;for(var d in c)if(c.hasOwnProperty(d)){if(e=[],(t=c[d]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=o(t.fn,"function")?t.fn():t.fn,s=0;s<e.length;s++)1===(r=e[s].split(".")).length?l[r[0]]=a:(!l[r[0]]||l[r[0]]instanceof Boolean||(l[r[0]]=new Boolean(l[r[0]])),l[r[0]][r[1]]=a),i.push((a?"":"no-")+r.join("-"))}}(),a(i),delete r.addTest,delete r.addAsyncTest;for(var p=0;p<l._q.length;p++)l._q[p]();e.Modernizr=l}(window,document);
//# sourceMappingURL=bundle.js.map
