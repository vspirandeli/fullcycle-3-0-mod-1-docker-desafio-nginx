<div align="center">
  <img title="Full Cycle 3.0" alt="logo empresa full cycle" src="./assets//logo-full-cycle.svg" />
</div>

# Desafio Docker GO Full Cycle 3.0

## Descrição do desafio

Nesse desafio você colocará em prática o que aprendemos em relação a utilização do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.

O retorno da aplicação node.js para o nginx deverá ser:

<h1>Full Cycle Rocks!</h1>

- Lista de nomes cadastrada no banco de dados.

Gere o docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.

Não esqueça de colocar o volume na aplicação para o ambiente de desenvolvimento. 

Suba tudo em um repositório e faça a entrega.

* A linguagem de programação para este desafio é Node/JavaScript.

### Requisitos do desafio
1) Linguagem de programação NodeJS.
2) NginX para proxy reverso.
3) Retornar <pre><h1>Full Cycle Rocks!</h1></pre>.
4) Mysql com uma tabela chamada: people.
5) A cada chamada ao NginX o node deve cadastrar um registro no Mysql, adicionando um nome em uma tabela people.
6) Gestão pelo Docker Compose.
7) Executar com: docker-compose up -d.
8) Porta 8080.
9) Adicionar volume no ambiente de desenvolvimento.

### Como executar a aplicação

Para modo de desenvolvimento:
```bash
docker compose -f docker-compose.dev.yml up -d
```

Para rodar em modo de produção:

```bash
docker compose up -d
```