import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SearchBar from './searchBar';
import PieChart from './pieChart';
import LinePlot from './linePlot';
import BarPlot from './barPlot';
import CardLoading from './cardLoading';
import Legend from './legend';
import TabsMenu from './tabsMenu';
import './chart.css';
import { CardHeader } from '@material-ui/core';

const dates_chart=[]

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop:40,
        marginBottom:40,
    },
    heading:{
        marginBottom:1,
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
    },
    cardTitle:{
        marginBottom:0,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    },
    avatar:{
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: theme.spacing(0.65),
    },
  }));

function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}

const TodayCases = ({data}) => {
    if(data===0){
        return<div></div>
    }
    else{
        return(
            <div style={{display:'flex', flexWrap:'wrap', flexDirection:'row', paddingLeft:2, marginTop:2,alignItems:'center'}}>
                <div style={{color:'#9e9e9e', fontWeight:'500', fontSize:'10'}}>+{format(data)}</div>
            </div>
        )
    }
}

const ChartTitle = ({selectedCountry, selectedItem}) =>{
    const classes= useStyles()
    return(
        <div className={classes.cardTitle}>
            <Typography variant="h6" style={{color:'#757575', fontWeight:'400'}}>COVID-19: {selectedCountry} Stats</Typography>
            <Avatar src={selectedItem.flag} className={classes.avatar} alt="flag-icon"/>
        </div>

    )
 }

export default function Chart(){
    
    //const dates=[]
    const [ error, setError ]= useState(false)
    const [ loading, setLoading ]= useState(true)

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
        let key= ""
        if(event.target.value!==""){
            key = event.target.value
        }
        if(key===""){
            console.log('empty input')
        }
        else if(key==="India"){
            setSelectedCountry(key)
            setSelectedItem(dataCountries[key])

            setPieChartTwo({
                datasets: [{
                    data: [dataCountries["India"].Active,
                    dataCountries["India"].Recovered,
                    dataCountries["India"].Deaths],
                    backgroundColor:['#2196f3','#4caf50','#f44336']
                }],
                labels: ['Active','Recovered','Deaths']
            })

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

            setPieChartTwo({
                datasets: [{
                    data: [dataCountries[key].Active,
                    dataCountries[key].Recovered,
                    dataCountries[key].Deaths],
                    backgroundColor:['#2196f3','#4caf50','#f44336']
                }],
                labels: ['Active','Recovered','Deaths']
            })

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
        // setLoading(true)

        const countries=[]
        const monthsDict= {'1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec'}

        let countriesInfo={}
        const timeSeriesInfo={}

        try{
            const [ response1, response2 ]= await Promise.all([
                fetch('https://corona.lmao.ninja/v2/countries?sort=cases'),
                fetch('https://pomber.github.io/covid19/timeseries.json')
            ])
    
            const rawdata1= await response1.json()
    
            let world_cases=0
            let world_newCases=0
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
                let newCases = element.todayCases
                let deaths= element.deaths
                let active= element.active
                let recovered= element.recovered
    
                world_cases+= cases
                world_newCases+= newCases
                world_deaths+= deaths
                world_recovered+= recovered
                world_active+= active
    
                let obj={
                    Cases:cases,
                    NewCases:newCases,
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
                NewCases: world_newCases,
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
                m = monthsDict[month]
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

                if(country_name==="Korea, South"){
                    country_name="South Korea"
                }
                if(country_name==="Taiwan*"){
                    country_name="Taiwan"
                }
                if(country_name==="United Arab Emirates"){
                    country_name="UAE"
                }

                if(country_name==="West Bank and Gaza"){
                    country_name="Palestine"
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
            <CardLoading/>
        )
    }
    else{
        return(
            <div style={{marginTop: 30, marginBottom: 60}} className="container-lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={
                                <Typography variant="h6" style={{color:'#757575', fontWeight:'400'}}>COVID-19: World Figures</Typography>
                            }    
                        />
                        <CardContent>
                            <div className='row mb-4'>
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                    <h3 style={{fontWeight:'500',color:'#757575'}}>{format(worldData.Cases)}</h3>
                                    <TodayCases data={worldData.NewCases}/>
                                </div>
                                <PieChart {...pieChartOne}/>
                            </div>
                            <Legend {...worldData}/>
                        </CardContent>
                    </Card>
                    </Grid>
    
                    <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={
                                <ChartTitle selectedCountry={selectedCountry} selectedItem={selectedItem}/>
                            }
                        />
                        <CardContent>
                            <div className='row mb-4'>
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <small className='mb-2' style={{fontWeight:'400', letterSpacing: 1.0}}>Total Coronavirus Cases</small>
                                    <h3 style={{fontWeight:'500',color:'#757575'}}>{format(selectedItem.Cases)}</h3>
                                    <TodayCases data={selectedItem.NewCases}/>
                                </div>
                                <PieChart {...pieChartTwo}/>
                            </div>
                            <Legend {...selectedItem}/>

                            <SearchBar selectedCountry = {selectedCountry} changeValue = {changeValue} list={list}/>
                        </CardContent>
                    </Card>
                    </Grid>
                  <Grid item xs={12} sm={6}>
                      <Card className= {classes.card}>
                          <CardHeader
                                title={
                                <Typography variant="h6" style={{color:'#757575', fontWeight:'400'}}>{selectedCountry}: {variableOne} Over Time</Typography>
                                }
                            />
                          <CardContent>
                                <div className="row">
                                    <TabsMenu data= {options} handleChange= {changeCumulativeVariable}/>
                                    <LinePlot {...chartOne}/>
                                </div>
                          </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Card className= {classes.card}>
                          <CardHeader
                                title={
                                    <Typography variant="h6" style={{color:'#757575', fontWeight:'400'}}>{selectedCountry}: {variableTwo} Over Time</Typography>
                                }
                            />
                          <CardContent>
                                <div className="row">
                                    <TabsMenu data= {options.slice(0,-1)} handleChange= {changeDailyVariable}/>
                                    <BarPlot {...chartTwo}/>
                                </div>
                          </CardContent>
                      </Card>
                  </Grid>
                </Grid>
            </div>
        )
    }
}