import React, {Component} from "react"
import {Bar, Line, Pie} from 'react-chartjs-3';



class Chart extends Component{
    constructor(props){
        super(props)
    }
    

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }

      render(){
        return (
            <div id="chart-3">
                <div className="container shadow-sm p-3 mb-2 bg-white rounded mt-4">
                    <div col="12">
                    <p className='h5 text-center text-muted mb-2' style={{fontWeight:'500'}}>COVID-19: COUNTRIES HAVING THE MOST CASES</p>
                        <div id='chart' className="chart-container mb-1">
                            <Pie
                            data={this.props.chartData}
                            options={{
                                responsive:true,
                                maintainAspectRatio:false,
                                title:{
                                    display:false,
                                },
                                legend:{
                                    display:this.props.displayLegend,
                                    position:"bottom",
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
            </div>

        )
      }
}

export default Chart
