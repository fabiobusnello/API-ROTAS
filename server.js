'use strict'
//https://hub.docker.com
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const fs = require('fs')
const rotas = require('./rotas')
const app = new Koa()

app.use(bodyParser({
    detectJSON: function (ctx) {
      return /\.json$/i.test(ctx.path);
    }
  }))

app.use(async ctx => {
  

  //serve o font caso a rota passe pelo nome do arquivo de font empacotado
  if(ctx.path == '/rotas.zip' ){
    const font = fs.readFileSync('./rotas.zip')
    return ctx.response.body = font
  }
  if(ctx.method === 'GET') {
    /**
    * serve o arquivo estático index.html com as instruções de uso e um teste embutido
    * por ser apenas um arquivo html simples optei por não utilizar um diretório estático
     já que não é este o propósito desta API.
    */    
    const body = fs.readFileSync('./index.html', 'utf-8')
    return ctx.body = body
  }
  /*
   Logo abaixo é onde a magia toda acontece, quando existe dados via post,
   principalmente quando passados os parâmetros de forma correta
   retorna {status: false, msg: 'mensagem de erro'} em caso de erro ou a rota de forma
   sequencial a ser seguida.
  */
  if(ctx.method === 'POST') { rotas(ctx) }
})

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

app.listen(999);
console.log('API de Rotas rodando na porta 999, framework Koa v2.4.1')