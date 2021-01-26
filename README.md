<h1 align="center">
  <img src="./linkapi.png" alt="LinkApi" width="300">
<br>
Desafio Back-end LinkApi
</h1>

<p align="center"> Aplicação que integra dados entre o CRM
    <a aria-label="pipedrive" href="https://www.pipedrive.com/pt">
    pipedrive
  </a>
  e o ERP
    <a aria-label="bling" href="https://www.bling.com.br/home">
    bling
  </a>




<p align="center">
  <a aria-label="Prando" href="https://github.com/gprando/">
    <img src="https://img.shields.io/github/followers/gprando?style=social"></img>
  </a>
    <img src="https://img.shields.io/github/last-commit/gprando/desafio-LinkApi"></img>
    <img src="https://img.shields.io/github/languages/count/gprando/desafio-LinkApi"></img>
</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>


##
## Requisitos
● Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

● Criar banco de dados mongo.

● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

● Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## Principais tecnologias utilizadas

- linguagem:
  - TypeScript.

- Backend:
  - Framework: Express.
  - Banco: mongoDB (dados), Redis (background job).
  - ORM: TypeORM.
  - Logger: Winston.
  - Testes: Jest.
  - Documentação: Swagger.
  - Padronização de código: Eslint e Prettier.
  - Build: Babel

- Infra
  - Docker e docker compose.

## Projeto

Este desafio foi desenvolvido com o intuído de mostrar minhas habilidades nas tecnologias citadas a cima.



## Instalação - Projeto

##### Requisitos:

Clone o projeto em seu computador.
```bash
git clone https://github.com/gprando/desafio-LinkApi/
```
- Preferencialmente ambiente Unix.

- Ter instalado <a aria-label="docker" href="https://docs.docker.com/engine/install/">
    docker
  </a> e
  <a aria-label="docker compose" href="https://docs.docker.com/compose/install/">
    docker compose.
  </a>

- Rodar o docker compose do projeto, isso irá rodar os bancos de dados, o servidor e a fila de processamento.
* **OBS: adicione suas variáveis ambiente dentro do arquivo docker-compose.yml**

```bash
docker-compose up --build
```

- os endpoints podem ser consultados e testados a partir da documentação, acessando http://localhost:3333/docs

## 🤔 Como contribuir

Se quiser contribuir para esse repositório aqui, seja corrigindo algum problema, adicionando comentários ou melhorando a documentação, você pode seguir esse tutorial abaixo:

- Faça [um fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo) desse repositório;
- Entre no seu perfil no GitHub e faça um clone do repositório que você fez um *fork*;
- Crie uma *branch* com a sua alteração: `git checkout -b minha-alteracao`;
- Faça as alterações necessárias no código ou na documentação;
- Faça *commit* das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça *push* para a sua *branch*: `git push origin minha-alteracao`;
- Agora é só abrir a sua *pull request* no repositório que você fez o *fork*;

Depois que o *merge* da sua *pull request* for feito, você pode deletar a sua *branch*.

## :memo: Licença

Esse projeto é licensiado pela MIT License - Veja a página da [licença](https://opensource.org/licenses/MIT) para detalhes
