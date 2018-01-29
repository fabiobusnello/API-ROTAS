# Teste API de Rotas

API que recebe, através do método POST, o ponto de origem (latitude e longitude), um array de pontos de entrega (latitude e longitude) e retorna a rota de entrega. 
A rota de entrega está otimizada/ordenada pela distancia mais curta entre os pontos (latitude/longitude)

uso:
npm install

npm start

request:

<Origem>
  {
    "latitude": "-23.719736",
    "longitude": "-46.857663" 
  }

<Destinos>
  [
    { "latitude": "-23.545568", "longitude": "-46.473141" },
    { "latitude": "-23.599204", "longitude": "-46.721131" },
    { "latitude": "-23.527134", "longitude": "-46.677385" },
    { "latitude": "-23.938226", "longitude": "-47.060511" }
    .
    .
    .
  ]

  response:

  {
    "origem": {
                "latitude": "-23.719736",
                "longitude": "-46.857663" 
              },
    "entregas": [
                   {
                      "distancia": 19.313046146300824,
                      "latitude": "-23.599204",
                      "longitude":"-46.721131","entrega":1
                    },
                   {
                      "distancia": 9.170697040719539,
                      "latitude": "-23.527134",
                      "longitude": "-46.677385",
                      "entrega": 2
                    },
                   {
                      "distancia": 20.922156046630896,
                      "latitude": "-23.545568",
                      "longitude": "-46.473141",
                      "entrega": 3
                    },                
                   {
                      "distancia": 74.03080074681122,
                      "latitude": "-23.938226",
                      "longitude": "-47.060511",
                      "entrega":4
                    }
                ]
            }
