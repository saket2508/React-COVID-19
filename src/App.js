import React, {Component, Fragment} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
import Chart from './components/Charts/Chart'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const url='https://corona.lmao.ninja/v2/countries?sort=cases'
const url2= 'https://pomber.github.io/covid19/timeseries.json'

const rawdata={}
//FOR HEADING INFO
const data=[]

//STORES FLAG CODES/prop data
const codes=[]

//FOR CONTINENT DATA
const continents={
  'North America':{data:[],total:{},population:579000000},
  'South America':{data:[],total:{},population:422500000},
  'Europe':{data:[],total:{},population:741000000},
  'Asia':{data:[],total:{},population:4462000000},
  'Africa':{data:[],total:{},population:1216000000},
  'Australia/Oceania':{data:[],total:{},population:42500000}
}



const WorldwideData={
        Name: 'Worldwide',
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



class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list:[
        {
          id:0,
          name:'Worldwide'
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
      ],
      appData:[],
      DataCountries:{},
      flagData:[],
      Data:{
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
    }
  }

  componentDidMount(){
    this.getData()
  }

  async getData(){
    let deaths=0
    let cases=0
    let recovered=0
    let active=0
    let critical=0
    let todayDeaths=0
    let todayCases=0

    const response= await fetch(url2)
    response.json()
    .then(json => {
      console.log('First!')
      for(let key in json){
        let list1=[]
        let list2=[]
        let list3=[]
        let list4=[]
        let list5=[]
        let list6=[]
        let list7=[]
    let country= key
      if(country==='US'){
        country= 'United States'
        }
        if(country==='Korea, South'){
        country= 'South Korea'
        }

        json[key].map((item) => {
            list1.push(Number(item.confirmed))                   
            list2.push(Number(item.deaths))                   
            list3.push(Number(item.recovered))                   
            list7.push(Number(item.confirmed) - Number(item.deaths) - Number(item.recovered))                   
        })
        for(let i=0;i<list1.length-1;i++){
            let a= list1[i+1]-list1[i]
            list4.push(a)
            let b= list2[i+1]-list2[i]
            list5.push(b)
            let c= list3[i+1]-list3[i]
            list6.push(c)
        }
        let obj={cases:list1, 
            deaths:list2, 
            recovered:list3, 
            active:list7, 
            newcases: list4, 
            newdeaths: list5, 
            newrecoveries:list6}
        rawdata[country]= obj
        //chart data: Cumulative And Daily for all countries
    }
    })

    const res= await fetch(url)
    res.json()
    .then(json => {
      let i=1
      console.log('Second!')
      let lastupdated= json[0]['updated']
      json.map((item)=> {       
        data.push(item)

        if(lastupdated < item['updated']){
          lastupdated= item['updated']
        }
        cases+= Number(item.cases)
        deaths+= Number(item.deaths)
        active+=  Number(item.active)
        critical+= Number(item.critical)
        recovered+= Number(item.recovered)
        todayDeaths+= Number(item.todayDeaths)
        todayCases+= Number(item.todayCases)

        //FLAG CODES
      
        let name= item.country
        let Cases= item.cases
        let Deaths= item.deaths
        let Recovered= item.recovered
        let Active= item.active
        let Tests= item.tests
        let Testspermillion= item.testsPerOneMillion
        let Casespermillion= item.casesPerOneMillion
        let Deathspermillion= item.deathsPerOneMillion
        let code= item.countryInfo.iso2
        let obj= {
          Name:name,
          Code:code,
          Cases:Cases,
          Deaths:Deaths,
          Recovered:Recovered,
          Active:Active,
          Tests:Tests,
          Testspermillion:Testspermillion,
          Casespermillion:Casespermillion,
          Deathspermillion:Deathspermillion
        }
        codes.push(obj)

        for(let key in continents){
          if(item.continent===key){
            continents[key].data.push(item)
          }
        }


      })

      for(let key in continents){
        let Cases=0
        let Deaths=0
        let Recovered=0
        let Critical=0
        let Active=0
        let TodayCases=0
        let TodayDeaths=0

        continents[key].data.map((element) =>{
          Cases+= Number(element.cases)
          Deaths+= Number(element.deaths)
          Recovered+= Number(element.recovered)
          Critical+= Number(element.critical)
          Active+= Number(element.active)
          TodayCases+= Number(element.todayCases)
          TodayDeaths+= Number(element.todayDeaths)
        })

        let population= continents[key].population
        let casespermillion= ((Cases/population)*1000000).toFixed(0)
        let deathspermillion=((Deaths/population)*1000000).toFixed(0)

        let obj={Name:key,
          Cases:Cases,
          Deaths:Deaths,
          Recovered:Recovered,
          Active:Active,
          Critical:Critical,
          TodayCases:TodayCases,
          TodayDeaths:TodayDeaths,
          casespermillion:casespermillion,
          deathspermillion:deathspermillion
        }

        continents[key].total= obj
      } 


      //For Worldwide data
        const population= 7800000000
        const casespermillion= ((cases/population)*1000000).toFixed(0)
        const deathspermillion= ((deaths/population)*1000000).toFixed(0)

        WorldwideData.Cases= cases
        WorldwideData.lastupdated= lastupdated
        WorldwideData.Deaths= deaths
        WorldwideData.Recovered= recovered
        WorldwideData.Critical= critical
        WorldwideData.Active= active
        WorldwideData.TodayCases= todayCases
        WorldwideData.TodayDeaths= todayDeaths
        WorldwideData.casespermillion= casespermillion
        WorldwideData.deathspermillion= deathspermillion


      this.setState({
        sorted:false,
        appData:data,
        flagData:codes,
        continents:continents,
        Data:WorldwideData,
        DataCountries: rawdata
      })

  })
}

  changeContinent = (item) => {
    if(item.name==='Worldwide'){
      this.setState({
        appData:data,
        Data:WorldwideData
      })
    }
    if(item.name==='North America'){
      this.setState({
        appData:continents['North America'].data,
        Data:continents['North America'].total
      })
    }
    if(item.name==='South America'){
      this.setState({
        appData:continents['South America'].data,
        Data:continents['South America'].total
      })
    }
    if(item.name==='Europe'){
      this.setState({
        appData:continents['Europe'].data,
        Data:continents['Europe'].total
      })
    }
    if(item.name==='Asia'){
      this.setState({
        appData:continents['Asia'].data,
        Data:continents['Asia'].total
      })
    }
    if(item.name==='Africa'){
      this.setState({
        appData:continents['Africa'].data,
        Data:continents['Africa'].total
      })
    }
    if(item.name==='Australia/Oceania'){
      this.setState({
        appData:continents['Australia/Oceania'].data,
        Data:continents['Australia/Oceania'].total
      })
    }
  }

  sortValues = () => {
    this.setState({
      sorted: !this.state.sorted
    })
    if(this.state.sorted===true){
      let data= this.state.appData.sort((a, b) => a.country.localeCompare(b.country))
      this.setState({
        appData:data
      })
    }
    else{
      let data= this.state.appData.sort((a, b) => a.cases-b.cases).reverse()
      this.setState({
        appData:data
      })
    }
  }

  render(){
    return(
      <Fragment>
        <AppNavbar/>
        <AppHeading/>
        <Figures data={WorldwideData}/>
        <Chart flagData={this.state.flagData} chartData= {WorldwideData}/>
        <Table DataCountries= {this.state.DataCountries} sortValues={this.sortValues} data= {this.state.appData} dataw= {this.state.Data} changeContinent={this.changeContinent} list={this.state.list}/>
      </Fragment>
    );
  }
}

    
export default App