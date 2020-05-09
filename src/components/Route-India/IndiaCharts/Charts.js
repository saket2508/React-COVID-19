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
            Name1:'Cases',
            Name2:'Cases',
            val1:'New Cases',
            val2:'Cases',
            CumulativeChartData: {},
            DailyChartData:{},
            AreaChart:{},
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
                        labels: dates2.slice(-61),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#1e88e5',//gray border
                            label:'COVID-19 Cases',
                            data: dailycases.slice(-61),
                            backgroundColor:'#1e88e5'//gray bg
                          }
                        ]
                    },
                    CumulativeChartData:{
                        labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#1e88e5',
                            label:'COVID-19 Total Cases',
                            data: cases,
                            backgroundColor:'#e3f2fd'
                          }
                        ]
                    },
                })
            })
    }

    changeDailyVariable(item){
        if(item.id===1){
            this.setState({
                val1:'New Cases',
                Name1:'Cases',
                DailyChartData:{
                    labels: dates2.slice(-61),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#1e88e5',//gray border
                            label:'COVID-19: Cases',
                            data: dailycases.slice(-61),
                            backgroundColor:'#1e88e5'//gray bg
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                val1:'New Deaths',
                Name1:'Deaths',
                DailyChartData:{
                    labels: dates2.slice(-61),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#ff5722',
                            label:'COVID-19: Deaths',
                            data: dailydeaths.slice(-61),
                            backgroundColor:'#ff5722'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                val1:'New Recoveries',
                Name1:'Recovered',
                DailyChartData:{
                    labels:dates2.slice(-61),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#7cb342',
                            label:'COVID-19: Recovered',
                            data: dailyrecovered.slice(-61),
                            backgroundColor:'#7cb342'
                          }
                        ]
                }
            })
        }
    }

    changeVariable(item){
        if(item.id===1){
            this.setState({
                Name2:'Cases',
                val2:'Cases',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#1e88e5',
                            label:'COVID-19 Total Cases',
                            data: cases,
                            backgroundColor:'#e3f2fd'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                Name2:'Deaths',
                val2:'Deaths',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#ff5722',
                            label:'COVID-19: Total Deaths',
                            data: deaths,
                            backgroundColor:'#fbe9e7'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                Name2:'Recovered',
                val2:'Recoveries',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#7cb342',
                            label:'COVID-19: Total Recovered',
                            data: recovered,
                            backgroundColor:'#f1f8e9'
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
                    <div className='chart mb-4 mt-4'>
                        <div className='container-md content-row'>
                            <div className='row my-5'>
                                <div className='col-12 mb-4'>
                                    <h5 className='text-center text-muted' style={{fontWeight:'700'}}>SPECIAL TRENDS <i class="fas fa-chart-line"></i></h5>
                                    <hr></hr>
                                </div>
                                <div className='col-12 mt-3 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h6 className='text-center text-muted' style={{fontWeight:'600'}}>COVID-19 India: {this.state.val2} Over Time</h6>
                                <hr></hr>
                            </div>
                            <div className='card-body'>
                                    
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
                                            display:false,
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
                                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.Name2}
                                            </button>       
                                                <div class="dropdown-menu">
                                                {this.state.links.slice(0,3).map((item)=>(
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
                                <div className='col-12 mt-3 mb-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h6 className='text-center text-muted' style={{fontWeight:'600'}}>COVID-19 India: {this.state.val1} Over Time</h6>
                                            <hr></hr>
                                        </div>
                                        <div className='card-body'>
                                            <div id='chart' className='chart-container'>
                                            <Bar
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
                                            display:false,
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
                                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.Name1}
                                            </button>       
                                                <div class="dropdown-menu">
                                                {this.state.links.slice(0,3).map((item)=>(
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
                                </div>
                    </div>
                            </div>
                        </div>

            </Fragment>
        )
      }
    }


export default Charts