import React, { useState, useEffect, Fragment } from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Chart from './components/Charts/Chart'
import './App.css';

//FOR CONTINENT DATA
const continents={
  'North America':{data:[],total:{},population:579000000},
  'South America':{data:[],total:{},population:422500000},
  'Europe':{data:[],total:{},population:741000000},
  'Asia':{data:[],total:{},population:4462000000},
  'Africa':{data:[],total:{},population:1216000000},
  'Australia/Oceania':{data:[],total:{},population:42500000}
}

const list=[
  {
    id:0,
    name:'World'
  },
  {
    id:1,
    name:'North America'
  },
  {
    id:2,
    name:'South America'
  },
  {
    id:3,
    name:'Europe'
  },
  {
    id:4,
    name:'Asia'
  },
  {
    id:5,
    name:'Africa'
  },
  {
    id:6,
    name:'Australia/Oceania'
  }
]

const world_data=[]

const rawData={
        Name: 'World',
        Cases:0,
        Deaths:0,
        Recovered:0,
        Active:0,
        Critical:0,
        TodayCases:0,
        TodayDeaths:0,
        casespermillion:0,
        deathspermillion:0
}


export default function App(){
  const [ appData, setAppData ]= useState([])
  const [ data, setData ]= useState(rawData)
  const [ dataContinents, setDataContinents ]= useState(continents)
  const [ loading, setLoading ]= useState(false)
  const [ error, setError ]= useState(false)

  useEffect(() => {
    getData()
  },[])


  const getData = async() => {
    let deaths=0
    let cases=0
    let recovered=0
    let active=0
    let critical=0
    let todayDeaths=0
    let todayCases=0

    try{

      setLoading(true)

      const res= await fetch('https://corona.lmao.ninja/v2/countries?sort=cases')
      const response = await res.json()
      let lastupdated = response[0]["updated"]

      response.map((item) => {
        world_data.push(item)

        if(lastupdated < item['updated']){
          lastupdated= item['updated']
        }

        cases+= item.cases
        deaths+= item.deaths
        active+=  item.active
        critical+= item.critical
        recovered+= item.recovered
        todayDeaths+= item.todayDeaths
        todayCases+= item.todayCases

        for(let key in continents){
          if(item.continent===key){
            continents[key].data.push(item)
          }
        }
      })

      for(let key in continents){
        let continent_cases=0
        let continent_deaths=0
        let continent_recovered=0
        let continent_critical=0
        let continent_active=0
        let continent_newCases=0
        let continent_newDeaths=0

        continents[key].data.map((element) =>{
          continent_cases+= element.cases
          continent_deaths+= element.deaths
          continent_recovered+= element.recovered
          continent_critical+= element.critical
          continent_active+= element.active
          continent_newCases+= element.todayCases
          continent_newDeaths+= element.todayDeaths
        })

        let continent_population= continents[key].population
        let continent_casespermillion= ((continent_cases/continent_population)*1000000).toFixed(0)
        let continent_deathspermillion=((continent_deaths/continent_population)*1000000).toFixed(0)

        let obj={Name:key,
          Cases:continent_cases,
          Deaths:continent_deaths,
          Recovered:continent_recovered,
          Active:continent_active,
          Critical:continent_critical,
          TodayCases:continent_newCases,
          TodayDeaths:continent_newDeaths,
          casespermillion:continent_casespermillion,
          deathspermillion:continent_deathspermillion
        }

        continents[key].total= obj  
      } 

      //For Worldwide data
      const world_population= 7800000000
      const world_casespermillion= ((cases/world_population)*1000000).toFixed(0)
      const world_deathspermillion= ((deaths/world_population)*1000000).toFixed(0)
      

      rawData.Cases= cases 
      rawData.TodayCases= todayCases
      rawData.TodayDeaths= todayDeaths
      rawData.Deaths= deaths 
      rawData.Recovered= recovered 
      rawData.Active= active 
      rawData.Critical= critical 
      rawData.casespermillion= world_casespermillion 
      rawData.deathspermillion= world_deathspermillion 
      rawData.lastupdated= lastupdated 

      setAppData(world_data)
      setData(rawData)
      setDataContinents(continents)
      setLoading(false)
      console.log(data)
    }
    catch(error){
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }

  const changeContinent = (item) => {

    if(item.name==='World'){
      console.log("World")
      setAppData(world_data)
      setData(rawData)
    }
    if(item.name==='North America'){
      console.log("North America")
      setAppData(continents['North America'].data)
      setData(continents['North America'].total)
    }
    if(item.name==='South America'){
      console.log("South America")
      setAppData(continents['South America'].data)
      setData(continents['South America'].total)
    }
    if(item.name==='Europe'){
      console.log("Europe")
      setAppData(continents['Europe'].data)
      setData(continents['Europe'].total)
    }
    if(item.name==='Asia'){
      console.log("Asia")
      setAppData(continents['Asia'].data)
      setData(continents['Asia'].total)
    }
    if(item.name==='Africa'){
      console.log("Africa")
      setAppData(continents['Africa'].data)
      setData(continents['Africa'].total)
    }
    if(item.name==='Australia/Oceania'){
      console.log("Australia/Oceania")
      setAppData(continents['Australia/Oceania'].data)
      setData(continents['Australia/Oceania'].total)
    }
   
  }

  if(error){
    return(
      <div>
        <AppNavbar/>
        <div style={{flex:1,justifyContent:'center',marginTop:90}}>
          <strong>Unable to get data. There appears to be a problem with the server :(</strong>
        </div>
      </div>
    )
  }

  if(loading){
   return(
      <Fragment>
      <AppNavbar/>
      <div style={{marginTop:50}}>
        <h5 style={{fontWeight:400}} className="text-muted text-center">LOADING DATA...</h5>
      </div>
    </Fragment>
   )
  }

  return(
    <Fragment>
        <AppNavbar/>
        <AppHeading {...{
          data: rawData
        }}/>
        <Chart/>
        <Table {...{
          tableData:{
            data: appData, 
            dataw: data, 
            changeContinent: changeContinent,
            list: list
          }
        }}/>
      </Fragment>
  )

}