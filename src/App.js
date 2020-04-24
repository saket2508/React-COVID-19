import React, {Component} from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'
import Chart from './components/Chart'
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
      Data:{Cases:0,Deaths:0,Recovered:0,Active:0,Critical:0,TodayCases:0,TodayDeaths:0,casespermillion:0},
      pieChart:{}
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
          country_names.push(item.country)
          country_data.push(item.cases)
          sum+= Number(item.cases)
        })

        country_names[6]='Other'
        country_data[6]= cases-sum

        const population= 7800000000
        let casespermillion= ((cases/population)*1000000).toFixed(0)
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
          pieChart:{
            labels: country_names,
                        datasets:[
                        {
                            label:'COVID-19 Cases',
                            data:country_data,
                            backgroundColor:[
                              '#ef9a9a',//RED
                              '#ffe082',//ORANGE
                              '#a5d6a7',//GREEN
                              '#81d4fa',//LIGHT BLUE
                              '#9fa8da',//BLUE
                              '#80cbc4',//TEAL
                              '#bdbdbd'//GRAY
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
        <Chart chartData={this.state.pieChart}/>
        <Table data= {this.state.myData} list={this.state.myList} dataw= {this.state.Data}/>
      </div>
    );
  }
}

    
export default App