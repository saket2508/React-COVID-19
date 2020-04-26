import React, {Component, Fragment} from "react"
import {Bar, Line, Pie,HorizontalBar} from 'react-chartjs-3';

const dates=[]
const casesdata=[]
const deathsdata=[]
const recoveredata=[]

const url='https://pomber.github.io/covid19/timeseries.json'

class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
            chartData:{},
            links:
                [
                    {
                        id:1,
                        name:'Cases',
                        color:'secondary',
                        //selected:false
                    },
                    {
                        id:2,
                        name:'Deaths',
                        color:'danger',
                        //selected:false
                    },
                    {
                        id:3,
                        name:'Recovered',
                        color:'success',
                        //selected:false
                    }
                ]
        }
    }

    componentDidMount(){
        fetch(url)
            .then(res => res.json())
            .then(response =>{
                response['Afghanistan'].map(item =>{
                    let m= ""
                    let d= item.date.slice(7,9)
                    let month= item.date.slice(5,6)
                    if(month==='1'){
                        m='Jan'
                    }
                    if(month==='2'){
                        m='Feb'
                    }
                    if(month==='3'){
                        m='Mar'
                    }
                    if(month==='4'){
                        m='Apr'
                    }
                    if(month==='5'){
                        m='May'
                    }
                    let date =m+ ' '+d
                    dates.push(date)
                })
                for(let i=0;i<dates.length;i++){
                    let cases=0
                    let deaths=0
                    let recovered=0
                    for (let key in response){
                        cases+= Number(response[key][i].confirmed)
                        deaths+= Number(response[key][i].deaths)
                        recovered+= Number(response[key][i].recovered)
                    }
                    //console.log(sum)
                    casesdata.push(cases)
                    deathsdata.push(deaths)
                    recoveredata.push(recovered)
                }

                this.setState(
                    {
                        chartData:{
                            labels: dates,
                            datasets:[
                            {
                                fill:false,
                                borderColor:'#9e9e9e',//gray border
                                label:'COVID-19 Cases',
                                data: casesdata,
                                backgroundColor:'#9e9e9e'//gray background
                            },
                        ]
                        }
                    }
                )
            })
    }
    changeVariable(item){
        if(item.id===1){
            this.setState({
                chartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#9e9e9e',//gray border
                            label:'COVID-19 Cases',
                            data: casesdata,
                            backgroundColor:'#9e9e9e'//gray background
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                chartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#e57373',
                            label:'COVID-19 Deaths',
                            data: deathsdata,
                            backgroundColor:'#e57373'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                chartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#81c784',
                            label:'COVID-19 Recovered',
                            data: recoveredata,
                            backgroundColor:'#81c784'
                          }
                        ]
                }
            })
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }


      render(){
        return(
            <Fragment>
<div id="chart-2" >
    <div className="container shadow-sm p-3 mb-2 bg-white rounded mt-4">
        <div col="12">
        <p className='h5 text-center text-muted mb-4' style={{fontWeight:'500'}}>COVID-19: WORLDWIDE CUMULATIVE TREND</p>
        <div id='chart' className="chart-container mb-2">
        <Line
                            data={this.state.chartData}
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
    <div className='container mt-4'>
    <ul class="nav nav-pills justify-content-center">
            {this.state.links.map((item)=>(
                <li id={item.id} className="nav-item mr-1">
                    <button type="button" className={"btn btn-sm btn-outline-"+item.color} onClick={this.changeVariable.bind(this,item)}>{item.name}</button>
                </li>
            ))} 
        </ul>
    </div>
    </div>
    </div>

            </Fragment>
        )
      }
}

export default Chart
