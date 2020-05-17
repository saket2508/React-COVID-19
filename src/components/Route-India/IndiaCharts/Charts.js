import React, {Component, Fragment} from 'react';
import {Bar, Line, Doughnut} from 'react-chartjs-3';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { colors, Container } from "@material-ui/core";

const url='https://api.covid19india.org/data.json'

const states_info={}
const data_india={}
let dates_states=[]
let index=0

const dates=[]
const list=[]
const cases=[]
const tested_series=[]
const recovered=[]
const deaths=[]
const activecases=[]

const dailycases=[]
const dailydeaths=[]
const dailyrecovered=[]
const dailyactive=[]
const dates2=[]

function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}



class Charts extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            Selected:'India',
            Data:{},
            Name1:'Cases',
            Name2:'Cases',
            val1:'New Cases',
            val2:'Cases',
            statewiseInfo:{},
            statesData:{},
            chartCard:{},
            info:{},
            info1:{},
            infoCard:{},
            testsChart:{},
            activeChart:{},
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

            ]
        }
        
    }

    componentDidMount(){
        this.getData()
    }


    async getStatewiseTestingData(){
        await fetch('https://api.covid19india.org/state_test_data.json')
            .then(res => res.json())
            .then(response => {
                let rawdata_states_tests= response.states_tested_data
                rawdata_states_tests.map((item) => {
                    for(let key in states_info){
                        if(item.state===key){
                            let tested= Number(item.totaltested)
                            states_info[key].total_tests.push(tested)
                        }
                    }
                })
            })
    }

    async getStatesDaily(){
        await fetch('https://api.covid19india.org/states_daily.json')
                .then(res => res.json())
                .then(json => {
                    console.log('HI')
                    let rawdata_states_daily= json.states_daily
                    rawdata_states_daily.map((item) => {
                        if(item.status==='Confirmed'){
                            for(let key in states_info){
                                let code= states_info[key].code
                                //console.log(code)
                                let confirmed= Number(item[code])
                                states_info[key].dailycases.push(confirmed)
                            }
                        }
                        if(item.status==='Recovered'){
                            for(let key in states_info){
                                let code= states_info[key].code
                                //console.log(code)
                                let recovered= Number(item[code])
                                states_info[key].dailyrecovered.push(recovered)
                            }
                        }
                        if(item.status==='Deceased'){
                            for(let key in states_info){
                                let code= states_info[key].code
                                //console.log(code)
                                let deceased= Number(item[code])
                                states_info[key].dailydeaths.push(deceased)
                            }
                        }
                    })
                    const length= states_info['Assam'].dailycases.length
                    for(let key in states_info){
                        for(let i=0;i<length;i++){
                            let cases_sum=0
                            for(let j=0;j<=i;j++){
                                cases_sum+= states_info[key].dailycases[j]
                            }
                            states_info[key].cases.push(cases_sum)
                        }
                        for(let i=0;i<length;i++){
                            let deaths_sum=0
                            for(let j=0;j<=i;j++){
                                deaths_sum+= states_info[key].dailydeaths[j]
                            }
                            states_info[key].deaths.push(deaths_sum)
                        }
                        for(let i=0;i<length;i++){
                            let rec_sum=0
                            for(let j=0;j<=i;j++){
                                rec_sum+= states_info[key].dailyrecovered[j]
                            }
                            states_info[key].recovered.push(rec_sum)
                        }
                    }
                })
    }

    getData(){
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

                let rawdata_tested= json.tested
                rawdata_tested.map((item) => {
                    let tests_done= item["totalsamplestested"]
                    if(tests_done!==""){
                        tests_done= Number(tests_done)
                        tested_series.push(tests_done)
                    }
                })

                for(let i=0;i< tested_series.length-1;i++){
                    let diff= tested_series[i+1]- tested_series[i]
                    tested_series[i]= diff
                }

                //chart data
                data_india.cases= cases.slice(44)
                data_india.deaths= deaths.slice(44)
                data_india.recovered= recovered.slice(44)
                data_india.active= activecases.slice(44)
                data_india.dailycases= dailycases.slice(44)
                data_india.dailydeaths= dailydeaths.slice(44)
                data_india.dailyrecovered= dailyrecovered.slice(44)

                let active_sum= data_india.cases.slice(-1)[0]-data_india.deaths.slice(-1)[0]-data_india.recovered.slice(-1)[0]
                let cases_sum= data_india.cases.slice(-1)[0]
                let recovered_sum= data_india.recovered.slice(-1)[0]
                let deaths_sum= data_india.deaths.slice(-1)[0]

                data_india.activeratio= ((active_sum/cases_sum)*100).toFixed(1)
                data_india.mortalityrate= ((deaths_sum/cases_sum)*100).toFixed(1)
                data_india.recoveryrate= ((recovered_sum/cases_sum)*100).toFixed(1)


                let total_tests= Number(rawdata_tested[rawdata_tested.length-1].totalsamplestested)
                let today_tests= total_tests- Number(rawdata_tested[rawdata_tested.length-2].totalsamplestested)
                let TestsDiff= today_tests- (Number(rawdata_tested[rawdata_tested.length-2].totalsamplestested)- Number(rawdata_tested[rawdata_tested.length-3].totalsamplestested))

                data_india.total_tests= total_tests
                data_india.today_tested= today_tests
                data_india.TestsDiff= TestsDiff

                let rawdata_states= json.statewise
                let confirmed= Number(rawdata_states[0].confirmed)
                let deaths_total= Number(rawdata_states[0].deaths)
                let recovered_total= Number(rawdata_states[0].recovered)
                let active_total= confirmed- deaths_total - recovered_total

                data_india.Cases=  confirmed
                data_india.Active= active_total
                data_india.Deaths= deaths_total
                data_india.Recovered= recovered_total

                data_india.casespermillion= ((confirmed/1350000000)*1000000).toFixed(0)
                data_india.deathspermillion= ((deaths_total/1350000000)*1000000).toFixed(0)
                data_india.testspermillion= ((total_tests/1350000000)*1000000).toFixed(0)



                rawdata_states.map((item) => {
                    let key= item.state
                    if(item.state==='Dadra and Nagar Haveli and Daman and Diu'){
                        key= 'Dadra and Nagar Haveli'
                    }
                    if(key!=='Total'){
                        list.push(key)
                    }
                    let code= item.statecode.toLowerCase()
                    let cases= Number(item.confirmed)
                    let active= Number(item.active)
                    let deaths= Number(item.deaths)
                    let recovered= Number(item.recovered)
                    let recoveryrate= ((recovered/cases)*100).toFixed(1)
                    let mortalityrate= ((deaths/cases)*100).toFixed(1)
                    let activeratio= (100-recoveryrate-mortalityrate).toFixed(1)
                    let obj={
                        code:code,
                        Cases:cases,
                        Deaths:deaths,
                        Recovered:recovered,
                        Active:active,
                        activeratio:activeratio,
                        recoveryrate:recoveryrate,
                        mortalityrate:mortalityrate,
                        total_tests:[],
                        cases:[],
                        dailycases:[],
                        deaths:[],
                        dailydeaths:[],
                        recovered:[],
                        dailyrecovered:[],
                        active:[]
                    }
                    states_info[key]= obj
                })
                
                list.sort((a,b) => a.localeCompare(b))
                
                this.getStatesDaily()

                this.getStatewiseTestingData()
                
                this.setState({
                    states_info:states_info,
                    Data: data_india,
                })
                console.log('Bye')
                this.setState({
                    list: list,
                    pieChartData:{
                        datasets: [{
                            data: [
                                this.state.Data.Active,
                                this.state.Data.Recovered,
                                this.state.Data.Deaths,
                            ],
                            //data: [sum.Active,sum.Recovered,sum.Deaths],
                            backgroundColor:['#42a5f5','#66bb6a','#f44336']
                        }],
                        labels: ['Active','Recovered','Deaths']
                    },
                    info:{
                        color:'#757575',
                        name:'New Cases',
                        value: this.state.Data.dailycases[this.state.Data.dailycases.length-1],
                        diff: this.state.Data.dailycases[this.state.Data.dailycases.length-1] - this.state.Data.dailycases[this.state.Data.dailycases.length-2],
                    },
                    info1:{
                        color:'#757575',
                        value: this.state.Data.Cases
                    },
                    infoCard:{
                        NewCases:this.state.Data.dailycases[this.state.Data.dailycases.length-2],
                        casesDiff:this.state.Data.dailycases[this.state.Data.dailycases.length-2] - this.state.Data.dailycases[this.state.Data.dailycases.length-3],
                        NewDeaths:this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-2],
                        deathsDiff: this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-2] - this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-3],
                        NewRecoveries: this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-2],
                        recDiff: this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-2] - this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-3],
                        Tests:this.state.Data.total_tests,
                        TodayTests:this.state.Data.today_tested,
                        casespermillion:this.state.Data.casespermillion,
                        deathspermillion:this.state.Data.deathspermillion,
                        testspermillion:this.state.Data.testspermillion,
                        TestsDiff: this.state.Data.TestsDiff
                    },
                    chartCard:{
                        confirmed: this.state.Data.Cases,
                        active: this.state.Data.Active,
                        deaths:this.state.Data.Deaths,
                        recovered:this.state.Data.Recovered,
                    },
                    activeChart:{
                        labels: dates.slice(44),
                        datasets:[
                            {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#1e88e5',
                                label:'People Currently Infected',
                                data:this.state.Data.active,
                                backgroundColor:'#e3f2fd'
                            }
                        ]
                    },
                    testsChart:{
                        labels: dates.slice(1).slice(-20),
                        datasets:[
                            {
                                fill:false,
                                pointRadius:0,
                                borderColor:'#5c6bc0',
                                label:'Individuals Tested',
                                data:tested_series.slice(1).slice(-21,-1),
                                backgroundColor:'#5c6bc0'
                            }
                        ]
                    },
                    DailyChartData:{
                        labels:dates.slice(44),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#757575',//gray border
                            label:'COVID-19 Cases',
                            data:this.state.Data.dailycases,
                            backgroundColor:'#757575'//gray bg
                          }
                        ]
                    },
                    CumulativeChartData:{
                        labels:  dates.slice(44),
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#424242',
                            label:'COVID-19 Total Cases',
                            data:this.state.Data.cases,
                            backgroundColor:'#f5f5f5'
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
                info:{
                    color:'#757575',
                    name:'New Cases',
                    value: this.state.Data.dailycases[this.state.Data.dailycases.length-1],
                    diff: this.state.Data.dailycases[this.state.Data.dailycases.length-1] - this.state.Data.dailycases[this.state.Data.dailycases.length-2],
                },
                DailyChartData:{
                    labels: dates.slice(44),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#757575',//gray border
                            label:'COVID-19 Cases',
                            data:this.state.Data.dailycases,
                            backgroundColor:'#757575'//gray bg
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                val1:'New Deaths',
                Name1:'Deaths',
                info:{
                    color:'#ff5722',
                    name:'New Deaths',
                    value: this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-1],
                    diff: this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-1] - this.state.Data.dailydeaths[this.state.Data.dailydeaths.length-2],
                },
                DailyChartData:{
                    labels: dates.slice(44),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#ff5722',
                            label:'COVID-19: Deaths',
                            data: this.state.Data.dailydeaths,
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
                info:{
                    color:'#7cb342',
                    name:'Recoveries',
                    value: this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-1],
                    diff: this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-1] - this.state.Data.dailyrecovered[this.state.Data.dailyrecovered.length-2],
                },
                DailyChartData:{
                    labels:dates.slice(44),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#7cb342',
                            label:'COVID-19: Recovered',
                            data: this.state.Data.dailyrecovered,
                            backgroundColor:'#7cb342'
                          }
                        ]
                }
            })
        }
    }

    checkIncrement(item){
        if(item > 0){
            return (
                <span className='ml-1'>
                <i class="fas fa-arrow-up"></i><span className='ml-1'>{format(item)}</span>
            </span>
            ) 
        }
        else{
            return( <span className='ml-1'>
              <i class="fas fa-arrow-down"></i><span className='ml-1'>{format(item*-1)}</span>
            </span> )
        }
    }

    changeVariable(item){
        if(item.id===1){
            this.setState({
                Name2:'Cases',
                val2:'Cases',
                info1:{
                    color:'#757575',
                    value: this.state.Data.Cases
                },
                CumulativeChartData:{
                    labels: dates.slice(44),
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#424242',
                            label:'COVID-19 Total Cases',
                            data:this.state.Data.cases,
                            backgroundColor:'#f5f5f5'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                Name2:'Deaths',
                val2:'Deaths',
                info1:{
                    color:'#ff5722',
                    value: this.state.Data.Deaths
                },
                CumulativeChartData:{
                    labels: dates.slice(44),
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#ff5722',
                            label:'COVID-19: Total Deaths',
                            data: this.state.Data.deaths,
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
                info1:{
                    color:'#7cb342',
                    value: this.state.Data.Recovered
                },
                CumulativeChartData:{
                    labels: dates.slice(44),
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#7cb342',
                            label:'COVID-19: Total Recovered',
                            data:this.state.Data.recovered,
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
                                    <h5 className='text-center text-muted' style={{fontWeight:'700'}}>IMPORTANT TRENDS <i class="fas fa-chart-line"></i></h5>
                                    <hr></hr>
                                </div>

                            <div className='col-sm-12 col-md-6 mt-3 mb-3'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='heading col-12 mb-3 mt-2'>
                                        <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 {this.state.Selected}: {this.state.val2} Over Time</h6>
                                    </div>

                                    <div className='col-xl-7 col-lg-8 mb-1'>
                                               <div className='card'>
                                                   <div className='card-body'>
                                                   <div className='row'>
                                                    <div className='col-12 d-flex justify-content-start'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>Cumulative Total: </small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:this.state.info1.color}}>{format(this.state.info1.value)}</small>
                                                    </div>
                                                </div>
                                                   </div>
                                               </div>
                                            </div>

                                    <div className='col-12 mt-3'>
                            <ul class="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                            {this.state.links.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link active' key={item.id} data-toggle="tab" href="#" onClick={this.changeVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                                {this.state.links.slice(1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link' key={item.id} data-toggle="tab" href="#" onClick={this.changeVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>   
                        </div>



                        <div className='chart col-12 mt-3'>
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
                                    </div>
                        </div>
                                
                                  
                                </div>
                            </div>
                        </div>



                                <div className='col-sm-12 col-md-6 mt-3 mb-3'>
                                    <div className='card h-100'>
                            
                                        <div className='card-body'>
                                        <div className='row'>
                                            <div className='heading col-12 mb-3 mt-2'>
                                                <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 {this.state.Selected}: {this.state.val1} Over Time</h6>
                                            </div>

                                            <div className='col-xl-7 col-lg-8 mb-1'>
                                               <div className='card'>
                                                   <div className='card-body'>
                                                   <div className='row'>
                                                    <div className='col-lg-12 d-flex justify-content-start'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>{this.state.info.name}</small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:this.state.info.color}}>{format(this.state.info.value)}</small>
                                                    </div>
                                                    <div className='col-lg-12 d-flex justify-content-start'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>Change From Yesterday</small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:this.state.info.color}}>{this.checkIncrement(this.state.info.diff)}</small>
                                                    </div>
                                                </div>
                                                   </div>
                                               </div>
                                            </div>

                                            <div className='col-12'>
                            <ul class="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                            {this.state.links.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link active' key={item.id} data-toggle="tab" href="#" onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                                {this.state.links.slice(1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link' key={item.id} data-toggle="tab" href="#" onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>   
                        </div>
                        
                        <div className='chart col-12 mt-3'>
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
                                       
                                    </div>
                                    </div>
                                        </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-12 col-md-6 mt-3 mb-3'>
                                    <div className='card h-100'>
                            
                                        <div className='card-body'>
                                        <div className='row'>
                                            <div className='heading col-12 mb-3 mt-2'>
                                                <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 {this.state.Selected}: Active Cases Over Time</h6>
                                            </div>

                                            <div className='col-xl-7 col-lg-8 mb-3'>
                                               <div className='card'>
                                                   <div className='card-body'>
                                                   <div className='row'>
                                                    <div className='col-12 d-flex justify-content-start align-items-center mb-1'>                               
                                                            <small className='text-muted'  style={{fontWeight:'600'}}>Cumulative Total: </small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:'#1e88e5'}}>{format(this.state.Data.Active)}</small>
                                                    </div>
                                                </div>
                                                   </div>
                                               </div>
                                            </div>
                        
                        <div className='chart col-12 mt-3'>
                        <div id='chart' className='chart-container'>
                             <Line
                                    data={this.state.activeChart}
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
                                       
                                    </div>
                                    </div>
                                        </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-12 col-md-6 mt-3 mb-3'>
                                    <div className='card h-100'>
                            
                                        <div className='card-body'>
                                        <div className='row'>
                                            <div className='heading col-12 mb-3 mt-2'>
                                                <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 India: Trend in Testing</h6>
                                            </div>

                                            <div className='col-xl-7 col-lg-8 mb-3'>
                                              <div className='card'>
                                                  <div className='card-body'>
                                                  <div className='row'>
                                                    <div className='col-12 d-flex justify-content-start align-items-center'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>Individuals Tested Today: </small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:'#7986cb'}}>{format(this.state.infoCard.TodayTests)}</small>
                                                    </div>
                                                    <div className='col-12 d-flex justify-content-start align-items-center'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>Change From Yesterday: </small>
                                                            <small className='ml-2' style={{fontWeight:'700',color:'#7986cb'}}>{this.checkIncrement(this.state.infoCard.TestsDiff)}</small>
                                                    </div>
                                                    <div className='col-12 d-flex justify-content-start align-items-center'>                               
                                                            <small className='text-muted' style={{fontWeight:'600'}}>Cumulative Total</small>
                                                            <small className='ml-3' style={{fontWeight:'700',color:'#7986cb'}}>{format(this.state.infoCard.Tests)}</small>
                                                    </div>
                                                </div>
                                                  </div>
                                              </div>
                                            </div>

                        <div className='chart col-12 mt-3'>
                        <div id='chart' className='chart-container'>
                             <Bar
                                    data={this.state.testsChart}
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