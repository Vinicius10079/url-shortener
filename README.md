# Encurtador de URL

Aplicação web para criação e redirecionamento de URLs encurtadas, desenvolvida com Next.js, Prisma e MySQL.

O projeto implementa os principais conceitos por trás de serviços de encurtamento de links, priorizando simplicidade, organização e possibilidade de evolução arquitetural.

---

## Como executar

### Requisitos

* Node.js 20+
* MySQL 8

### Instalação

```bash
npm install
```

Crie um arquivo `.env`:

```
DATABASE_URL="mysql://user:password@localhost:3306/url_shortener"
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie a aplicação:

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## Execução com Docker (opcional)

O ambiente Docker existe apenas para facilitar testes ou avaliação.

```bash
docker compose up --build
```

---

## Funcionalidades

* Criação de URLs curtas
* Redirecionamento automático
* Código curto único baseado em Base62
* Contagem de acessos
* Interface web simples

---

## Endpoints

### Criar URL curta

POST `/api/shorten`

```json
{
  "url": "https://example.com"
}
```

Resposta:

```json
{
  "short_url": "http://localhost:3000/abc123"
}
```

---

### Redirecionamento

GET `/{shortcode}`

Redireciona para a URL original utilizando HTTP redirect.

---

## Estrutura do projeto

```
src/
 ├─ app/        páginas e rotas (Next.js)
 ├─ lib/        acesso ao banco e utilidades
 └─ prisma/     schema e migrations
```

---

## Decisões técnicas

* O shortcode não é gerado por hash da URL.
* Cada registro recebe um ID único.
* O ID é convertido para Base62 para gerar URLs curtas.
* Essa abordagem evita colisões e mantém consultas eficientes no banco.

A aplicação foi organizada pensando em futura escalabilidade (cache, múltiplas instâncias e balanceamento), mantendo baixo custo e simplicidade no ambiente local.

---

## Objetivo

Projeto desenvolvido para portfólio e estudo, explorando construção de APIs, modelagem de dados e integração completa entre frontend e backend.