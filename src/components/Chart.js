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
                <div id='chart' className="container shadow-sm p-3 mb-2 bg-white rounded mt-2">
        <div col="12">
        <p className='text-center text-muted mb-2' style={{fontWeight:'500'}}>BREAKDOWN OF CONFIRMED CASES</p>
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

        )
      }
}

export default Chart
