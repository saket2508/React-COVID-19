import React, {Component, Fragment} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-3';


class Charts extends Component{
    constructor(props){
        super(props)
        this.state={
            chartData: {}
        }
    }

    componentDidMount(){
        this.setState({
            chartData: this.props.chart2Data
        })
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }

      render(){
        return (
            <Fragment>
    <div id='chart' className="container shadow-sm p-3 mb-2 bg-white rounded mt-2">
        <div col="12">
        <p className='text-center text-muted mb-2' style={{fontWeight:'500'}}>COVID-19 INDIA: CUMULATIVE TREND</p>
        <div id='chart-2' className="chart-container">
        <Line
                data={this.props.chart2Data}
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
                    scales: {
                        xAxes: [
                        {
                            barPercentage: 0.4,
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
                                        fontSize:'15',
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
    <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item">
                <a class="nav-link active" href="#">Cases</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Deaths</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Recovered</a>
            </li>
    </ul>
    </div>
    <div id='chart' className="container shadow-sm p-3 mb-2 bg-white rounded mt-2">
                <div col="12">
                <p className='text-center text-muted mb-2' style={{fontWeight:'500'}}>STATEWISE DISTRIBUTION OF CASES</p>
                <div id='chart-1' className="chart-container mb-3">
                <Pie
                data={this.props.chart1Data}
                options={{
                    responsive:true,
                    maintainAspectRatio:false,
                    title:{
                        display:false,
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:"right",
                        labels:{
                            fontFamily:  "'Noto Sans JP', sans-serif",
                            fontColor:'#000'
                        },
                    }
                }}
                />
            </div>
        </div>
    </div>
            </Fragment>

        )
      }
    }


export default Charts