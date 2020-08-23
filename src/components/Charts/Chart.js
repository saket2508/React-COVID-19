import React, {Component, Fragment} from "react"
import {Bar, Line, Doughnut} from 'react-chartjs-3';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

const url='https://pomber.github.io/covid19/timeseries.json'
const url1= 'https://corona.lmao.ninja/v2/countries?sort=cases'
const url2='https://api.covid19india.org/data.json'

const countries_data={}//this will store pie-chart data of all countries+world_total
const rawdata_ts={}//this will store time-series data of all countries+world_total
//stores world data
const countries=[]//stores names of all countries

const dates=[]

function header(item,code){
    if(item==="World"){
        return <h6 className='text-muted' style={{fontWeight:'600'}}>COVID-19 Pandemic- World</h6>
    }
    else{
        return <h6 className='text-muted' style={{fontWeight:'600'}}>COVID-19 Pandemic in {item}<span className='ml-2 mb-1'><img id="rounded-img" src={"https://disease.sh/assets/img/flags/"+code.toLowerCase()+".png"} alt='flag-icon'></img></span></h6>
    }
}

function checkOption(item){
    if(item==="India"){
        return <option value="India" selected>India</option>
    }
    else{
        return <option value={item}>{item}</option>
    }
}



function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}

function SearchMenu({list,changeCountry}){
    return(
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Autocomplete
          id="combo-box-demo"
          options={list}
          getOptionLabel={(option) => option}
          onChange= {changeCountry}
          style={{width: 250}}
          renderInput={(params) => <TextField className="inputRounded" {...params} label="Search..." variant="outlined" />}
        />
        </Grid>
      </Grid>
    )
  }

class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedDate1:'Beginning', 
            selectedDate2:'Beginning', 
            date1:[
                {
                    id:1,
                    name: 'Beginnning'
                },
                {
                    id:2,
                    name:'1 Month'
                },
                {
                    id:3,
                    name: '2 Weeks'
                },
            ],
            date2:[
                {
                    id:1,
                    name: 'Beginnning'
                },
                {
                    id:2,
                    name:'1 Month'
                },
                {
                    id:3,
                    name: '2 Weeks'
                },
            ],
            rawdata_ts:{},
            countries_data:{},
            worldwide:{},
            Data:{},//for bar and line chart
            casesBar:[],
            deathsBar:[],
            pieChartData2:{},
            chartCard2:{
                confirmed:0,
                active:0,
                recovered:0,
                deaths:0,
            },//contains data for India pie chart
            countries:[],//contains data of all countries
            chartCard:{
                code:"",
                confirmed:0,
                active:0,
                recovered:0,
                deaths:0,
            },//contains data for World pie chart
            Selected:"India",//selected country :(
            val1:'New Cases',
            val2:'Cases',
            Name1:'Cases',
            Name2:'Cases',            
            CumulativeChartData: {},
            pieChartData:{},
            DailyChartData:{},
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
                    name:'Active',
                    color:'',
                },
            ]
        }
        
    }


    componentDidMount(){
        this.getInfo()
    }

    async getInfo(){
        let [response1, response2]= await Promise.all([
            fetch(url),
            fetch(url1),
        ]);//countries time-series data

        let response= await response1.json()
        console.log('Hi')
        //datetime instances are stored in a list
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
            if(month==='6'){
                m='June'
            }
            if(month==='7'){
                m='July'
            }
            if(month==='7'){
                m='July'
            }
            if(month==='8'){
                m='August'
            }
            if(month==='9'){
                m='September'
            }
            if(month==10){
                m='October'
            }
            if(month==11){
                m='November'
            }
            if(month==12){
                m='December'
            }
            let date =m+ ' '+d
            dates.push(date)
        })

        let world_casesday=[]
        let world_newcaseday=[]
        //couldnt think of better variable names :(

        for(let i=0;i<dates.length;i++){
            let cases_day=0
            for(let key in response){
               cases_day+= response[key][i]["confirmed"]
            }
            world_casesday.push(cases_day)
        }

        for(let i=0;i<world_casesday.length-1;i++){
            let newcases_world= world_casesday[i+1]-world_casesday[i]
            world_newcaseday.push(newcases_world)
        }

        //console.log(world_casesday)
        let worldwide_last_seven_days_data= world_newcaseday.slice(-7)
        let weekly_change= worldwide_last_seven_days_data[6]- worldwide_last_seven_days_data[0]
        let change= ((weekly_change/worldwide_last_seven_days_data[0])*100)/7
        console.log(change)




        //time-series data for every country is stored
        for(let key in response){
            let country_casesdata=[]
            let country_active_data=[]
            let country_newcasesdata=[]
            let country_deathsdata=[]
            let country_newdeathsdata=[]
            response[key].map((item) => {
                let country_cases= item["confirmed"]
                let country_deaths= item["deaths"]
                let country_recovered= item["recovered"]
                let country_active= country_cases- country_deaths- country_recovered
                country_casesdata.push(country_cases)
                country_active_data.push(country_active)
                country_deathsdata.push(country_deaths)
            })
            
            for(let i=0;i<country_casesdata.length-1;i++){
                let country_newcases= country_casesdata[i+1]-country_casesdata[i]
                country_newcasesdata.push(country_newcases)
                let country_newdeaths= country_deathsdata[i+1]-country_deathsdata[i]
                country_newdeathsdata.push(country_newdeaths)
            }
            let name= key
            if(name==="US"){
                name="USA"
            }
            if(name==="United Kingdom"){
                name="UK"
            }
            if(name==="Korea, South"){
                name="South Korea"
            }
            if(name==="United Arab Emirates"){
                name="UAE"
            }
            if(name==="West Bank and Gaza"){
                name="Palestine"
            }   
            if(name==="Taiwan*"){
                name="Taiwan"
            }
            if(name==="Burma"){
                name="Myanmar"
            }

            //seven-day avg is computed here
            //let last_seven_days_data= country_newcasesdata.slice(-7)
            let seven_days_cumulative= country_casesdata.slice(-7)
            let country_weekly_change= seven_days_cumulative[6]-seven_days_cumulative[0]
            let country_change= ((country_weekly_change/seven_days_cumulative[0])*100)/7
            let avg_rate= country_change
            //console.log(avg_rate)
            countries.push(name)
            const country={
                cases: country_casesdata,
                deaths: country_deathsdata,
                active: country_active_data,
                newcases: country_newcasesdata,
                newdeaths: country_newdeathsdata,
                growth_rate: avg_rate.toFixed(1)
            }
            rawdata_ts[name]= country
        }

        countries.sort()
        
        //rawdata_ts['World']= worldwide

        let res2= await response2.json()

        console.log('Hello')
        let cases_sum=0
        let newcases_sum=0
        let deaths_sum=0
        let newdeaths_sum=0
        let recovered_sum=0
        let tests_sum=0

        let time= res2[0]['updated']
       
        res2.map((item) => {
            let name= item.country

            if(name==="S. Korea"){
                name= "South Korea"
            }

            if(name==="Bosnia"){
                name="Bosnia and Herzegovina"
            }

            if(name==="DRC"){
                name="Congo (Kinshasa)"
            }

            if(name==="Congo"){
                name="Congo (Brazzaville)"
            }

            let code= item.countryInfo.iso2

            let country_last_updated= item['updated']

            if(time < item['updated']){
                time= item['updated']
            }
            
            let Cases= item.cases
            cases_sum+= Cases

            let Tests= item.tests
            tests_sum+= Tests

            let Deaths= item.deaths
            deaths_sum+= Deaths

            let todayCases= item.todayCases
            newcases_sum+= todayCases

            let todayDeaths= item.todayDeaths
            newdeaths_sum+= todayDeaths


            let Recovered= item.recovered
            recovered_sum+= Recovered

            let Active= item.active

            let tests_per_hundred= item.testsPerOneMillion/10000 

            let cfr= (item.deaths/item.cases)*100

            let rr= (item.recovered/item.cases)*100

            let ar= 100-cfr-rr

            let obj_country={
                cases_data: Cases,
                lastUpdated: country_last_updated,
                code: code,
                Tests: Tests,
                TestsPerHundred: tests_per_hundred.toFixed(1),
                deaths_data: Deaths,
                recovered_data: Recovered,
                active_data:Active,
                newcases: todayCases,
                newdeaths: todayDeaths,
                cfr: cfr.toFixed(1),
                rr:rr.toFixed(1),
                ar:ar.toFixed(1)
            } 
            countries_data[name]= obj_country             
        })

        const worldwide={}
        worldwide.time= time
        worldwide.cases_data= cases_sum
        worldwide.newcases_data= newcases_sum
        worldwide.tests_data= tests_sum
        worldwide.deaths_data= deaths_sum
        worldwide.newdeaths_data= newdeaths_sum
        worldwide.recovered_data= recovered_sum
        worldwide.TestsPerHundred= ((tests_sum/7800000000)*100).toFixed(1)
        worldwide.active_data= cases_sum-recovered_sum-deaths_sum
        worldwide.cfr= ((deaths_sum/cases_sum)*100).toFixed(1)
        worldwide.rr= ((recovered_sum/cases_sum)*100).toFixed(1)
        worldwide.ar= (100- worldwide.rr- worldwide.cfr).toFixed(1)
        worldwide.growth_rate= change.toFixed(1)

        countries_data['World']= worldwide

        this.setState({    
            Data:rawdata_ts['India'],
            countries: countries,
            worldwide:worldwide,
            countries_data: countries_data,
            DailyChartData:{
                labels: dates.slice(1),
                    datasets:[
                      {
                        fill:false,
                        //borderColor:'#9e9e9e',//gray border
                        label:'COVID-19: Cases',
                        data: rawdata_ts['India'].newcases,
                        backgroundColor:'#757575'//gray bg
                      }
                    ]
            },
            chartCard:{//for world/country-data
                code:"IN",
                TestsPerHundred: countries_data["India"].TestsPerHundred,
                GrowthRate: rawdata_ts["India"].growth_rate,
                lastUpdated: countries_data["India"].lastUpdated,
                confirmed:countries_data["India"].cases_data,
                active:countries_data["India"].active_data,
                deaths:countries_data["India"].deaths_data,
                recovered:countries_data["India"].recovered_data,
                newcases: countries_data["India"].newcases,
                newdeaths: countries_data["India"].newdeaths,
                cfr: countries_data["India"].cfr,
                rr: countries_data["India"].rr,
                ar: countries_data["India"].ar
            },
            pieChartData:{
                datasets: [{
                    data: [countries_data["India"].active_data,
                    countries_data["India"].recovered_data,
                    countries_data["India"].deaths_data],
                    //data: [sum.Active,sum.Recovered,sum.Deaths],
                    backgroundColor:['#2196f3','#4caf50','#f44336']
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
                        data: rawdata_ts['India'].cases,
                        backgroundColor:'#f5f5f5'
                      }
                    ]
            },
            pieChartData2:{
                datasets: [{
                    data: [worldwide.active_data,
                        worldwide.recovered_data,
                        worldwide.deaths_data,],
                        backgroundColor:['#2196f3','#4caf50','#f44336']
                }],
                labels: ['Active','Recovered','Deaths']
            },
            chartCard2:{
                date: worldwide.time,
                confirmed:worldwide.cases_data,
                TestsPerHundred: worldwide.TestsPerHundred,
                newcases: worldwide.newcases_data,
                newdeaths: worldwide.newdeaths_data,
                active:worldwide.active_data,
                deaths:worldwide.deaths_data,
                recovered:worldwide.recovered_data,
                GrowthRate: worldwide.growth_rate,
                cfr: worldwide.cfr,
                rr: worldwide.rr,
                ar: worldwide.ar
            }
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

     
    }

    changeKey = async (event, value) =>{
      let key= value
      if(key!==null){
        if(key==="India"){
            let res= await fetch('https://pomber.github.io/covid19/timeseries.json')
            let response= await res.json()
            let india_cases_ts=[] 
            let india_newcases_ts=[] 
            let india_active_ts= []
            let india_deaths_ts=[] 
            let india_newdeaths_ts=[] 

            response['India'].map((item) => {
                let cases_in=item['confirmed']
                let deaths_in= item['deaths']
                let recovered_in= item['recovered']
                let active_in= cases_in-recovered_in-deaths_in
                india_cases_ts.push(cases_in) 
                india_deaths_ts.push(deaths_in) 
                india_active_ts.push(active_in) 
            })

            for(let i=0;i<india_cases_ts.length-1;i++){
                let newcases_in= india_cases_ts[i+1]-india_cases_ts[i]
                let newdeaths_in= india_deaths_ts[i+1]-india_deaths_ts[i]
                india_newcases_ts.push(newcases_in)
                india_newdeaths_ts.push(newdeaths_in)
            }

            let last_seven_days_data= india_newcases_ts.slice(-7)
            let seven_days_cumulative= india_cases_ts.slice(-7)
            let sum=0
            for(let i=0;i<seven_days_cumulative.length;i++){
                let growth_rate= (last_seven_days_data[i]/seven_days_cumulative[i])*100
                sum+= growth_rate
            }
            let avg_rate= sum/7

            const india_ts= {
                cases: india_cases_ts,
                deaths: india_deaths_ts,
                active: india_active_ts,
                newcases: india_newcases_ts,
                newdeaths: india_newdeaths_ts,
                growth_rate: avg_rate.toFixed(1)
            }

            this.setState({
                Selected:key,
                Data: india_ts,
                chartCard:{//for world/country-data
                    code: countries_data[key].code,
                    confirmed:countries_data[key].cases_data,
                    active:countries_data[key].active_data,
                    deaths:countries_data[key].deaths_data,
                    recovered:countries_data[key].recovered_data,
                    newcases: countries_data["India"].newcases,
                    newdeaths: countries_data["India"].newdeaths,
                    lastUpdated: countries_data["India"].lastUpdated,
                    TestsPerHundred: countries_data["India"].TestsPerHundred,
                    GrowthRate: india_ts.growth_rate,
                    cfr: countries_data["India"].cfr,
                    rr: countries_data["India"].rr,
                    ar: countries_data["India"].ar
                },    
                pieChartData:{
                    datasets: [{
                        data: [countries_data[key].active_data,
                        countries_data[key].recovered_data,
                        countries_data[key].deaths_data],
                        //data: [sum.Active,sum.Recovered,sum.Deaths],
                        backgroundColor:['#2196f3','#4caf50','#f44336']
                    }],
                    labels: ['Active','Recovered','Deaths']
                },
        
            })
            if(this.state.Name1==="Cases"){
                this.setState({
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                //borderColor:'#9e9e9e',//gray border
                                label:'COVID-19: Cases',
                                data: india_ts.newcases,
                                backgroundColor:'#757575'//gray bg
                              }
                            ]
                    },
                })
            }
            if(this.state.Name1==="Deaths"){
                this.setState({
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                borderColor:'#ff5722',
                                label:'COVID-19: Deaths',
                                data: india_ts.newdeaths,
                                backgroundColor:'#ff5722'
                              }
                            ]
                    },
                })
            }
            if(this.state.Name2==="Cases"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                    fill:true,
                                    pointRadius:0,
                                    borderColor:'#424242',
                                    label:'COVID-19 Total Cases',
                                    data: india_ts.cases,
                                    backgroundColor:'#f5f5f5'
                              }
                            ]
                    }
                })
            }
            if(this.state.Name2==="Deaths"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#ff5722',
                                label:'COVID-19: Total Deaths',
                                data: india_ts.deaths,
                                backgroundColor:'#fbe9e7'
                              }
                            ]
                    }
                })
            }
            if(this.state.Name2==="Active"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#1e88e5',
                                label:'COVID-19: Active Cases',
                                data: india_ts.active,
                                backgroundColor:'#e3f2fd'
                              }
                            ]
                    }
                })
            }
           
        }
        else{
            this.setState({
                Selected: key,
                Data: rawdata_ts[key],
                chartCard:{//for world/country-data
                    code: countries_data[key].code,
                    lastUpdated: countries_data[key].lastUpdated,
                    newcases: countries_data[key].newcases,
                    newdeaths: countries_data[key].newdeaths,
                    confirmed:countries_data[key].cases_data,
                    active:countries_data[key].active_data,
                    deaths:countries_data[key].deaths_data,
                    recovered:countries_data[key].recovered_data,
                    TestsPerHundred: countries_data[key].TestsPerHundred,
                    GrowthRate: rawdata_ts[key].growth_rate,
                    cfr: countries_data[key].cfr,
                    rr: countries_data[key].rr,
                    ar: countries_data[key].ar
                },
                pieChartData:{
                    datasets: [{
                        data: [countries_data[key].active_data,
                        countries_data[key].recovered_data,
                        countries_data[key].deaths_data],
                        //data: [sum.Active,sum.Recovered,sum.Deaths],
                        backgroundColor:['#2196f3','#4caf50','#f44336']
                    }],
                    labels: ['Active','Recovered','Deaths']
                },
                
            })
    
            if(this.state.Name1==="Cases"){
                this.setState({
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                //borderColor:'#9e9e9e',//gray border
                                label:'COVID-19: Cases',
                                data: rawdata_ts[key].newcases,
                                backgroundColor:'#757575'//gray bg
                              }
                            ]
                    },
                })
            }
            if(this.state.Name1==="Deaths"){
                this.setState({
                    DailyChartData:{
                        labels: dates.slice(1),
                            datasets:[
                              {
                                fill:false,
                                borderColor:'#ff5722',
                                label:'COVID-19: Deaths',
                                data: rawdata_ts[key].newdeaths,
                                backgroundColor:'#ff5722'
                              }
                            ]
                    },
                })
            }
            if(this.state.Name2==="Cases"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                    fill:true,
                                    pointRadius:0,
                                    borderColor:'#424242',
                                    label:'COVID-19 Total Cases',
                                    data: rawdata_ts[key].cases,
                                    backgroundColor:'#f5f5f5'
                              }
                            ]
                    }
                })
            }
            if(this.state.Name2==="Deaths"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#ff5722',
                                label:'COVID-19: Total Deaths',
                                data: rawdata_ts[key].deaths,
                                backgroundColor:'#fbe9e7'
                              }
                            ]
                    }
                })
            }
            if(this.state.Name2==="Active"){
                this.setState({
                    CumulativeChartData:{
                        labels: dates,
                            datasets:[
                              {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#1e88e5',
                                label:'COVID-19: Active Cases',
                                data: rawdata_ts[key].active,
                                backgroundColor:'#e3f2fd'
                                //'#1e88e5',
                              }
                            ]
                    }
                })
            }
        }
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
                                data:  this.state.Data.cases,
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
                val2:'Active Cases',
                Name2:'Active',
                CumulativeChartData:{
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#1e88e5',
                            label:'COVID-19: Active Cases',
                            data: this.state.Data.active,
                            backgroundColor:'#e3f2fd'
                          }
                        ]
                }
            })
        }


    }

    checkDate(item){
        let day= item.slice(0,2)
        let month= item.slice(3,5)
        let m=''
        if(month==='05'){
            m='May'
        }
        if(month==='06'){
            m='June'
        }
        let date= day+' '+m
        let time= item.slice(11,16)
        let res= date+','+' '+time+' AM'+ ' IST'
            return <span>{res}</span>
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
          const element=(
              <Fragment>
              <div className='mb-4'>
                   <div className='container-md content-row'>
                    <div className='row my-3'>
                            <div className='col-md-6 col-sm-12 mt-3 mb-4'>
                            <div className='card h-100'>
                                <div className='card-body'>     

                                <div className='row mb-3'>
                                <div className='col-12 mb-2'>
                                        <div className='row'>
                                            <div className='col-xl-6 d-flex justify-content-start'>
                                                <h6 className='text-muted' style={{fontWeight:'600'}}>COVID-19 World Figures</h6>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className='col-lg-6 col-md-12 mb-2'>
                                        <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                        <h3 style={{fontWeight:'600',color:'#616161'}}>{format(this.state.chartCard2.confirmed)}
                                        </h3>
                                    </div>

                                    <div className='col-lg-6 col-sm-12 mb-3'>
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
                                                <h6 style={{fontWeight:'400'}}>Active</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.active)}
                                                    <small className='text-muted'> ({this.state.chartCard2.ar} %)</small>
                                                </h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'400'}}>Recovered</h6>
                                            </div>
                                            <span className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.recovered)}
                                                    <small className='text-muted'> ({this.state.chartCard2.rr} %)</small>
                                                </h6>
                                            </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'400'}}>Fatalities</h6>
                                            </div>
                                            <span className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.deaths)}
                                                <small className='text-muted'> ({this.state.chartCard2.cfr} %)</small>
                                                </h6>                                            
                                            </span>
                                        </li>                                            
                                    </ul>
                                    
                                    </div>
                                </div> </div>
                               
                                </div>
                            </div>

                            
                        <div className='col-md-6 col-sm-12 mt-3 mb-4'>
                            <div className='card h-100'>
                                <div className='card-body'>

                                <div className='row mb-3'>
                                    <div className='col-12 mb-1'>
                                        <div className='row'>
                                            <div className='col-xl-12 d-flex justify-content-start'>
                                                {header(this.state.Selected, this.state.chartCard.code)}
                                            </div>
                                        </div>
                                    
                                        <hr></hr>
                                    </div>

                                    <div className='col-lg-6 col-md-12 mb-2'>
                                        <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                        <h3 style={{fontWeight:'600',color:'#616161'}}>{format(this.state.chartCard.confirmed)}</h3>
                                    </div>

                                    <div className='col-lg-6 col-sm-12 mb-3'>
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

                                <div className='row mb-2'>
                                <div className='col-12'>
                                    <ul className="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-1'></div>
                                                <h6 style={{fontWeight:'400'}}>Active</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.active)}
                                                    <small className='text-muted'> ({this.state.chartCard.ar} %)</small>
                                                </h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'400'}}>Recovered</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.recovered)}
                                                    <small className='text-muted'> ({this.state.chartCard.rr} %)</small>
                                                </h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'400'}}>Fatalities</h6>
                                            </div>
                                            <div className='count'>
                                                <div>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.deaths)}
                                                    <small className='text-muted'> ({this.state.chartCard.cfr} %)</small>
                                                </h6>
                                                </div>
                                            </div>
                                        </li>                                      
                                    </ul>
                                    </div>
                                    </div>
                                    <div className='row'>
                                        <SearchMenu list={this.state.countries} changeCountry={this.changeKey}>
                                        </SearchMenu>
                                    </div>    
                                </div>
              
                                </div>
                                </div>
                            </div>
                        <div className='row'>
                           <div className='col-md-6 col-sm-12 mt-4 mb-3'>
                            <div className='card'>
            
                        <div className='card-body'>
                            <div className='row'>
                            <div className='heading col-12 mb-1 mt-3'>
                                <h6 className='text-muted' style={{fontWeight:'600'}}>COVID-19 {this.state.Selected}: {this.state.val2} Over Time</h6>
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

                        <div className='col-md-6 col-sm-12 mt-4 mb-3'>
                        <div className='card'>
                        <div className='card-body'>
                        <div className='row'>
                        <div className='col-12 mb-1 mt-3'>
                            <h6 className='text-muted' style={{fontWeight:'600'}}>COVID-19 {this.state.Selected}: {this.state.val1} Over Time</h6>
                        </div>
                        <div className='col-12 mt-2'>
                        <ul class="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                        {this.state.links.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a class="nav-link active" key={item.id} data-toggle="tab" href="#" onClick={this.changeDailyVariable.bind(this,item)}>{item.name}</a>
                                    </li>
                                ))}
                                {this.state.links.slice(1,2).map(item => (
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
            </Fragment>
        )
      }
}

export default Chart
