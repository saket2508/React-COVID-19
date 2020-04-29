import React, {Component} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
import Chart from './components/Charts/Chart'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const url='https://corona.lmao.ninja/v2/countries?sort=cases'


//FOR HEADING INFO
const data=[]

//STORES FLAG CODES
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

  getData(){
    let deaths=0
    let cases=0
    let recovered=0
    let active=0
    let critical=0
    let todayDeaths=0
    let todayCases=0

    fetch(url)
      .then(res => res.json())
      .then(json => {
        json.map((item)=> {

          data.push(item)

          cases+= Number(item.cases)
          deaths+= Number(item.deaths)
          active+=  Number(item.active)
          critical+= Number(item.critical)
          recovered+= Number(item.recovered)
          todayDeaths+= Number(item.todayDeaths)
          todayCases+= Number(item.todayCases)

          //FLAG CODES
          let name= item.country
          let code= item.countryInfo.iso2
          let obj= {Name:name,Code:code}
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
          WorldwideData.Deaths= deaths
          WorldwideData.Recovered= recovered
          WorldwideData.Critical= critical
          WorldwideData.Active= active
          WorldwideData.TodayCases= todayCases
          WorldwideData.TodayDeaths= todayDeaths
          WorldwideData.casespermillion= casespermillion
          WorldwideData.deathspermillion= deathspermillion

        

        this.setState({
          appData:data,
          flagData:codes,
          continents:continents,
          Data:WorldwideData,
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

  render(){
    return(
      <div>
        <AppNavbar/>
        <AppHeading/>
        <Figures data={this.state.Data}/>
        <Chart flagData={this.state.flagData}/>
        <Table data= {this.state.appData} dataw= {this.state.Data} changeContinent={this.changeContinent} list={this.state.list}/>
      </div>
    );
  }
}

    
export default App