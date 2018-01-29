'use strict'

//método que calcula a distância entre dois pontos latitude e longitude
const distancia = ( LatOrigem, LongOrigem,  LatDest, LongDest ) => {
  
  // Radio da Terra em Km
  const R = 6371;
  
  // funções Javascript em Radianos
  const dLat = ( LatDest - LatOrigem ) * Math.PI / 180
  const dLon = ( LongDest - LongOrigem ) * Math.PI / 180

  //cálculo que considera a curvatura da terra
  const a = Math.sin( dLat / 2 ) 
    * Math.sin( dLat / 2 ) 
      + Math.cos( LatOrigem * Math.PI / 180 ) 
        * Math.cos( LatDest * Math.PI / 180 ) 
          * Math.sin( dLon / 2 ) 
            * Math.sin( dLon / 2 )
  const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) )

  // Distancia em Km
  const d = R * c
  return d
}

module.exports = distancia