import React, {Component, Fragment} from "react"
import {Bar, Line, Pie,HorizontalBar} from 'react-chartjs-3';
import Stats from './Stats'

const dates=[]
const casesdata=[]
const deathsdata=[]
const recoveredata=[]
const activedata=[]

const url='https://pomber.github.io/covid19/timeseries.json'

class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
            chartData:{},
            name:'Total Cases',
            links:
                [
                    {
                        id:1,
                        name:'Total Cases',
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
                    },
                    {
                        id:4,
                        name:'Active Cases',
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
                    let active=0
                    for (let key in response){
                        cases+= Number(response[key][i].confirmed)
                        deaths+= Number(response[key][i].deaths)
                        recovered+= Number(response[key][i].recovered)
                        active= cases - deaths - recovered
                    }
                    //console.log(sum)
                    casesdata.push(cases)
                    deathsdata.push(deaths)
                    recoveredata.push(recovered)
                    activedata.push(active)
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
                name:item.name,
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
                name:item.name,
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
                name:item.name,
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

        if(item.id===4){
            this.setState({
                name:item.name,
                chartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#64b5f6',
                            label:'COVID-19 Active Cases',
                            data: activedata,
                            backgroundColor:'#64b5f6'
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
          const element=(
            <div className='container content-row' id="chart-2">
            <div className='row my-4'>
                <div className='col-12 d-flex mb-4'>
                <div className='shadow p-3 mb-4 bg-white rounded flex-fill'>
                <div className='text-center mb-2'>
                    <h6 style={{fontWeight:'500'}}>COVID-19: WORLDWIDE CUMULATIVE TREND</h6>
                    <hr></hr>
                </div>

                <div id='chart' className="chart-container">
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
                            <div className='container mt-4'>
                                <div className='text-center'>
                                <div class="btn-group">
                                    <button class="btn btn-light btn-md dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.name}
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
          )
        return(
            <Fragment>
                <Stats flagData= {this.props.flagData}/>
            </Fragment>
        )
      }
}

export default Chart
