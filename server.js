const express = require('express');
const app = express();
app.use(express.json());
 
const numbers = []

function retrive(id){
    // Retrive number by id
    const number = numbers.find(c=> c.id === id);
    return number.number;
}

function generate(){
    // Generate a random number between 0 and 1000
    // and assign a unique id to it.
    //Return a random number between 0 and 1000:
    let RandomNumber = Math.random() * 1000;
    
    const generation = {
        id: (numbers.length + 1).toString(),
        number: RandomNumber.toString()
    }
    numbers.push(generation);
    return generation;
}

//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome REST API with Node.js\n');
});
 
app.get('/api/numbers', (req,res)=> {
res.send(numbers);
});
 
app.get('/api/numbers/:id', (req, res) => {
const number = retrive(parseInt(req.params.id).toString());
 
if (!number) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(number);
});
 
//CREATE Request Handler
app.post('/api/numbers', (req, res)=> {
 
const gen = generate();
res.send(gen);
});
 
 
//DELETE Request Handler
app.delete('/api/numbers/:id', (req, res) => {
 
const number = numbers.find( c=> c.id === parseInt(req.params.id).toString());
if(!number) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = numbers.indexOf(number);
numbers.splice(index,1);
 
res.send(number);
});
 
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}..`));