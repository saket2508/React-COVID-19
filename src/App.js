import React, {Component} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
//import Chart from './components/Chart'
import './App.css';

const url='https://corona.lmao.ninja/v2/countries?sort=cases'
const data=[]
//const topsix_labels=[]
//const topsix_cases=[]


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
       const cases_breakdown=[active,recovered,deaths]
       const labels=['Active','Recovered','Deceased']
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
            labels: labels,
                        datasets:[
                        {
                            label:'COVID-19 Cases',
                            data:cases_breakdown,
                            backgroundColor:[
                              '#64b5f6',
                              '#81c784',
                              '#e57373'
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
        <Table data= {this.state.myData} list={this.state.myList}/>
      </div>
    );
  }
}

    
export default App