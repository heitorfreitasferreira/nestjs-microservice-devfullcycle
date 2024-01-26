# Nest 101

Projeto teste para aprender a usar o NestJS baseado em uma [live feita pelo canal Full Cycle](https://www.youtube.com/live/rq8Ja8xG3TY?si=zcYUwlUcAD6sYLou).  
O código original feito em live pode ser encontrado [aqui](https://github.com/devfullcycle/live-imersao-17-nestjs-microservices).

## O que é

O projeto é uma simples API REST que permite criar, listar, atualizar e deletar checkouts, como se fosse um microsserviço de um e-commerce.

## O que aprendi aqui

- Como criar um projeto com o NestJS
- Como criar um módulo
- Como criar um controller
- Como criar um service
- Como criar e injetar um repositório
- Como lidar com o TypeORM e suas anotações

## Requisitos

- NodeJS (v18.16.1^)
- Docker (opcional)
  - Caso não tenha Docker ou não queira instalar, será necessário instalar um banco de dados MySQL e configurar o arquivo `.env` com as credenciais do banco.

## Como rodar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Instale as dependências do docker com `docker-compose up -d`, isso deverá criar um container com o MySQL e o expor na porta 3306 da sua máquina, com um banco de dados chamado `nest` e um usuário `root` com senha `root`.
4. Criar um arquivo `.env` na raiz do projeto com as configurações do banco de dados. Exemplo:

```
TYPE='mysql'
HOST='localhost'
PORT=3306
USERNAME='root'
PASSWORD='root'
DATABASE='nest'
```

4. Execute o comando `npm run start:prod` para rodar o projeto.