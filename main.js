import {getPessoa, createPessoa, getPessoas} from './repositories/pessoas.js'
import express from 'express'
const app = express()

import pg from 'pg'
const { Client } = pg
const client = new Client({
  user: 'postgres',
  password: 'batatinha',
  host: 'localhost',
  port: 5432,
});

client.connect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/pessoas', async function (req, res) {
	const pessoas = await getPessoas(client)  
	res.json(pessoas)
});

app.get('/pessoa/:id', async function (req, res) {
  const index = req.params.id
  const pessoa = await getPessoa(index, client)
  res.json(pessoa)
});

app.post('/pessoa', async function (req, res) {
  console.log(req.body)
  const result = await createPessoa(req.body, client)
  res.json(result)
});

app.patch('/pessoa/aniversario', (_, res) => {
  for (let batatinha = 0; batatinha < pessoas.length; batatinha++) {
    pessoas[batatinha].idade = pessoas[batatinha].idade + 1
  }
  res.json(pessoas)
});
app.listen(3000)
console.log('Api Ativa')