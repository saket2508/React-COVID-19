import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {Bar, Line, Doughnut} from 'react-chartjs-3';

const dates_chart=[]

const useStyles = makeStyles({
    root:{
        marginTop:40,
        marginBottom:40,
    },
    heading:{
        marginBottom:15,
        flex:1,
        flexDirection:"row"
    },
    title:{
        fontSize: 14,
    },
    card:{
        display: 'block',
        width: '100%',
        transitionDuration: '0.3s',
        height: '100%'
    }
})

const PieChart = ({...chartData}) => {
    return(
        <div className='col-lg-6 col-sm-12 mb-3'>
                                    <div className='chart flex-fill'>
                                    <Doughnut
                                        data={chartData}
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
    )
}


const LinePlot = ({...chartData}) => {
    return( 
        <div className='chart col-12 mt-3'>
                            <div id='chart' className="chart-container">
                            <Line
                                    data={chartData}
                                    options={{
                                        responsive:true,
                                        maintainAspectRatio:false,
                                        title:{
                                            display:false,
                                            //text:'Largest Cities In '+this.props.location,
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
    )
}

const BarPlot = ({...chartData}) => {
    return(
        <div className='col-12 mt-3'>
                        <div id='chart' className="chart-container">
                            <Bar
                                    data={chartData}
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
    )
}

function Tabs({data, handleChange}){
    return(
        <div className='col-12 mt-2'>
                            <ul class="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                            {data.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link active' key={item.id} data-toggle="tab" href="#" onClick={() => handleChange(item)} >{item.name}</a>
                                    </li>
                                ))}
                                {data.slice(1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link' key={item.id} data-toggle="tab" href="#" onClick={() => handleChange(item)} >{item.name}</a>
                                    </li>
                                ))}
                            </ul>   
                        </div>
    )
}


function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}

function chartTitle(selectedCountry, selectedItem){
   return(
            <Typography variant="h6" component="h5" color="textSecondary">
                COVID-19 Pandemic in {selectedCountry}
                <img style={{height:20, width:30, marginLeft:5, marginBottom:3}} src={selectedItem.flag}></img>
            </Typography>
   )
}
  
function Legend(data){
    return(
        <div className='row'>
        <div className='col-12'>
            <ul className="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-1'></div>
                        <h6 style={{fontWeight:'400'}}>Active</h6>
                    </div>
                    <div className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Active)}
                            <small className='text-muted'> ({data.ar} %)</small>
                        </h6>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-2'></div>
                        <h6 style={{fontWeight:'400'}}>Recovered</h6>
                    </div>
                    <span className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Recovered)}
                            <small className='text-muted'> ({data.rr} %)</small>
                        </h6>
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-3'></div>
                        <h6 style={{fontWeight:'400'}}>Fatalities</h6>
                    </div>
                    <span className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Deaths)}
                        <small className='text-muted'> ({data.cfr} %)</small>
                        </h6>                                            
                    </span>
                </li>                                            
            </ul>
            </div>
        </div>
    )
}


export default function Chart(){
    
    //const dates=[]
    const [ error, setError ]= useState(false)
    const [ loading, setLoading ]= useState(false)

    //general info of every country(cases, deaths, etc)
    const [ dataCountries, setDataCountries ]= useState({})
    const [ list, setList ]= useState([])

    const [ dates, setDates ]= useState([])

    //time-series data for every country
    const [ timeSeriesData, setTimeSeriesData ] = useState({})

    //self-explanatory
    const [ selectedCountry, setSelectedCountry ]= useState("India")
    const [ selectedItem, setSelectedItem ]= useState({})
    const [ worldData, setWorldData ]= useState({})

    const [ pieChartOne, setPieChartOne ]= useState({})
    const [ pieChartTwo, setPieChartTwo ]= useState({})
    const [ chartOne, setChartOne ]= useState({})
    const [ chartTwo, setChartTwo ]= useState({})

    const [ variableOne, setVariableOne ]= useState("Cases")
    const [ variableTwo, setVariableTwo ]= useState("New Cases")

    const options= [
        {
            id:1,
            name:'Cases',
        },
        {
            id:2,
            name:'Deaths',
        },
        {
            id:3,
            name:'Active',
        },
    ]

    useEffect(() => {
        getData()
    },[])

    const changeValue = async(event) => {
        let key= event.target.value
        if(key==="India"){
            setSelectedCountry(key)
            setSelectedItem(dataCountries[key])

            let res= await fetch("https://pomber.github.io/covid19/timeseries.json")
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

            const india_ts= {
                cases: india_cases_ts,
                deaths: india_deaths_ts,
                active: india_active_ts,
                newcases: india_newcases_ts,
                newdeaths: india_newdeaths_ts,
            }

            if(variableOne==="Cases"){
                setChartOne({
                    labels: dates,
                        datasets:[
                          {
                                fill:true,
                                pointRadius:0,
                                borderColor:'#424242',
                                label:'Total Cases',
                                data:  india_cases_ts,
                                backgroundColor:'#f5f5f5'
                          }
                        ]
                })
            }
            else if(variableOne==="Deaths"){
                setChartOne({
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#ff5722',
                            label:'Total Deaths',
                            data: india_deaths_ts,
                            backgroundColor:'#fbe9e7'
                          }
                        ]
                })
            }
            else{
                setChartOne({
                    labels: dates,
                        datasets:[
                          {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#1e88e5',
                            label:'Active Infections',
                            data: india_active_ts,
                            backgroundColor:'#e3f2fd'
                          }
                        ]
                })
            }

            if(variableTwo==="New Cases"){
                setChartTwo({
                    labels: dates.slice(1,dates.length),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#757575',//gray border
                            label:'New Infections',
                            data: (india_newcases_ts),
                            backgroundColor:'#757575'//gray bg
                          }
                        ]
                })
            }
            else{
                setChartTwo({
                    labels: dates.slice(1,dates.length),
                        datasets:[
                          {
                            fill:false,
                            borderColor:'#ff5722',
                            label:'New Fatalities',
                            data: (india_newdeaths_ts),
                            backgroundColor:'#ff5722'
                          }
                        ]
                })
            }

        }
        else{
            setSelectedCountry(key)
            setSelectedItem(dataCountries[key])

        if(variableOne==="Cases"){
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#424242',
                            label:'Total Cases',
                            data:  timeSeriesData[key].casesData,
                            backgroundColor:'#f5f5f5'
                      }
                    ]
            })
        }
        else if(variableOne==="Deaths"){
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                        fill:true,
                        pointRadius:0,
                        borderColor:'#ff5722',
                        label:'Total Deaths',
                        data: timeSeriesData[key].deathsData,
                        backgroundColor:'#fbe9e7'
                      }
                    ]
            })
        }
        else{
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                        fill:true,
                        pointRadius:0,
                        borderColor:'#1e88e5',
                        label:'Active Infections',
                        data: timeSeriesData[key].activeData,
                        backgroundColor:'#e3f2fd'
                      }
                    ]
            })
        }

        if(variableTwo==="New Cases"){
            setChartTwo({
                labels: dates.slice(1,dates.length),
                    datasets:[
                      {
                        fill:false,
                        borderColor:'#757575',//gray border
                        label:'New Infections',
                        data: (timeSeriesData[key].newCasesData),
                        backgroundColor:'#757575'//gray bg
                      }
                    ]
            })
        }
        else{
            setChartTwo({
                labels: dates.slice(1,dates.length),
                    datasets:[
                      {
                        fill:false,
                        borderColor:'#ff5722',
                        label:'New Fatalities',
                        data: (timeSeriesData[key].newDeathsData),
                        backgroundColor:'#ff5722'
                      }
                    ]
            })
        }
        }
    }

    const changeCumulativeVariable = (item) => {
        if(item.id===1){
            setVariableOne("Cases")
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#424242',
                            label:'Total Cases',
                            data:  timeSeriesData[selectedCountry].casesData,
                            backgroundColor:'#f5f5f5'
                      }
                    ]
            })
        }
        if(item.id===2){
            setVariableOne("Deaths")
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                        fill:true,
                        pointRadius:0,
                        borderColor:'#ff5722',
                        label:'Total Deaths',
                        data: timeSeriesData[selectedCountry].deathsData,
                        backgroundColor:'#fbe9e7'
                      }
                    ]
            })
        }
        if(item.id===3){
            setVariableOne("Active Cases")
            setChartOne({
                labels: dates,
                    datasets:[
                      {
                        fill:true,
                        pointRadius:0,
                        borderColor:'#1e88e5',
                        label:'Active Infections',
                        data: timeSeriesData[selectedCountry].activeData,
                        backgroundColor:'#e3f2fd'
                      }
                    ]
            })
        }
    }

    const changeDailyVariable = (item) => {
        if(item.id===1){
            setVariableTwo("New Cases")
            setChartTwo({
                labels: dates.slice(1,dates.length),
                    datasets:[
                      {
                        fill:false,
                        borderColor:'#757575',//gray border
                        label:'New Infections',
                        data: (timeSeriesData[selectedCountry].newCasesData),
                        backgroundColor:'#757575'//gray bg
                      }
                    ]
            })
        }
        else{
            setVariableTwo("New Deaths")
            setChartTwo({
                labels: dates.slice(1,dates.length),
                    datasets:[
                      {
                        fill:false,
                        borderColor:'#ff5722',
                        label:'New Fatalities',
                        data: (timeSeriesData[selectedCountry].newDeathsData),
                        backgroundColor:'#ff5722'
                      }
                    ]
            })
        }
    }


    const getData= async() => {
        //list to store names of countries
        setLoading(true)

        const countries=[]
        let months={}

        let countriesInfo={}
        const timeSeriesInfo={}

        try{
            const [ response1, response2 ]= await Promise.all([
                fetch('https://corona.lmao.ninja/v2/countries?sort=cases'),
                fetch('https://pomber.github.io/covid19/timeseries.json')
            ])
    
            const rawdata1= await response1.json()
    
            let world_cases=0
            let world_deaths=0
            let world_recovered=0
            let world_active=0
    
            rawdata1.map((element) => {
                let name= element.country
    
                if(name=== "S. Korea"){
                    name= "South Korea"
                }
    
                countries.push(name)
                let cases= element.cases
                let deaths= element.deaths
                let active= element.active
                let recovered= element.recovered
    
                world_cases+= cases
                world_deaths+= deaths
                world_recovered+= recovered
                world_active+= active
    
                let obj={
                    Cases:cases,
                    Deaths:deaths,
                    Recovered:recovered,
                    Active:active,
                    flag: element.countryInfo.flag,
                    cfr: ((deaths/cases)*100).toFixed(1),
                    rr: ((recovered/cases)*100).toFixed(1),
                    ar: ((active/cases)*100).toFixed(1),
                }
    
                countriesInfo[name]= obj
            })
    
            const world_data={
                Cases: world_cases,
                Deaths: world_deaths,
                Recovered: world_recovered,
                Active: world_active,
                cfr: ((world_deaths/world_cases)*100).toFixed(1),
                rr: ((world_recovered/world_cases)*100).toFixed(1),
                ar: ((world_active/world_cases)*100).toFixed(1),
            }
    
            countries.sort()
            setList(countries)
    
            const rawData2 = await response2.json()
            
            rawData2["Afghanistan"].map((item) => {
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
                    m='Jun'
                }
                if(month==='7'){
                    m='Jul'
                }
                if(month==='8'){
                    m='Aug'
                }
                if(month==='9'){
                    m='Sep'
                }
                if(month==10){
                    m='Oct'
                }
                if(month==11){
                    m='Nov'
                }
                if(month==12){
                    m='Dec'
                }
                let date =m+ ' '+d
                dates_chart.push(date)
                console.log(date)
            })
    
            setDates(dates_chart.slice(dates_chart.length/2))
    
            for(let key in rawData2){
    
                let country_name= key
                if(country_name==="US"){
                    country_name= "USA"
                }
                if(country_name==="United Kingdom"){
                    country_name="UK"
                }
    
                let country_cases=[]
                let country_newCases=[]
                let country_deaths=[]
                let country_newDeaths=[]
                let country_active=[]
                rawData2[key].map((item) => {
                    country_cases.push(item.confirmed)
                    country_deaths.push(item.deaths)
                    country_active.push(item.confirmed-item.deaths-item.recovered)
                })
    
                for(let i=1;i<=country_cases.length-1;i++){
                    let newInfections= country_cases[i]-country_cases[i-1]
                    let newFatalities= country_deaths[i]-country_deaths[i-1]
                    country_newCases.push(newInfections)
                    country_newDeaths.push(newFatalities)
                }
    
                let info={
                    casesData: country_cases,
                    deathsData: country_deaths,
                    activeData: country_active,
                    newCasesData: country_newCases,
                    newDeathsData: country_newDeaths
                }
    
                timeSeriesInfo[country_name]= info
            }
            console.log(countriesInfo)
            setDataCountries(countriesInfo)
            setTimeSeriesData(timeSeriesInfo)
            setSelectedItem(countriesInfo["India"])
            setWorldData(world_data)
            console.log(timeSeriesInfo)
            setPieChartOne({
                datasets: [{
                    data: [world_data.Active,
                        world_data.Recovered,
                        world_data.Deaths],
                    backgroundColor:['#2196f3','#4caf50','#f44336']
                }],
                labels: ['Active','Recovered','Deaths']
            })
    
            setPieChartTwo({
                datasets: [{
                    data: [countriesInfo["India"].Active,
                    countriesInfo["India"].Recovered,
                    countriesInfo["India"].Deaths],
                    backgroundColor:['#2196f3','#4caf50','#f44336']
                }],
                labels: ['Active','Recovered','Deaths']
            })
    
    
            setChartTwo({
                    labels: dates_chart.slice(1,dates_chart.length/2),
                        datasets:[
                          {
                            fill:false,
                            //borderColor:'#9e9e9e',//gray border
                            label:'New Infections',
                            data: (timeSeriesInfo["India"].newCasesData),
                            backgroundColor:'#757575'//gray bg
                          }
                        ]
            })
    
            setChartOne({
                labels: dates_chart.slice(dates_chart.length/2),
                    datasets:[
                      {
                            fill:true,
                            pointRadius:0,
                            borderColor:'#424242',
                            label:'Total Cases',
                            data:  timeSeriesInfo["India"].casesData,
                            backgroundColor:'#f5f5f5'
                      }
                    ]
            })

            setLoading(false)
        }
        catch(error){
            setLoading(false)
            setError(true)
            console.log(error)
        }

    }

    const classes= useStyles()

    if(error){
        return(
        <div style={{flex:1,justifyContent:'center',marginTop:50}}>
            <strong>Unable to get plot data. There appears to be a problem with the server :(</strong>
        </div>
        )
    }
    if(loading){
        return(
            <div style={{marginTop:30, marginBottom: 60}} className="container-lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                }/>
                            <CardContent>
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                }/>
                            <CardContent>
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                }/>
                            <CardContent>
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                }/>
                            <CardContent>
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
    return(
        <div style={{marginTop: 30, marginBottom: 60}} className="container-lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <CardContent>
                    <div className={classes.heading}>
                        <Typography variant="h6" color="textSecondary">
                            COVID-19 World Figures
                        </Typography>
                            <hr></hr>
                       </div>              
                        <div className='row mt-4 mb-4'>
                            <div className='col-lg-6 col-md-12 mb-2'>
                                <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                <h3 style={{fontWeight:'600',color:'#757575'}}>{format(worldData.Cases)}</h3>
                            </div>
                            <PieChart {...pieChartOne}/>
                        </div>
                        <Legend {...worldData}/>
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                    <CardContent>
                       <div className={classes.heading}>
                        {chartTitle(selectedCountry, selectedItem)}
                            <hr></hr>
                       </div>       
                        <div className='row mt-4 mb-4'>
                            <div className='col-lg-6 col-md-12 mb-2'>
                                <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                <h3 style={{fontWeight:'600',color:'#757575'}}>{format(selectedItem.Cases)}</h3>
                            </div>
                            <PieChart {...pieChartTwo}/>
                        </div>
                        <Legend {...selectedItem}/>

                        <div className='row mt-2'>
                            <div className="container d-flex col-7 justify-content-center">
                                <select id="select" value={selectedCountry} onChange={(event) => changeValue(event)} style={{borderRadius:50}} className="custom-select custom-select-md">
                                        {list.map((item) => {
                                            if(item==="India"){
                                                return <option selected>{item}</option>
                                            }
                                            else{
                                                return <option value={item}>{item}</option>
                                            }
                                        })}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </Grid>
              <Grid item xs={12} sm={6}>
                  <Card className= {classes.card}>
                      <CardContent>
                            <div className={classes.heading}>
                                <Typography variant="h6" component="h5" color="textSecondary">
                                    {selectedCountry}: {variableOne} Over Time
                                </Typography>
                            </div>

                            <div className="row mt-2">
                                <Tabs data= {options} handleChange= {changeCumulativeVariable}/>
                                 {/* Cumulative Trend */}
                                <LinePlot {...chartOne}/>
                            </div>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Card className= {classes.card}>
                      <CardContent>
                            <div className={classes.heading}>
                                <Typography variant="h6" component="h5" color="textSecondary">
                                    {selectedCountry}: {variableTwo} Over Time
                                </Typography>
                            </div>

                            <div className="row mt-2">
                                <Tabs data= {options.slice(0,-1)} handleChange= {changeDailyVariable}/>
                                {/* Daily Trend */}
                                <BarPlot {...chartTwo}/>
                            </div>
                      </CardContent>
                  </Card>
              </Grid>
            </Grid>
        </div>
    )
}