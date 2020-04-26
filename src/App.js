import React, {Component} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
import Chart from './components/Charts/Chart'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const url='https://corona.lmao.ninja/v2/countries?sort=cases'
const url1='https://pomber.github.io/covid19/timeseries.json'
const data=[]
//const topsix_labels=[]
//const topsix_cases=[]

const deaths_data=[]
const active_data=[]
const recovered_data=[]

const dates=[]


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      myData:[],
      Data:{Cases:0,Deaths:0,Recovered:0,Active:0,Critical:0,TodayCases:0,TodayDeaths:0,casespermillion:0},
  
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
    let sum=0
    const country_names=[]
    const country_data=[]
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
        })
        let rawdata= json.slice(0,6)
        rawdata.map((item)=>{
          //country_names.push(item.country)
          country_data.push(item.cases)
          sum+= Number(item.cases)
        })

        const population= 7800000000
        let casespermillion= ((cases/population)*1000000).toFixed(0)

        let dataraw= data.slice(0,5)
        dataraw.map(item =>{
          country_names.push(item.country)
          active_data.push(Number(item.active))
          deaths_data.push(Number(item.deaths))
          recovered_data.push(Number(item.recovered))
        })

        this.setState({
          myData:data,
          Data:{
            Cases:cases,
            Deaths:deaths,
            Recovered:recovered,
            Active:active,
            Critical:critical,
            TodayCases:todayCases,
            TodayDeaths:todayDeaths,
            casespermillion:casespermillion
          },
        })
      })
  }

  render(){
    return(
      <div>
        <AppNavbar/>
        <AppHeading/>
        <Figures data={this.state.Data}/>
        <Chart/>
        <Table data= {this.state.myData} list={this.state.myList} dataw= {this.state.Data}/>
      </div>
    );
  }
}

    
export default App