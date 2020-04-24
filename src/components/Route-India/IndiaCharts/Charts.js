import React, {Component, Fragment} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-3';

const url='https://api.covid19india.org/data.json'

const dates=[]
const cases=[]
const recovered=[]
const deaths=[]

const dailycases=[]
const dailydeaths=[]
const dailyrecovered=[]
const dates2=[]

const state_names=[]
const state_data=[]

class Charts extends Component{
    constructor(props){
        super(props)
        this.state={
            CumulativeChartData: {},
            DailyChartData:{},
            PieChart:{},
            links:[
                {
                    id:1,
                    name:'Cases',
                    color:'secondary',
                    selected:false
                },
                {
                    id:2,
                    name:'Deaths',
                    color:'danger',
                    selected:false
                },
                {
                    id:3,
                    name:'Recovered',
                    color:'success',
                    selected:false
                },
            ]
        }
    }

    componentDidMount(){
        this.getChartData()
    }

    getChartData(){
        fetch(url)
            .then(res => res.json())
            .then(json => {
                        
                let rawdata= json.cases_time_series
                rawdata.map((item)=>{
                    dates.push(item.date)
                    cases.push(item.totalconfirmed)    
                    deaths.push(item.totaldeceased)
                    recovered.push(item.totalrecovered)
                })

                rawdata.slice(-21).map((item)=>{
                    dailycases.push(item.dailyconfirmed)
                    dailydeaths.push(item.dailydeceased)
                    dailyrecovered.push(item.dailyrecovered)
                    dates2.push(item.date)
                })

                this.setState({
                    DailyChartData:{
                        labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',
                            label:'COVID-19 Cases',
                            data: dailycases,
                            backgroundColor:'#9e9e9e'
                          }
                        ]
                    },
                    CumulativeChartData:{
                        labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',
                            label:'COVID-19 Cases',
                            data: cases,
                            backgroundColor:'#9e9e9e'
                          }
                        ]
                    },
                })
            })
    }

    changeDailyVariable(item){
        if(item.id===1){
            this.setState({
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',
                            label:'COVID-19 Cases',
                            data: dailycases,
                            backgroundColor:'#9e9e9e'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#e57373',
                            label:'COVID-19 Deaths',
                            data: dailydeaths,
                            backgroundColor:'#e57373'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#81c784',
                            label:'COVID-19 Recovered',
                            data: dailyrecovered,
                            backgroundColor:'#81c784'
                          }
                        ]
                }
            })
        }
    }

    changeVariable(item){
        if(item.id===1){
            this.setState({
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',
                            label:'COVID-19 Cases',
                            data: cases,
                            backgroundColor:'#9e9e9e'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#e57373',
                            label:'COVID-19 Deaths',
                            data: deaths,
                            backgroundColor:'#e57373'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#81c784',
                            label:'COVID-19 Recovered',
                            data: recovered,
                            backgroundColor:'#81c784'
                          }
                        ]
                }
            })
        }
    }

    static defaultProps = {
        displayTitle:false,
        displayLegend: true,
        legendPosition:'right',
      }

      render(){
        return (
<Fragment>
    <div id="chart-1">
    <div className="container shadow-sm p-3 mb-2 bg-white rounded mt-4">
        <div col="12">
        <p className='text-center text-muted mb-2' style={{fontWeight:'500'}}>COVID-19 INDIA: NEW CASES OVER TIME</p>
        <div id='chart' className="chart-container">
        <Bar
                data={this.state.DailyChartData}
                options={{
                    responsive:true,
                    maintainAspectRatio:false,
                    title:{
                        display:false
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:"top",
                        labels:{
                            fontFamily:  "'Noto Sans JP', sans-serif",
                            fontColor:'#000'
                        },
                        onClick: (e) => e.stopPropagation()
                    },
                    scales: {
                        xAxes: [
                        {
                            gridLines: {
                                display:false
                            },
                            //barPercentage: 0.4,
                            ticks:{
                                    fontFamily:  "'Noto Sans JP', sans-serif",
                                    fontSize:'12',
                                    fontColor: '#000',
                                }
                            }
                        ],
                        yAxes: [
                            {
                                ticks:{
                                        fontFamily:  "'Noto Sans JP', sans-serif",
                                        fontSize:'12',
                                        fontColor: '#000',
                                    }
                                }
                            ]
                        
                    }
                }}
                />
            </div>
        </div>
    </div>
    <div className='container mb-4'>
        <ul class="nav justify-content-center">
            {this.state.links.map((item)=>(
                <li id={item.id} className="nav-item mr-1">
                    <button type="button" className={"btn btn-sm btn-outline-"+item.color} onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</button>
                </li>
            ))}
        </ul>
    </div>
    </div>

    <div id="chart-2" >
    <div className="container shadow-sm p-3 mb-2 bg-white rounded mt-4" >
        <div col="12">
        <p className='text-center text-muted mb-2' style={{fontWeight:'500'}}>COVID-19 INDIA: CASES OVER TIME</p>
        <div id='chart' className="chart-container">
        <Line
                data={this.state.CumulativeChartData}
                options={{
                    responsive:true,
                    maintainAspectRatio:false,
                    title:{
                        display:false,
                        text:'Largest Cities In '+this.props.location,
                        fontSize:25
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:"top",
                        labels:{
                            fontFamily:  "'Noto Sans JP', sans-serif",
                            fontColor:'#000'
                        },
                        onClick: (e) => e.stopPropagation()
                    },
                    tooltips:{
                        enabled:true,
                        mode:'index',
                        intersect:false
                    },
                    scales: {
                        xAxes: [
                        {
                            gridLines: {
                                display:false
                            },
                            ticks:{
                                    fontFamily:  "'Noto Sans JP', sans-serif",
                                    fontSize:'12',
                                    fontColor: '#000',
                                }
                            }
                        ],
                        yAxes: [
                            {
                                ticks:{
                                        fontFamily:  "'Noto Sans JP', sans-serif",
                                        fontSize:'12',
                                        fontColor: '#000',
                                    }
                                }
                            ]
                        
                    }
                }}
                />
            </div>
        </div>
    </div>
    <div className='container mb-4'>
        <ul class="nav justify-content-center">
            {this.state.links.map((item)=>(
                <li id={item.id} className="nav-item mr-1">
                    <button type="button" className={"btn btn-sm btn-outline-"+item.color} onClick={this.changeVariable.bind(this,item)}>{item.name}</button>
                </li>
            ))}
        </ul>
    </div>
    </div>
</Fragment>

        )
      }
    }


export default Charts