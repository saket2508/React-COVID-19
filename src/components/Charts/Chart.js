import React, {Component, Fragment} from "react"
import {Bar, Line, Doughnut} from 'react-chartjs-3';
import Stats from './Stats'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { colors, Container } from "@material-ui/core";

const url='https://pomber.github.io/covid19/timeseries.json'
const url1= 'https://corona.lmao.ninja/v2/countries?sort=cases'
const url2='https://api.covid19india.org/data.json'

const countries_data={}
const sum={}

const rawdata={}
const worldwide={}

const list=[]

const dates=[]
const casesdata=[]
const recoveredata=[]
const deathsdata=[]
const activedata=[]

const dailycases=[]
const dailydeaths=[]
const dailyrecovered=[]


function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}

class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
            Data:{},//for bar and line chart
            India:{},
            pieChartData2:{},
            chartCard2:{},
            Total:{},
            countries:{},
            chartCard:{
                confirmed:0,
                active:0,
                recovered:0,
                deaths:0,
            },
            infoCard:{
                NewCases:0,
                casesDiff:0,
                NewDeaths:0,
                deathsDiff:0,
                CasesPerMillion:0,
                DeathsPerMillion:0
            },
            Selected:"Global",
            val1:'New Cases',
            val2:'Cases',
            Name1:'Cases',
            Name2:'Cases',
            rawData:{},
            CumulativeChartData: {},
            pieChartData:{},
            DonutChartData:{},
            DailyChartData:{},
            AreaChart:{},
            links:[
                {
                    id:1,
                    name:'Cases',
                    color:'secondary',
                },
                {
                    id:2,
                    name:'Deaths',
                    color:'',
                },
                {
                    id:3,
                    name:'Recovered',
                    color:'',
                },
            ]
        }
        
    }


    componentDidMount(){
        //const res= await this.getChartData()
        //const res2= await this.getIndiaData()
        this.getInfo()
    }

    async getInfo(){
        const res= await fetch(url);
        res.json()
        .then(response =>{
            console.log('Hi')
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
                //date formatting
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
                casesdata.push(cases)
                deathsdata.push(deaths)
                recoveredata.push(recovered)
                activedata.push(active)
                //worldwide cumulative data for charts
            }

            for(let i=0;i<casesdata.length-1;i++){
                let newcases= casesdata[i+1]-casesdata[i]
                dailycases.push(newcases)
                let newdeaths= deathsdata[i+1]-deathsdata[i]
                dailydeaths.push(newdeaths)
                let newrecoveries= recoveredata[i+1]-recoveredata[i]
                dailyrecovered.push(newrecoveries)
            }
            worldwide.cases=casesdata
            worldwide.deaths=deathsdata
            worldwide.recovered=recoveredata
            worldwide.active=activedata
            worldwide.newcases=dailycases
            worldwide.newdeaths=dailydeaths
            worldwide.newrecoveries=dailyrecovered
            //worldwide.Casespermillion= (((casesdata.slice(-1)[0])/7590000000)*1000000).toFixed(0)
            //worldwide.Deathspermillion= (((deathsdata.slice(-1)[0])/7590000000)*1000000).toFixed(0)
            worldwide.Tests= 'N/A'
            worldwide.TestsPerMillion= 'N/A'
            //object that has worldwide stats

            for(let key in response){
                let list1=[]
                let list2=[]
                let list3=[]
                let list4=[]
                let list5=[]
                let list6=[]
                let list7=[]
            let country= key
            if(country==='US'){
                country= 'United States'
                }
                if(country==='Korea, South'){
                country= 'South Korea'
                }
                list.push(country)
                response[key].map((item) => {
                    list1.push(Number(item.confirmed))                   
                    list2.push(Number(item.deaths))                   
                    list3.push(Number(item.recovered))                   
                    list7.push(Number(item.confirmed) - Number(item.deaths) - Number(item.recovered))                   
                })
                for(let i=0;i<list1.length-1;i++){
                    let a= list1[i+1]-list1[i]
                    list4.push(a)
                    let b= list2[i+1]-list2[i]
                    list5.push(b)
                    let c= list3[i+1]-list3[i]
                    list6.push(c)
                }
                let obj={cases:list1, 
                    deaths:list2, 
                    recovered:list3, 
                    active:list7, 
                    newcases: list4, 
                    newdeaths: list5, 
                    newrecoveries:list6}
                rawdata[country]= obj
                //chart data: Cumulative And Daily for all countries
            }

        this.setState(
            {
                //Total:sum,
                Data:worldwide,
                countries: countries_data,
            
            }
        )
    })

        const response= await fetch(url1);
        response.json()
        .then(response => {
            console.log('Hello')
            let cases_sum=0
            let deaths_sum=0
            let recovered_sum=0

            response.map((item) => {
                let key= item.country
                if(key==='USA'){
                    key= 'United States'
                }
                if(key==='UK'){
                    key= 'United Kingdom'
                }
                if(key=='S. Korea'){
                    key= 'South Korea'
                }
                let Cases= item.cases
                cases_sum+= Cases

                let Deaths= item.deaths
                deaths_sum+= Deaths

                let Recovered= item.recovered
                recovered_sum+= Recovered

                let Active= item.active

                let Tests= item.tests
                let Testspermillion= item.testsPerOneMillion
                let Casespermillion= item.casesPerOneMillion
                let Deathspermillion= item.deathsPerOneMillion
                let code= item.countryInfo.iso2
                let obj= {
                Code:code,
                Cases:Cases,
                Deaths:Deaths,
                Recovered:Recovered,
                Active:Active,
                Tests:Tests,
                Testspermillion:Testspermillion,
                Casespermillion:Casespermillion,
                Deathspermillion:Deathspermillion
                }
                countries_data[key]=obj
            })
            worldwide.cases_sum= cases_sum
            worldwide.deaths_sum= deaths_sum
            worldwide.recovered_sum= recovered_sum
            worldwide.active_sum= cases_sum-recovered_sum-deaths_sum
            worldwide.Casespermillion= (((cases_sum)/7600000000)*1000000).toFixed(0)
            worldwide.Deathspermillion= (((deaths_sum)/7600000000)*1000000).toFixed(0)

            this.setState(
                {
                    //Selected:'',
                    Data:worldwide,
                    //rawData:rawdata,
                    list:list,
                    //Confirmed:this.state.Data.cases[-1],
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                //borderColor:'#9e9e9e',//gray border
                                label:'COVID-19: Cases',
                                data: this.state.Data.newcases,
                                backgroundColor:'#757575'//gray bg
                              }
                            ]
                    },
                    chartCard:{
                        confirmed:this.state.Data.cases_sum,
                        active:this.state.Data.active_sum,
                        deaths:this.state.Data.deaths_sum,
                        recovered:this.state.Data.recovered_sum
                        //confirmed:sum.Cases,
                        //active:sum.Active,
                        //deaths: sum.Deaths,
                        //recovered: sum.Recovered
                    },
                    pieChartData:{
                        datasets: [{
                            data: [this.state.Data.active_sum,this.state.Data.recovered_sum,this.state.Data.deaths_sum],
                            //data: [sum.Active,sum.Recovered,sum.Deaths],
                            backgroundColor:['#1e88e5','#7cb342','#ff5722']
                        }],
                        labels: ['Active','Recovered','Deaths']
                    },
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#424242',
                                label:'COVID-19 Total Cases',
                                data: this.state.Data.cases,
                                backgroundColor:'#f5f5f5'
                              }
                            ]
                    }
                }
            )
        })

        const res2= await fetch(url2)
        res2.json()
        .then(response => {
            console.log('How are you?')
            const rawDataIndia= response["statewise"][0]
            let active= Number(rawDataIndia['active'])
            let confirmed= Number(rawDataIndia['confirmed'])
            let recovered= Number(rawDataIndia['recovered'])
            let deaths= Number(rawDataIndia['deaths'])

            this.setState({
                India:{
                    confirmed: confirmed,
                    active:active,
                    deaths:deaths,
                    recovered:recovered
                },
                pieChartData2:{
                    datasets: [{
                        data: [active,recovered,deaths],
                        backgroundColor:['#1e88e5','#7cb342','#ff5722']
                    }],
                    labels: ['Active','Recovered','Deaths']
                },
                chartCard2:{
                    confirmed:confirmed,
                    active:active,
                    deaths:deaths,
                    recovered:recovered
                }
            })
        })
    }

    async getIndiaData(){
        const res= await fetch(url2)
            res.json()
            .then(response => {
                console.log('How are you?')
                const rawDataIndia= response["statewise"][0]
                let active= Number(rawDataIndia['active'])
                let confirmed= Number(rawDataIndia['confirmed'])
                let recovered= Number(rawDataIndia['recovered'])
                let deaths= Number(rawDataIndia['deaths'])

                this.setState({
                    India:{
                        confirmed: confirmed,
                        active:active,
                        deaths:deaths,
                        recovered:recovered
                    },
                    pieChartData2:{
                        datasets: [{
                            data: [active,recovered,deaths],
                            backgroundColor:['#1e88e5','#7cb342','#ff5722']
                        }],
                        labels: ['Active','Recovered','Deaths']
                    },
                    chartCard2:{
                        confirmed:confirmed,
                        active:active,
                        deaths:deaths,
                        recovered:recovered
                    }
                })
            })
    }
        

    async getChartData(){
        const res= await fetch(url);
            res.json()
            .then(response =>{
                console.log('Hi')
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
                    //date formatting
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
                    casesdata.push(cases)
                    deathsdata.push(deaths)
                    recoveredata.push(recovered)
                    activedata.push(active)
                    //worldwide cumulative data for charts
                }

                for(let i=0;i<casesdata.length-1;i++){
                    let newcases= casesdata[i+1]-casesdata[i]
                    dailycases.push(newcases)
                    let newdeaths= deathsdata[i+1]-deathsdata[i]
                    dailydeaths.push(newdeaths)
                    let newrecoveries= recoveredata[i+1]-recoveredata[i]
                    dailyrecovered.push(newrecoveries)
                }
                worldwide.cases=casesdata
                worldwide.deaths=deathsdata
                worldwide.recovered=recoveredata
                worldwide.active=activedata
                worldwide.newcases=dailycases
                worldwide.newdeaths=dailydeaths
                worldwide.newrecoveries=dailyrecovered
                //worldwide.Casespermillion= (((casesdata.slice(-1)[0])/7590000000)*1000000).toFixed(0)
                //worldwide.Deathspermillion= (((deathsdata.slice(-1)[0])/7590000000)*1000000).toFixed(0)
                worldwide.Tests= 'N/A'
                worldwide.TestsPerMillion= 'N/A'
                //object that has worldwide stats

                for(let key in response){
                    let list1=[]
                    let list2=[]
                    let list3=[]
                    let list4=[]
                    let list5=[]
                    let list6=[]
                    let list7=[]
                let country= key
                if(country==='US'){
                    country= 'United States'
                    }
                    if(country==='Korea, South'){
                    country= 'South Korea'
                    }
                    list.push(country)
                    response[key].map((item) => {
                        list1.push(Number(item.confirmed))                   
                        list2.push(Number(item.deaths))                   
                        list3.push(Number(item.recovered))                   
                        list7.push(Number(item.confirmed) - Number(item.deaths) - Number(item.recovered))                   
                    })
                    for(let i=0;i<list1.length-1;i++){
                        let a= list1[i+1]-list1[i]
                        list4.push(a)
                        let b= list2[i+1]-list2[i]
                        list5.push(b)
                        let c= list3[i+1]-list3[i]
                        list6.push(c)
                    }
                    let obj={cases:list1, 
                        deaths:list2, 
                        recovered:list3, 
                        active:list7, 
                        newcases: list4, 
                        newdeaths: list5, 
                        newrecoveries:list6}
                    rawdata[country]= obj
                    //chart data: Cumulative And Daily for all countries
                }

            this.setState(
                {
                    //Total:sum,
                    Data:worldwide,
                    countries: countries_data,
                
                }
            )
        })
    }



    changeDailyVariable(item){
        if(item.id===1){
            //item.selected= 'active'   
            this.setState({
                val1:'New Cases',
                Name1:'Cases',
                DailyChartData:{
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#757575',//gray border
                            label:'COVID-19: Cases',
                            data: this.state.Data.newcases,
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
                DailyChartData:{
                    labels: dates.slice(1),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#ff5722',
                            label:'COVID-19: Deaths',
                            data: this.state.Data.newdeaths,
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
                            data: this.state.Data.newrecoveries,
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
                                borderColor:'#424242',
                                label:'COVID-19 Total Cases',
                                data: this.state.Data.cases,
                                backgroundColor:'#f5f5f5'
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
                            data: this.state.Data.deaths,
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
                            data: this.state.Data.recovered,
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
                            data: this.state.Data.active,
                            backgroundColor:'#eceff1'
                          }
                        ]
                }
            })
        }
    }

    checkValues(item){
        if(item === 'N/A'){
           return( <span>
                N/A
            </span>
           )
        }
        else{
            return(
                <span>
                {format(item)}
            </span>
            )
        }
    }

    checkIncrement(item){
        if(item > 0){
            return (
                <span className='ml-1'>
                <small><i class="fas fa-arrow-up"></i><span className='ml-1'>{format(item)}</span></small>
            </span>
            ) 
        }
        else{
            return( <span className='ml-1'>
               <small> <i class="fas fa-arrow-down"></i><span className='ml-1'>{format(item*-1)}</span></small>
            </span> )
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }


      render(){
          //this.loadData(this.props)
          const element=(
              <Fragment>
              <div className='chart mb-4 mt-4'>
                   <div className='container-md content-row'>
                    <div className='row my-5'>
                        <div className='col-12 mb-2'>
                            <h5 className='text-center text-muted' style={{fontWeight:'700'}}>IMPORTANT TRENDS <i class="fas fa-chart-line"></i></h5>
                            <hr></hr>
                        </div>

                        <div className='col-lg-6 col-sm-12 mt-3 mb-4'>
                            <div className='card h-100'>
                                <div className='card-body'> 
                                <div className='row mb-3'>
                                    <div className='col-12 mb-2'>
                                        <h6 className='text-muted' style={{fontWeight:'700'}}>Coronavirus Cases- {this.state.Selected}</h6>
                                        <hr></hr>
                                    </div>
                                    <div className='col-lg-5 col-md-12 mb-2'>
                                        <small className='mb-2' style={{fontWeight:'600'}}>Total Coronavirus Cases</small>
                                        <h3 style={{fontWeight:'600',color:'#616161'}}>{format(this.state.chartCard.confirmed)}</h3>
                                    </div>
                                    <div className='col-lg-7 col-sm-12 mb-3'>
                                    <div className='chart flex-fill'>
                                    <Doughnut
                                        data={this.state.pieChartData}
                                        options={{
                                            legend:{
                                                display:false,
                                                position:"bottom",
                                                labels:{
                                                    fontFamily:  "'Noto Sans JP', sans-serif",
                                                    fontColor:'#000'
                                                },
                                                onClick: (e) => e.stopPropagation()
                                            }
                                        }}
                                    />
                                    </div>
                                </div>
                                </div>    
                                <div className='row'>
                                <div className='col-12'>
                                    <ul className="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-1'></div>
                                                <h6 style={{fontWeight:'600'}}>Active</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.active)} [{((this.state.chartCard.active/this.state.chartCard.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'600'}}>Recovered</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.recovered)} [{((this.state.chartCard.recovered/this.state.chartCard.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'600'}}>Deaths</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.deaths)} [{((this.state.chartCard.deaths/this.state.chartCard.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>                                      
                                    </ul>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-sm-12 mt-3 mb-4'>
                            <div className='card h-100'>
                                <div className='card-body'>     
                                <div className='row mb-3'>
                                <div className='col-12 mb-2'>
                                        <h6 className='text-muted' style={{fontWeight:'700'}}>Coronavirus Cases- India</h6>
                                        <hr></hr>
                                    </div>
                                    <div className='col-lg-5 col-md-12 mb-2'>
                                        <small className='mb-2' style={{fontWeight:'600'}}>Total Coronavirus Cases</small>
                                        <h3 style={{fontWeight:'600',color:'#616161'}}>{format(this.state.chartCard2.confirmed)}</h3>
                                    </div>
                                    <div className='col-lg-7 col-sm-12 mb-3'>
                                    <div className='chart flex-fill'>
                                    <Doughnut
                                        data={this.state.pieChartData2}
                                        options={{
                                            legend:{
                                                display:false,
                                                position:"bottom",
                                                labels:{
                                                    fontFamily:  "'Noto Sans JP', sans-serif",
                                                    fontColor:'#000'
                                                },
                                                onClick: (e) => e.stopPropagation()
                                            }
                                        }}
                                    />
                                    </div>
                                </div>
                                </div>
                                <div className='row'>
                                <div className='col-12'>
                                    <ul className="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-1'></div>
                                                <h6 style={{fontWeight:'600'}}>Active</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.active)} [{((this.state.chartCard2.active/this.state.chartCard2.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'600'}}>Recovered</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.recovered)} [{((this.state.chartCard2.recovered/this.state.chartCard2.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'600'}}>Deaths</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.deaths)} [{((this.state.chartCard2.deaths/this.state.chartCard2.confirmed)*100).toFixed(1)} %]</h6>
                                            </div>
                                        </li>                                      
                                    </ul>
                                    </div>
                                </div>
                                </div>
                               
                                </div>
                            </div>

                           <div className='col-lg-6 col-md-12 mt-4 mb-3'>
                            <div className='card'>
            
                        <div className='card-body'>
                            <div className='row'>
                            <div className='heading col-12 mb-1 mt-3'>
                                <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 {this.state.Selected}: {this.state.val2} Over Time</h6>
                            </div>
                            <div className='col-12 mt-2'>
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

                        <div className='col-lg-6 col-md-12 mt-4 mb-3'>
                        <div className='card'>
                        <div className='card-body'>
                        <div className='row'>
                        <div className='col-12 mb-1 mt-3'>
                            <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 {this.state.Selected}: {this.state.val1} Over Time</h6>
                        </div>
                        <div className='col-12 mt-2'>
                        <ul class="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                        {this.state.links.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a class="nav-link active" key={item.id} data-toggle="tab" href="#" onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                                {this.state.links.slice(1).map(item => (
                                    <li className='nav-item'>
                                        <a class="nav-link" key={item.id} data-toggle="tab" href="#" onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>   
                        </div>
                        <div className='col-12 mt-3'>
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
        return(
            <Fragment>
                {element}
                <Stats flagData= {this.props.flagData}/>
            </Fragment>
        )
      }
}

export default Chart
