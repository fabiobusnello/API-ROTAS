'use strict'
const roteriza = require('./local')
const valida = require('./valida-geolocalizacao')
const roteiro = {}
const rotas = (ctx) => {
    const dataJson = valida(ctx.request.body, ctx)
    const origemPost = dataJson.origem
    const destinosPost = dataJson.destinos
    if(!origemPost || !destinosPost){
        return ctx.response.body = {status: false, msg: 'erro: Provávelmente não foi passado os parametros no formato JSON'}
    }
    
    //console.log(JSON.parse(dataJson.destinos))
    roteiro.origem = origemPost
    
    roteriza(origemPost, destinosPost, function(data){
        roteiro.entregas = data
        ctx.response.body = roteiro
        //console.log(data)
    })
}
//exporta para server.js
module.exports = rotas