const express = require('express') // Importar

const app = express() // Crear el webservice
app.use(express.json())

const data = [
    { id: 1, name: 'jose',     phone:3401308777 },
    { id: 2, name: 'joselito', phone:9999999 },
    { id: 3, name: 'josefa',   phone:888888888 },
    { id: 4, name: 'joselo',   phone:3000000000 },
];

app.get('/', function (req, res) {
    res.send(data)
});

app.get('/users', (request, response) => {
    response.json(data);
});

app.get('/users/:id', (request, response) => {
    const { id } = request.params;

    const user = data.find((u) => u.id === +id);
  
    response.json(user.name);
});


app.post('/users', (request, response) => {

    response.status(201).json('Esto es el Post');
})

app.put('/users/:id', (request, response) => {

   const {id}= request.params;
   const{name} = request.body;
    
   const usser = data.find((usuario) => usuario.id === +id);
    if(usser){
        usser.name = name ? name :usser.name   //name != null ? name: usser.name; eso dice: como no te puse el nombre no me lo manipules 
        usser.phone = phone ? phone : usser.phone;
        response.json(usser.name)
    } else {
        response
        .status(404)
        .json({
            msg: ` el ${id} no existe`
        })
        
    }


})



//view ver  proxima clase  

/*
digamos que me interesa el usuario con el id 10, y luego necesitara actualizarlo o borrar el usuario con ese id 
necesitamos:
que la ruta sea valida, y atrapar ese usuario

*/

