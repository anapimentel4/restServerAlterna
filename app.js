const express = require('express')
const serve = express()

serve.use(express.json());

let users = [
  { id: 1, nombre: "Jose", },
  { id: 2, nombre: "Josefina", },
  { id: 3, nombre: "Joselito", },
  { id: 4, nombre: "Josefa", }
]


// npm init
// npm i express
// npm i -g nodemon
// npm i -D nodemon
// npm install express

// http://localhost:3000/



// Rutas para Usuarios


serve.get('/users', function (request, response) {
  response.json(users);
});

serve.get('/users/:id', function (request, response) {
  const { id } = request.params;
  const user = users.find((u) => u.id === parseInt(id));


  response.json(user);
});

serve.post('/users', function (request, response) {
  const { id, nombre } = request.body;
  
  const idrepetido = users.find(u => u.id === parseInt(id))
  if(idrepetido){
    return response.json({eror: 'id repetido'})
  }


  if (!nombre || nombre.trim() === '') {
    return response.status(400).json({ error: 'El nombre de usuario no puede estar vacío.' });
  }
 
  const usuarioExistente = users.find(user => user.nombre === nombre);
  if (usuarioExistente) {
    return response.status(400).json({ error: 'El nombre ya esta registrado' });
  }

  const usuarioNuevo = { id, nombre };
  users.push(usuarioNuevo);

  response.status(201).json({ msg: 'Usuario agregado correctamente.', usuario: usuarioNuevo });
});
   


serve.put('/users/:id', function (request, response) {
 const {id} = request.params;
 const {nombre}= request.body;

 const usuario = users.find((u)=> u.id === parseInt(id)) 
 if(!usuario){
  return  response
  .status(400)
  .json({msg: 'not found', usuario})
 } 
 usuario.nombre = nombre;
 response.json({msg: 'nombre actualizado correctament', usuario})
});

serve.delete('/users/:id', function (request, response) {
   const{id}= request.params

 const idusuario = users.find(u => u.id === +id);

if(!idusuario){
  return response
    .status(400)
    .json({ msg: `not found `})
}
 const index = users.findIndex(u => u.id === +id);
 users.splice(index, 1 );

  response.json({idusuario, msg:' usuario eliminado'} )
});


serve.listen(3000, () => {
  console.log(`Server Running at 3000`);
})