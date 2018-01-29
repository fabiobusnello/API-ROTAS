'use strict'

const isJson = ( obj ) => {
  try{
    return JSON.parse( obj )
  }catch(e) {
      console.log( e )
      return false
    }
}

const isCoordinates = ( coordenada )=>{
  const num = coordenada * 1
  if( typeof num === 'number' && num <= 90 && num >= -90 ){
      return true
  }else{
      return false
  }
}

  const valida = ( body, ctx ) => {
  
  const origem = isJson( body.origem )
  const destinos = isJson( body.destinos )
  //valida se a coordenada está correta para origel
  const isLatOrigem = isCoordinates( origem.latitude )
  const isLonOrigem = isCoordinates( origem.longitude )
  if( !isLatOrigem || !isLonOrigem ){
    return ctx.response.body = { status: false, msg: "o formato de latitude ou longitude da origem está incorreto" }
}
  //valida se as coordenadas dos destinos estão corretas
  destinos.forEach( destino => {
      const isLatDest = isCoordinates(destino.latitude)
      const isLonDest = isCoordinates(destino.longitude)
      if(!isLatDest || !isLonDest ){
          return ctx.response.body = {status: false, msg: "o formato de latitude ou longitude de um ou mais destinos está(ão) incorreto(s)"}
      }
  })

  const objRetorno = {
      origem,
      destinos
  }
  return objRetorno   
}
module.exports = valida