'use strict'
/**
 * Módulo que calcula as distâncias de cada local e retorna de forma ordenada por 
 * destinos mais proximos
 */

/*carrega a dependencia do 
módulo que calcula a distância
entre dois pontos latitude e longitude*/

const distancia = require('./distancia')

//método que calcula a menor distância entre origem e os destinos informados
function md(Origem, Destinos){
  let cont = 0
  const obj = {}
  const distancias = []
  const entregas = []
  Destinos.forEach(destino => {
    let distante = distancia(Origem.latitude, Origem.longitude, destino.latitude, destino.longitude)
    distancias[cont] = distante
    entregas[cont] = {
      distancia: distante,
      latitude: destino.latitude,
      longitude: destino.longitude
    }
  cont++
})

//pega a menor distância do array distancias
const menorDistancia = Math.min.apply( null, distancias )
obj.menorDistancia = menorDistancia
//procura qual entrega é mais proxima do ponto de origem
let parada = entregas.find( obj => { return obj.distancia === menorDistancia } )
obj.parada = parada
obj.entregas = entregas
return obj
}

//modulo exportado para server.js
const roteriza1 = (Origem, Destinos, call)=>{

  let qtdEntrega = 0
let paradas = 1
const entregar = []

roteriza(Origem, Destinos, call)

function roteriza(Origem, Destinos, call){
  let qtdDestino = Destinos.length
  const objMd = md(Origem, Destinos)
  const novosDestinos = objMd.entregas.filter(function(el) { return el.distancia != objMd.menorDistancia })
  if( qtdDestino ){
    let primeiro = Destinos.find( obj => { return obj.entrega === objMd.parada.entrega } )
    objMd.parada.entrega = paradas
    paradas++
    entregar[qtdEntrega] = objMd.parada
    qtdEntrega++
    return roteriza(objMd.parada, novosDestinos, call)
  }else{
    call(entregar)
  }
}

}
module.exports = roteriza1