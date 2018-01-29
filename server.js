'use strict'
//https://hub.docker.com
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const fs = require('fs')
const rotas = require('./rotas')
//const roteriza = require('./local')
const app = new Koa()

app.use(bodyParser({
    detectJSON: function (ctx) {
      return /\.json$/i.test(ctx.path);
    }
  }))

app.use(async ctx => {
  const body = fs.readFileSync('./index.html', 'utf-8')
  if(ctx.path == '/rotas.zip' ){
    const font = fs.readFileSync('./rotas.zip')
    return ctx.response.body = font
  }
  
  

  console.log(ctx.path)
  if(ctx.method === 'GET') return ctx.body = body
  if(ctx.method === 'POST') { rotas(ctx) }

})

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

app.listen(999);
console.log('API de Rotas rodando na porta 999, framework Koa v2.4.1')