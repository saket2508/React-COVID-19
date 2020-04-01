const axios= require('axios')
const url= 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'

APIdata = {}
axios.get(url)
  .then(res => res.data)
  .then(data => APIdata = data);


