const express =require('express');
const app =express();
const port=3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//creation du tableau w n3abiwh
let users = [
    {id: 1,name: 'alice',email:'alice@gmail.com'} ,
    {id: 2,name: 'bob',email:'bob@gmail.com'}
];

app.get("/users", (req,res) => //creation d'une route get/users qui revoie une liste d'utilisateurs
res.json(users));// covertir users vers le format json


//get user by id
    app.get('/users/:id', (req, res) => { //path parametré
        const user = users.find(u => u.id === parseInt(req.params.id));  //kol path aandou parametre lezm nrecuperih b params
        if (!user) return res.status(404).send('User not found'); //find method jscherche unvaleur dans un tableau
        res.json(user); 
       }); 

// POST a new user 
app.post('/users', (req, res) => { 
    const newUser = { id: users.length + 1, ...req.body }; 
    users.push(newUser); 
    res.json(newUser); 
   }); 
   
// PUT to update a user
app.put('/users/:id', (req, res) => {
    let user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user = { ...user, ...req.body };
    res.json(user);
    });

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
    });

app.listen(port, () =>{
    console.log(`Application exemple à l'ecoute sur le port 3000 ${port}`)
});