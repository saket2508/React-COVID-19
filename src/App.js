import React, {Component} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
import Chart from './components/Chart'
import './App.css';
import axios from 'axios';

const url='https://corona.lmao.ninja/v2/countries?sort=cases'
const data=[]
const topsix_labels=[]
const topsix_cases=[]

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      myData:[],
      Data:{Cases:0,Deaths:0,Recovered:0,Active:0,TodayCases:0,TodayDeaths:0},
      pieChart:{}
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    let sum=0
    let deaths=0
    let cases=0
    let recovered=0
    let active=0
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
          recovered+= Number(item.recovered)
          todayDeaths+= Number(item.todayDeaths)
          todayCases+= Number(item.todayCases)
        })
        let rawdata= json.slice(0,6)
        rawdata.map((item)=> {
          sum+= Number(item.cases)
          topsix_labels.push(item.country)
          topsix_cases.push(Number(item.cases))
        })
        topsix_labels[6]='Other'
        topsix_cases[6]=cases-sum
        this.setState({
          myData:data,
          Data:{
            Cases:cases,
            Deaths:deaths,
            Recovered:recovered,
            Active:active,
            TodayCases:todayCases,
            TodayDeaths:todayDeaths
          },
          pieChart:{
            labels: topsix_labels,
                        datasets:[
                        {
                            label:'COVID-19 Cases',
                            data:topsix_cases,
                            backgroundColor:[
                            '#f44336',
                            '#ff9800',
                            '#4caf50',
                            '#4dd0e1',
                            '#ffeb3b',
                            '#0674C4',
                            '#9e9e9e'
                            ]
                        }
                        ]
          }
        })
      })
  }


  render(){
    return(
      <div>
        <AppNavbar/>
        <AppHeading/>
        <Figures data={this.state.Data}/>
        <Chart chart1Data={this.state.pieChart}/>
        <Table data= {this.state.myData} list={this.state.myList}/>
      </div>
    );
  }
}

    
export default App