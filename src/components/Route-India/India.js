import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
import Charts from './IndiaCharts/Charts'
import Stats from './IndiaCharts/Stats'
//import Charts from './IndiaCharts/Charts'

const labels=[]
const data=[]

const cases=[]
const deaths=[]
const recovered=[]

const dates=[]
const population=1350000000

const url= 'https://api.covid19india.org/data.json'

class India extends Component{
    constructor(props){
        super(props);
        this.state= {
            natnlData:{
                'confirmed':0,
                'active':0,
                'deaths':0,
                'recovered':0,
                'deltaconfirmed':0,
                'deltadeaths':0,
                'deltarecovered':0,
            },
            statewiseData:[],
            Insights:{
                totalTests:0,
                newTests:0,
                population:1350000000,
                latestUpdate:{
                    date:"",
                    timeStamp:"",
                    newCases:0,
                    newDeaths:0,
                    newRecoveries:0
                }

            }
        }
    }

    componentDidMount(){
        this.getData();
    }


    getData(){
        fetch(url)
        .then(res => res.json())
        .then(json => {
            let rawdatatests= json.tested.slice(-1)[0]
            let rawdatainfo= json.cases_time_series.slice(-1)[0]
            let totalTests= Number(rawdatatests.totalsamplestested)
            let testspermillion= ((totalTests/population)*1000000).toFixed(0)
            let casespermillion= (Number(json.statewise[0].confirmed)/population*1000000).toFixed(0)
            let deathspermillion= (Number(json.statewise[0].deaths)/population).toFixed(1)
            let d= Number(json.statewise[0].lastupdatedtime.slice(0,2))
            let m= Number(json.statewise[0].lastupdatedtime.slice(3,5))
            this.setState({
                natnlData:  {
                        'confirmed':json.statewise[0].confirmed,
                        'active':json.statewise[0].active,
                        'deaths':json.statewise[0].deaths,
                        'recovered':json.statewise[0].recovered,
                        'deltaconfirmed':json.statewise[0].deltaconfirmed,
                        'deltadeaths':json.statewise[0].deltadeaths,
                        'deltarecovered':json.statewise[0].deltarecovered,
                    },
                statewiseData: json.statewise.slice(1),
                Insights:{
                    totalTests: rawdatatests.totalsamplestested,
                    newTests:rawdatatests.samplereportedtoday,
                    population:1350000000,
                    testspermillion:testspermillion,
                    casespermillion:casespermillion,
                    deathspermillion:deathspermillion,
                    latestUpdate:{
                        date: new Date(2020,m-1,d).toDateString().slice(4,11),
                        timeStamp:json.statewise[0].lastupdatedtime,
                        newCases:rawdatainfo.dailyconfirmed,
                        newDeaths:rawdatainfo.dailydeceased,
                        newRecoveries:rawdatainfo.dailyrecovered
                    }
                }
            })
    })}

    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingStats insights={this.state.Insights} data= {this.state.natnlData}/>
                <Stats data={this.state.natnlData} insights={this.state.Insights}/>
                <Charts/>
                <TableIndia data= {this.state.statewiseData} natnl={this.state.natnlData}/>
            </div>
        );

    }
}

export default India