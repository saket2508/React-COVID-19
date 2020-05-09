import React, {Component} from "react"

const url='https://pomber.github.io/covid19/timeseries.json'

const NewCasesData=[]
const DeathsData=[]
const NewRecoveredData=[]

function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}


class Stats extends Component{
    constructor(props){
        super(props)
        this.state={
            codes:[],
            NewCases:[],
            NewDeaths:[],
            NewRecovered:[]
        }
    }

    getData(){
            fetch(url)
            .then(res => res.json())
            .then(response => {
                for(let key in response){

                    let name= key

                    if(key==='United Kingdom'){
                        name='UK'
                    }

                    let data1= response[key][ response[key].length - 1]
                    let data2= response[key][ response[key].length - 2]
                    let Deaths= Number(data1.deaths)
                    let NewDeaths= Number(data1.deaths)-Number(data2.deaths)
                    let Cases= Number(data1.confirmed)
                    let NewCases= Number(data1.confirmed)-Number(data2.confirmed)
                    let Recovered= Number(data1.recovered)
                    let NewRecovered= Number(data1.recovered)-Number(data2.recovered)

                    let obj1= {Country: name,NewCases: NewCases,Cases: Cases}
                    let obj2= {Country: name,NewDeaths: NewDeaths,Deaths: Deaths}
                    let obj3= {Country: name,NewRecovered: NewRecovered, Recovered: Recovered}

                    NewCasesData.push(obj1)
                    DeathsData.push(obj2)
                    NewRecoveredData.push(obj3)
                }
                NewCasesData.sort((a,b) => a.NewCases-b.NewCases)
                DeathsData.sort((a,b) => a.NewDeaths-b.NewDeaths)
                NewRecoveredData.sort((a,b) => a.NewRecovered-b.NewRecovered)

                this.setState({
                    NewCases: NewCasesData.slice(-6).reverse(),
                    NewDeaths:DeathsData.slice(-6).reverse(),
                    NewRecovered:NewRecoveredData.slice(-6).reverse()
                })

            })
    }

    componentDidMount(){    
       this.getData()
    }

    getFlagIcon(item,codes){
        let name= item.Country
        let code=""

        if(item.Country==='US'){
            name="USA"
        }
        if(item.Country==='United Kingdom'){
            name='UK'
        }
        
        for(let i=0;i< codes.length;i++){
            if(name===codes[i].Name){
                code= codes[i].Code
                break;
            }
        }

        return <span class="mr-1"><img src={"https://www.countryflags.io/"+code+"/flat/32.png"} alt='flag-icon'></img></span>

    }

    render(){
        const codes =this.props.flagData 
        return(
            <div id='chart-2'>
                <div id='card-box' className='container-lg content-row mb-2'>
                <div className='row my-5'>
                <div className='col-12 mb-4'>
                    <h5 className='text-center text-muted' style={{fontWeight:'700'}}>SUMMARY AND INSIGHTS <i class="far fa-chart-bar ml-1"></i></h5>
                    <hr></hr>
                </div>
                <div id='card-box' class="col-sm-12 col-lg-4 d-flex mb-2">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN CASES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-secondary'>                 
                                                <th scope="col">Location</th>
                                                <th id='td-2' scope="col">Cases</th>
                                                <th id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.NewCases.map((item =>(
                                                <tr>
                                                        <td style={{fontWeight:"600"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                        <td id='td-2' style={{fontWeight:"600"}}>{format(item.NewCases)}</td>
                                                        <td id='td-2' style={{fontWeight:"600"}}>{format(item.Cases)}</td>
                                                </tr> 
                                            )))}
                                        </tbody>
                                    </table>
                       </div>
                    </div>

                <div id='card-box' className='col-sm-12 col-lg-4 d-flex mb-2'>
                <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                            <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN DEATHS</p> 
                                   <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-danger'>
                                                <th cope="col">Location</th>
                                                <th id='td-2' scope="col">Deaths</th>
                                                <th id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.NewDeaths.map((item =>(
                                            <tr>
                                                    <td style={{fontWeight:"600"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                    <td style={{fontWeight:"600"}} id='td-2' className='text-danger'>{format(item.NewDeaths)}</td>
                                                    <td style={{fontWeight:"600"}} id='td-2' className='text-danger'>{format(item.Deaths)}</td>
                                            </tr> 
                                        )))}
                                        </tbody>
                                    </table>
                                </div>
                    </div>

                    <div id='card-box' class="col-sm-12 col-lg-4 d-flex mb-2">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN RECOVERIES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-success'>
                                                <th scope="col">Location</th>
                                                <th style={{fontWeight:"600"}} id='td-2' scope="col">Recovered</th>
                                                <th style={{fontWeight:"600"}} id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.NewRecovered.map((item =>(
                                                <tr>
                                                        <td style={{fontWeight:"600"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                        <td style={{fontWeight:"600"}} id='td-2' className='text-success'>{format(item.NewRecovered)}</td>
                                                        <td style={{fontWeight:"600"}} id='td-2' className='text-success'>{format(item.Recovered)}</td>
                                                </tr> 
                                            )))}
                                        </tbody>
                                    </table>
                       </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Stats

