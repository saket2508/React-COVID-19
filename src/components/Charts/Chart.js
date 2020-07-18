import React, {Component, Fragment} from "react"
import {Bar, Line, Doughnut} from 'react-chartjs-3';

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
        return <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 Pandemic- World</h6>
    }
    else{
        return <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 Pandemic in {item}<span className='ml-1'><img src={"https://www.countryflags.io/"+code+"/flat/24.png"} alt='flag-icon'></img></span></h6>
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

function checkDateGlobal(item){
    if(item===undefined){
        return <span></span>
    }
    else{
        let time_rn= new Date().getTime()
        let last_updated= ((time_rn-item)/60000).toFixed(0)
        return <span>Last Updated: {last_updated} mins ago</span>
    }
}

function checkDateIndia(item){
    if(item===undefined){
        return <span></span>
    }
    else{
        //let time= item.slice(11,16)
        let diff=''
        let strhours= Number(item.slice(11,13))
        let strmins= Number(item.slice(14,16))
        if(new Date().getHours() === strhours){
            diff=  new Date().getMinutes() - strmins+ ' minutes ago'
        }
        else{
            diff= new Date().getHours() - strhours+ ' hours ago'
        }
        return <span>Last Updated: {diff}</span>
    }
   
}

class Chart extends Component{
    constructor(props){
        super(props)
        this.state={
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

        //time-series data for every country
        for(let key in response){

            let country_casesdata=[]
            let country_newcasesdata=[]
            let country_deathsdata=[]
            let country_newdeathsdata=[]

            response[key].map((item) => {
                let country_cases= item["confirmed"]
                let country_deaths= item["deaths"]
                country_casesdata.push(country_cases)
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
            countries.push(name)

            const country={
                cases: country_casesdata,
                deaths: country_deathsdata,
                newcases: country_newcasesdata,
                newdeaths: country_newdeathsdata
            }
            rawdata_ts[name]= country
        }

        countries.sort()
        
        //rawdata_ts['World']= worldwide

        let res2= await response2.json()

        console.log('Hello')
        let cases_sum=0
        let deaths_sum=0
        let recovered_sum=0

        let time= res2[0]['updated']
       
        res2.map((item) => {
            let name= item.country

            if(name==="S. Korea"){
                name= "South Korea"
            }

            let code= item.countryInfo.iso2

            let country_last_updated= item['updated']

            if(time < item['updated']){
                time= item['updated']
            }
            
            let Cases= item.cases
            cases_sum+= Cases

            let Deaths= item.deaths
            deaths_sum+= Deaths

            let Recovered= item.recovered
            recovered_sum+= Recovered

            let Active= item.active

            let obj_country={
                cases_data: Cases,
                lastUpdated: country_last_updated,
                code: code,
                deaths_data: Deaths,
                recovered_data: Recovered,
                active_data:Active
            } 
            countries_data[name]= obj_country   
            
        })

        const worldwide={}
        worldwide.time= time
        worldwide.cases_data= cases_sum
        worldwide.deaths_data= deaths_sum
        worldwide.recovered_data= recovered_sum
        worldwide.active_data= cases_sum-recovered_sum-deaths_sum

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
                lastUpdated: countries_data["India"].lastUpdated,
                confirmed:countries_data["India"].cases_data,
                active:countries_data["India"].active_data,
                deaths:countries_data["India"].deaths_data,
                recovered:countries_data["India"].recovered_data,
            },
            pieChartData:{
                datasets: [{
                    data: [countries_data["India"].active_data,
                    countries_data["India"].recovered_data,
                    countries_data["India"].deaths_data],
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
                    backgroundColor:['#1e88e5','#7cb342','#ff5722']
                }],
                labels: ['Active','Recovered','Deaths']
            },
            chartCard2:{
                date: worldwide.time,
                confirmed:worldwide.cases_data,
                active:worldwide.active_data,
                deaths:worldwide.deaths_data,
                recovered:worldwide.recovered_data
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

    changeKey = async (event) =>{
        let key= event.target.value
        if(key==="India"){
            let res= await fetch('https://pomber.github.io/covid19/timeseries.json')
            let response= await res.json()
            let india_cases_ts=[] 
            let india_newcases_ts=[] 
            let india_deaths_ts=[] 
            let india_newdeaths_ts=[] 

            response['India'].map((item) => {
                let cases_in=item['confirmed']
                let deaths_in= item['deaths']
                india_cases_ts.push(cases_in) 
                india_deaths_ts.push(deaths_in) 
            })

            for(let i=0;i<india_cases_ts.length-1;i++){
                let newcases_in= india_cases_ts[i+1]-india_cases_ts[i]
                let newdeaths_in= india_deaths_ts[i+1]-india_deaths_ts[i]
                india_newcases_ts.push(newcases_in)
                india_newdeaths_ts.push(newdeaths_in)
            }

            const india_ts= {
                cases: india_cases_ts,
                deaths: india_deaths_ts,
                newcases: india_newcases_ts,
                newdeaths: india_newdeaths_ts
            }

            this.setState({
                Selected:key,
                Data: india_ts,
                chartCard:{//for world/country-data
                    code: countries_data[key].code,
                    lastUpdated: countries_data[key].lastUpdated,
                    confirmed:countries_data[key].cases_data,
                    active:countries_data[key].active_data,
                    deaths:countries_data[key].deaths_data,
                    recovered:countries_data[key].recovered_data,
                },
                chartCard:{//for world/country-data
                    code: countries_data[key].code,
                    confirmed:countries_data[key].cases_data,
                    active:countries_data[key].active_data,
                    deaths:countries_data[key].deaths_data,
                    recovered:countries_data[key].recovered_data,
                },    
                pieChartData:{
                    datasets: [{
                        data: [countries_data[key].active_data,
                        countries_data[key].recovered_data,
                        countries_data[key].deaths_data],
                        //data: [sum.Active,sum.Recovered,sum.Deaths],
                        backgroundColor:['#1e88e5','#7cb342','#ff5722']
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
           
        }
        else{
            this.setState({
                Selected: key,
                Data: rawdata_ts[key],
                chartCard:{//for world/country-data
                    code: countries_data[key].code,
                    lastUpdated: countries_data[key].lastUpdated,
                    confirmed:countries_data[key].cases_data,
                    active:countries_data[key].active_data,
                    deaths:countries_data[key].deaths_data,
                    recovered:countries_data[key].recovered_data,
                },
                pieChartData:{
                    datasets: [{
                        data: [countries_data[key].active_data,
                        countries_data[key].recovered_data,
                        countries_data[key].deaths_data],
                        //data: [sum.Active,sum.Recovered,sum.Deaths],
                        backgroundColor:['#1e88e5','#7cb342','#ff5722']
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
                                                <h6 className='text-muted' style={{fontWeight:'700'}}>COVID-19 Pandemic- World</h6>
                                            </div>
                                        </div>

                                        <div className='row'>    
                                            <div className='d-inline-flex container justify-content-between'>
                                            <div>
                                            <small className='text-muted' style={{fontWeight:'600'}}>{checkDateGlobal(this.state.worldwide.time)}</small>
                                                </div>
                                            </div>
                                        </div>
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
                                                <h6 style={{fontWeight:'600'}}>Active Cases</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.active)}</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'600'}}>Total Recovered</h6>
                                            </div>
                                            <span className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.recovered)}</h6>
                                            </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'600'}}>Total Deaths</h6>
                                            </div>
                                            <span className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard2.deaths)}</h6>                                            
                                            </span>
                                        </li>                                      
                                    </ul>
                                    </div>
                                </div>
                                </div>
                               
                                </div>
                            </div>

                            
                        <div className='col-md-6 col-sm-12 mt-3 mb-4'>
                            <div className='card h-100'>
                                <div className='card-body'> 
                                <div className='row mb-3'>

                                    <div className='col-12 mb-2'>
                                        <div className='row'>
                                            <div className='col-xl-12 d-flex justify-content-start'>
                                                {header(this.state.Selected, this.state.chartCard.code)}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-9'>
                                                <div className='d-flex justify-content-start'>
                                    <small className='text-muted' style={{fontWeight:'600'}}>{checkDateGlobal(this.state.chartCard.lastUpdated)}</small>
                                                </div>
                                            </div>
                                        </div>
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
                                                <h6 style={{fontWeight:'600'}}>Active Cases</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.active)}</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-2'></div>
                                                <h6 style={{fontWeight:'600'}}>Total Recovered</h6>
                                            </div>
                                            <div className='count'>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.recovered)}</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                                            <div className='title'>
                                                <div className='dot-3'></div>
                                                <h6 style={{fontWeight:'600'}}>Total Deaths</h6>
                                            </div>
                                            <div className='count'>
                                                <div>
                                                <h6 style={{fontWeight:'600'}}>{format(this.state.chartCard.deaths)}</h6>
                                                </div>
                                            </div>
                                        </li>                                      
                                    </ul>
                                    </div>

                                    <div className='container col-7 mt-2 d-inline-flex justify-content-center' onChange={this.changeKey} value={this.state.Selected}>
                                        <select id='select' class="custom-select my-1 mr-sm-2">
                                            {this.state.countries.map((item) => (
                                                checkOption(item)
                                            ))} 
                                        </select>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>

                           <div className='col-md-6 col-sm-12 mt-4 mb-3'>
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

                        <div className='col-md-6 col-sm-12 mt-4 mb-3'>
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
            </Fragment>
        )
      }
}

export default Chart
