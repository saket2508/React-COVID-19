import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
import Charts from './IndiaCharts/Charts'
import Stats from './IndiaCharts/Stats'
//import Charts from './IndiaCharts/Charts'

const cases=[]
const deaths=[]
const recovered=[]

const population=1350000000

const url= 'https://api.covid19india.org/data.json'

class India extends Component{
    constructor(props){
        super(props);
        this.state= {
            sorted:false,
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
            newCases:[],
            newDeaths:[],
            newRecoveries:[],
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

    sortValues = () =>{
        this.setState({
            sorted: !this.state.sorted
        })

        if(this.state.sorted){
            let data= this.state.statewiseData
            data.sort((a,b) => a.state.localeCompare(b.state))

            this.setState({
                statewiseData:data
            })
        }
        else{
            let data= this.state.statewiseData
            data.sort((a,b) => Number(a.confirmed)-Number(b.confirmed)).reverse()
            this.setState({
                statewiseData:data
            })
        }
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

            json.statewise.slice(1).map((element) => {

                let name= element.state
                let Cases= Number(element.confirmed)
                let newcases= Number(element.deltaconfirmed)
                let Deaths= Number(element.deaths)
                let newdeaths= Number(element.deltadeaths)
                let Recovered= Number(element.recovered)
                let newrecoveries= Number(element.deltarecovered)

                let obj1={State: name,NewCases:newcases,Cases:Cases}
                let obj2={State: name,NewDeaths:newdeaths,Deaths:Deaths}
                let obj3={State: name,NewRecoveries:newrecoveries,Recovered:Recovered}

                cases.push(obj1)
                deaths.push(obj2)
                recovered.push(obj3)

            })

            cases.sort((a,b) => a.NewCases-b.NewCases)
            deaths.sort((a,b) => a.NewDeaths-b.NewDeaths)
            recovered.sort((a,b) => a.NewRecoveries-b.NewRecoveries)

            this.setState({
                sorted:false,
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
                newCases:cases,
                newDeaths:deaths,
                newRecoveries:recovered,
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

    changeDataCases(){
        cases.sort((a,b) => a.Cases-b.Cases)
        this.setState({
            newCases:cases.slice(-5).reverse()
        })
    }

    changeDataRecovered(){
        deaths.sort((a,b) => a.Deaths-b.Deaths)
        this.setState({
            NewDeaths:deaths.slice(-5).reverse()
        })
    }

    changeDataDeaths(){
        recovered.sort((a,b) => a.Recovered-b.Recovered)
        this.setState({
            NewDeaths:deaths.slice(-5).reverse()
        })
    }


    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingStats insights={this.state.Insights} data= {this.state.natnlData}/>
                <Charts/>
                
                <TableIndia data= {this.state.statewiseData} natnl={this.state.natnlData} sortValues={this.sortValues}/>
            </div>
        );

    }
}

export default India