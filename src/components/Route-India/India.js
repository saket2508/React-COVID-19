import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
import Charts from './IndiaCharts/Charts'

const labels=[]
const data=[]
const cases=[]
const dates=[]
const url= 'https://api.covid19india.org/data.json'
const url1='https://api.covid19india.org/data.json'

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
                                '#9e9e9e',
                                '#f44336',
                                '#4caf50',
                                '#4dd0e1',
                                '#ffeb3b',
                                '#0674C4',
                                '#ff9800'
                                ]
                        }
                        ]
                    }
                })
        fetch(url1)
        .then(res => res.json())
        .then(json =>{
            let rawdata= json.cases_time_series.slice(-7)
            rawdata.map((item)=>{
                dates.push(item.date)
                cases.push(Number(item.dailyconfirmed))
            })
            this.setState(
                {
                    
                timeSeries:{
                            labels: dates,
                            datasets:[
                                {
                                    label:'Cases Recorded',
                                    data:cases,
                                    backgroundColor:'#2196f3'
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
                <Charts chart1Data={this.state.pieChart} chart2Data={this.state.timeSeries} ch legendPosition="top"/>
                <TableIndia data= {this.state.statewiseData}/>
            </div>
        );

    }
}

export default India