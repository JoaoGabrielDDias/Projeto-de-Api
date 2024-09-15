const express = require('express')
const app = express()

const pg = require('pg')
const { Client } = pg
const client = new Client({
    user: 'postgres',
    password: 'batatinha',
    host: 'localhost',
    port: 5432,
  })

client.connect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pessoas = [{
    nome: 'joao',
    idade: 22,
    email: 'jgddminecraft12@gmail.com',
    nickjogo: 'moviments'
},{
    nome: 'joao',
    idade: 22,
    email: 'jgddminecraft12@gmail.com',
    nickjogo: 'moviments'
},]
app.get('/pessoas' , function (req, res){
    
    res.json(pessoas)
})
  app.get('/pessoa' , function (req, res){
    const index = 19

    client.query('SELECT * FROM pessoas WHERE id = $1', [index], (error, dbres) => {
        res.json(dbres.rows[0])
        
      })

  })

app.post('/pessoa', function(req, res){
    console.log(req.body)
    client.query('insert into pessoas(nome, email, idade, nickname) values ($1, $2, $3, $4) RETURNING *',
    [req.body.nome, req.body.email, req.body.idade, req.body.nickname], (error, dbres)=> {
        if(error){
           res.json({error: error}) 
           return
        }
        res.json(dbres.rows[0])
    }    
    )
})


app.patch('/pessoa/aniversario', (req, res)=>{
    for(let batatinha = 0; batatinha < pessoas.length; batatinha++){
        pessoas[batatinha].idade = pessoas[batatinha].idade + 1
    }
    res.json(pessoas)
})
app.listen(3000)