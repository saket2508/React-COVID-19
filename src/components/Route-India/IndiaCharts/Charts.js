import React, {Component, Fragment} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-3';

const url='https://api.covid19india.org/data.json'

const dates=[]
const cases=[]
const recovered=[]
const deaths=[]
const activecases=[]

const dailycases=[]
const dailydeaths=[]
const dailyrecovered=[]
const dailyactive=[]
const dates2=[]


class Charts extends Component{
    constructor(props){
        super(props)
        this.state={
            Name1:'Total Cases',
            Name2:'Total Cases',
            CumulativeChartData: {},
            DailyChartData:{},
            AreaChart:{},
            links:[
                {
                    id:1,
                    name:'Total Cases',
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
                {
                    id:4,
                    name:'Active Cases',
                    color:'primary',
                    selected:false
                }
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
                    cases.push(Number(item.totalconfirmed))    
                    deaths.push(Number(item.totaldeceased))
                    recovered.push(Number(item.totalrecovered))
                    let active= Number(item.totalconfirmed)- Number(item.totaldeceased)- Number(item.totalrecovered)
                    activecases.push(active)
                })

                rawdata.map((item)=>{
                    dailycases.push(item.dailyconfirmed)
                    dailydeaths.push(item.dailydeceased)
                    dailyrecovered.push(item.dailyrecovered)
                    let active = Number(item.dailyconfirmed)- Number(item.dailydeceased)- Number(item.dailyrecovered)
                    dailyactive.push(active)
                    dates2.push(item.date)
                })

                this.setState({
                    DailyChartData:{
                        labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',//gray border
                            label:'COVID-19 Cases',
                            data: dailycases,
                            backgroundColor:'#9e9e9e'//gray bg
                          }
                        ]
                    },
                    CumulativeChartData:{
                        labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',//gray border
                            label:'COVID-19 Total Cases',
                            data: cases,
                            backgroundColor:'#9e9e9e'//gray background
                          }
                        ]
                    },
                })
            })
    }

    changeDailyVariable(item){
        if(item.id===1){
            this.setState({
                Name1:'Total Cases',
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',//gray border
                            label:'COVID-19: Cases',
                            data: dailycases,
                            backgroundColor:'#9e9e9e'//gray bg
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                Name1:'Deaths',
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#e57373',
                            label:'COVID-19: Deaths',
                            data: dailydeaths,
                            backgroundColor:'#e57373'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                Name1:'Recovered',
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#81c784',
                            label:'COVID-19: Recovered',
                            data: dailyrecovered,
                            backgroundColor:'#81c784'
                          }
                        ]
                }
            })
        }

        if(item.id===4){
            this.setState({
                Name1:'Active Cases',
                DailyChartData:{
                    labels: dates2,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#64b5f6',
                            label:'COVID-19: Active Cases',
                            data: dailyactive,
                            backgroundColor:'#64b5f6'
                          }
                        ]
                }
            })
        }
    }

    changeVariable(item){
        if(item.id===1){
            this.setState({
                Name2:'Total Cases',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',
                            label:'COVID-19 Total Cases',
                            data: cases,
                            backgroundColor:'#9e9e9e'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                Name2:'Deaths',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#e57373',
                            label:'COVID-19: Total Deaths',
                            data: deaths,
                            backgroundColor:'#e57373'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                Name2:'Recovered',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#81c784',
                            label:'COVID-19: Total Recovered',
                            data: recovered,
                            backgroundColor:'#81c784'
                          }
                        ]
                }
            })
        }

        if(item.id===4){
            this.setState({
                Name2:'Active Cases',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#64b5f6',
                            label:'COVID-19: Active Cases',
                            data: activecases,
                            backgroundColor:'#64b5f6'
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
                    <div className='container content-row' id="chart-2">
                    <div className='row my-4'>
                        <div className='col-12 d-flex mb-4'>
                        <div className='shadow p-3 bg-white rounded flex-fill'>
                        <div className='text-center mb-2'>
                            <h6 style={{fontWeight:'500'}}>COVID-19 INDIA: DAILY TREND</h6>
                            <hr></hr>
                        </div>

                        <div id='chart' className="chart-container">
                        <Line
                                    data={this.state.DailyChartData}
                                    options={{
                                        tooltips:{
                                            mode:'index',
                                            intersect:false
                                        },
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
                                    <div className='container mt-4'>
                                        <div className='text-center'>
                                        <div class="btn-group">
                                            <button class="btn btn-light btn-md dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.Name1}
                                            </button>       
                                                <div class="dropdown-menu">
                                                {this.state.links.map((item)=>(
                                                        <a class="dropdown-item" key={item.id} onClick={this.changeDailyVariable.bind(this,item)}>
                                                            {item.name}
                                                        </a>
                                                    ))} 
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>         
                        </div>

                        <div className='col-12 d-flex mb-4'>
                        <div className='shadow p-3 bg-white rounded flex-fill'>
                        <div className='text-center mb-2'>
                            <h6 style={{fontWeight:'500'}}>COVID-19 INDIA: CUMULATIVE TREND</h6>
                            <hr></hr>
                        </div>

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
                                    <div className='container mt-4'>
                                        <div className='text-center'>
                                        <div class="btn-group">
                                            <button class="btn btn-light btn-md dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.Name2}
                                            </button>       
                                                <div class="dropdown-menu">
                                                {this.state.links.map((item)=>(
                                                        <a class="dropdown-item" key={item.id} onClick={this.changeVariable.bind(this,item)}>
                                                        {item.name}
                                                        </a>
                                                    ))} 
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                </div> 
                                </div>         
                        </div>
                
                        </div>
            </Fragment>
        )
      }
    }


export default Charts