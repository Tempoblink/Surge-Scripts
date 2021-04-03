// local http-api
// [General]
// http-api = examplekey@0.0.0.0:6166

function Getinfo() {
      let DATA = {
           url: 'http://:6166/v1/modules'
      }
      DATA.headers = {}
      DATA.headers['X-Key'] = 'examplekey'
      DATA.headers['Accept'] = '*/*'

      $httpClient.get(DATA, (error, response, data) => {
        $done({data})
      })
}

Getinfo()
