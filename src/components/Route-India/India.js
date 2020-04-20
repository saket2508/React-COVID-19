import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
//import Charts from './IndiaCharts/Charts'

const labels=[]
const data=[]

const cases=[]
const deaths=[]
const recovered=[]

const newcases=[]
const newdeaths=[]
const newrecovered=[]

const dates=[]

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
            rawdata:{},
            pieChart:{},
            timeSeries:{}
        }
    }

    componentDidMount(){
        this.getData();
    }


    getData(){
        fetch(url)
        .then(res => res.json())
        .then(json => {
            let rawdata= json.statewise.slice(0,7)
            rawdata.map((item)=>{
                labels.push(item.state)
                data.push(Number(item.confirmed))
            })
            labels[0]='Other'
            let sum=0
            data.slice(1).map((item)=>{
                sum+= item
            })
            data[0]= data[0]-sum
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
                pieChart:{
                        labels: labels,
                        datasets:[
                        {
                            label:'COVID-19 Cases',
                            data:data,
                            backgroundColor:[
                                '#9e9e9e',//Gray
                                '#e57373',//Red
                                '#81c784',//Green
                                '#4fc3f7',//Light Blue
                                '#fff176',//Yellow
                                '#7986cb',//Blue
                                '#ffb74d'//Orange
                                ]
                        }
                        ]
                    }
                })
        fetch(url)
        .then(res => res.json())
        .then(json =>{
            let rawdata= json.cases_time_series.slice(1)
            rawdata.map((item)=>{
                dates.push(item.date)
                cases.push(Number(item.totalconfirmed))
                deaths.push(Number(item.totaldeceased))
                recovered.push(Number(item.totalrecovered))
            })
            this.setState(
                {
                rawdata:{
                    'CasesTimeSeries':cases,
                    'DeathsTimeSeries':deaths,
                    'RecoveredTimeSeries':recovered
                },
                    
                timeSeries:{
                            labels: dates,
                            datasets:[
                                {
                                    fill:false,
                                    label:'Confirmed',
                                    data:cases,
                                    backgroundColor:'#2196f3',
                                    borderColor:'#2196f3',
                                    //pointBackgroundColor:'#2196f3'
                                }
                                ]
                        }
                }
            )
        })
    })}

    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingStats data= {this.state.natnlData}/>
                <TableIndia data= {this.state.statewiseData}/>
            </div>
        );

    }
}

export default India