


export const getPessoa = async (id, client) => {
    const result = await client.query('SELECT * FROM pessoas WHERE id = $1', [id]);
    const pessoa = result.rows[0]
    return pessoa
}

export const createPessoa = async (pessoa, client) => {
    const res = await client.query('insert into pessoas(nome, email, idade, nickname) values ($1, $2, $3, $4) RETURNING *',
    [pessoa.nome, pessoa.email, pessoa.idade, pessoa.nickname])
	return res.rows[0]
}

export const getPessoas = async (client) => {
	const result = await client.query('SELECT * FROM pessoas');
	const pessoas = result.rows
	return pessoas
}
