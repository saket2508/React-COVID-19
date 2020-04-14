//API FOR NATIONAL STATS/STATEWISE DATA- https://api.covid19india.org/data.json

const fetch= require('node-fetch')

url='https://api.covid19india.org/data.json'

/*fetch(url)
    .then(res => res.json())
    .then(json =>(
        console.log(json.cases_time_series.slice(-1))
    ))*/

fetch(url)
    .then(res => res.json())
    .then(json =>(
        console.log(json.statewise[0])
    ))

