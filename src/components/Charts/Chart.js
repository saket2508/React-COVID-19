import React, {Component, Fragment} from "react"
import {Bar, Line} from 'react-chartjs-3';
import Stats from './Stats'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

const url='https://pomber.github.io/covid19/timeseries.json'

const rawdata={}
const rawdatadaily={}
const list=[]

const dates=[]
const casesdata=[]
const recoveredata=[]
const deathsdata=[]
const activedata=[]

const dailycases=[]
const dailydeaths=[]
const dailyrecovered=[]

const useStyles = makeStyles({
    height:10,
    option: {
        fontSize: 15,
        '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  });

function Menu(props){
    const classes= useStyles();

    return(
        <Autocomplete
        id="country-select-demo"
        style={{ width: 300 }}
        options={props.list}
        onChange={props.onChange}
        classes={{
          option: classes.option,
        }} autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(option) => (
          <React.Fragment>
            <span>{option}</span>
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    )
}


class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
            Data:[],
            Selected:"",
            val1:'New Cases',
            val2:'Cases',
            Name1:'Cases',
            Name2:'Cases',
            rawData:{},
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
        this.onChange = this.onChange.bind(this);
    }

    onChange = (event, value) => {
        if(value===null  || value==='' || value==='Worldwide'){
            this.setState({
                Selected:'Worldwide',
                CumulativeChartData:{
                    labels: dates,
                    datasets:[
                      {
                        fill:true,
                        pointRadius:0,
                        borderColor:'#1e88e5',
                        label:'COVID-19 Total Cases',
                        data: this.state.Data.cases,
                        backgroundColor:'#e3f2fd'
                      }
                    ]
                }
            })
        }
        else{
            this.setState({
                Selected: value,
                CumulativeChartData:{
                  labels: dates,
                  datasets:[
                    {
                      fill:true,
                      pointRadius:0,
                      borderColor:'#1e88e5',
                      label:'COVID-19 Total Cases',
                      data: rawdata[value].cases,
                      backgroundColor:'#e3f2fd'
                    }
                  ]
                },
                DailyChartData:{
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            //borderColor:'#9e9e9e',//gray border
                            label:'COVID-19: Cases',
                            data: rawdata[value].newcases,
                            backgroundColor:'#1e88e5'//gray bg
                          }
                        ]
                },
              }, () => {
                // This will output an array of objects
                // given by Autocompelte options property.
                //console.log(this.state.Selected);
              });
        }
      }

    componentDidMount(){
       this.getChartData()
    }
        

    getChartData(){
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

            for(let i=0;i<casesdata.length-1;i++){
                let newcases= casesdata[i+1]-casesdata[i]
                dailycases.push(newcases)
                let newdeaths= deathsdata[i+1]-deathsdata[i]
                dailydeaths.push(newdeaths)
                let newrecoveries= recoveredata[i+1]-recoveredata[i]
                dailyrecovered.push(newrecoveries)
            }
            const worldwide={cases:casesdata,deaths:deathsdata,recovered:recoveredata,newcases:dailycases,newdeaths:dailydeaths,newrecoveries:dailyrecovered}
            for(let key in response){
                let list1=[]
                let list2=[]
                let list3=[]
                let list4=[]
                let list5=[]
                let list6=[]
                list.push(key)
                response[key].map((item) => {
                    list1.push(Number(item.confirmed))                   
                    list2.push(Number(item.deaths))                   
                    list3.push(Number(item.recovered))                   
                })
                for(let i=0;i<list1.length-1;i++){
                    let newcases= list1[i+1]-list1[i]
                    list4.push(newcases)
                    let newdeaths= list2[i+1]-list2[i]
                    list5.push(newdeaths)
                    let newrecoveries= list3[i+1]-list3[i]
                    list6.push(newrecoveries)
                }
                let obj={cases:list1, deaths:list2, recovered:list3, newcases: list4, newdeaths: list5, newrecoveries:list6}
                rawdata[key]= obj
            }

            this.setState(
                {
                    Data:worldwide,
                    rawData:rawdata,
                    list:list,
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                //borderColor:'#9e9e9e',//gray border
                                label:'COVID-19: Cases',
                                data: dailycases,
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
                                data: casesdata,
                                backgroundColor:'#e3f2fd'
                              }
                            ]
                    }
                }
            )
        })
    }



    changeDailyVariable(item){
        if(item.id===1){
            
            this.setState({
                val1:'New Cases',
                Name1:'Cases',
                DailyChartData:{
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#1e88e5',//gray border
                            label:'COVID-19: Cases',
                            data: dailycases,
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
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#ff5722',
                            label:'COVID-19: Deaths',
                            data: dailydeaths,
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
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#7cb342',
                            label:'COVID-19: Recovered',
                            data: dailyrecovered,
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
                val2:'Cases',
                Name2:'Cases',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#1e88e5',
                                label:'COVID-19 Total Cases',
                                data: casesdata,
                                backgroundColor:'#e3f2fd'
                          }
                        ]
                }
            })
        }
        if(item.id===2){
            this.setState({
                val2:'Deaths',
                Name2:'Deaths',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#ff5722',
                            label:'COVID-19: Total Deaths',
                            data: deathsdata,
                            backgroundColor:'#fbe9e7'
                          }
                        ]
                }
            })
        }

        if(item.id===3){
            this.setState({
                val2:'Recoveries',
                Name2:'Recovered',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#7cb342',
                            label:'COVID-19: Total Recovered',
                            data: recoveredata,
                            backgroundColor:'#f1f8e9'
                          }
                        ]
                }
            })
        }

        if(item.id===4){
            this.setState({
                val2:'Active Cases',
                Name2:'Active Cases',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#546e7a',
                            label:'COVID-19: Active Cases',
                            data: activedata,
                            backgroundColor:'#eceff1'
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
              <div className='chart mb-4 mt-4'>
                   <div className='container-md content-row'>
                    <div className='row my-5'>
                        <div className='col-12 mb-4'>
                            <h5 className='text-center text-muted' style={{fontWeight:'600'}}>SPECIAL TRENDS <i class="fas fa-chart-line"></i></h5>
                            <hr></hr>
                        </div>
                     
                           <div className='col-12 mt-3 mb-3'>
                            <div className='card'>
                        <div className='card-body'>
                            <h6 className='text-center text-muted' style={{fontWeight:'600'}}>COVID-19 {this.state.Selected}: {this.state.val2} Over Time</h6>
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
                        <div className='col-12 mt-3 mb-3'>
                            <div className='card'>
                        <div className='card-body'>
                            <h6 className='text-center text-muted' style={{fontWeight:'600'}}>COVID-19: {this.state.val1} Over Time</h6>
                            <hr></hr>
                        </div>
                        <div className='card-body'>
                            <div id='chart' className="chart-container">
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
          )
        return(
            <Fragment>
                {element}
                <Stats flagData= {this.props.flagData}/>
            </Fragment>
        )
      }
}

export default Chart
