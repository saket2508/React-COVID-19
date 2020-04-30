import React, {Component} from "react"

const url='https://pomber.github.io/covid19/timeseries.json'

const NewCasesData=[]
const DeathsData=[]
const NewRecoveredData=[]



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
                    NewCases: NewCasesData.slice(-5).reverse(),
                    NewDeaths:DeathsData.slice(-5).reverse(),
                    NewRecovered:NewRecoveredData.slice(-5).reverse()
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
                    <h5 className='text-center text-muted'>SUMMARY AND INSIGHTS <i class="far fa-chart-bar ml-1"></i></h5>
                    <hr></hr>
                </div>
                <div id='card-box' class="col-sm-12 col-lg-4 d-flex">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN CASES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-secondary'>
                                                <th scope="col">Location</th>
                                                <th scope="col">Confirmed</th>
                                                <th style={{paddingLeft:'2rem'}} scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.NewCases.map((item =>(
                                                <tr>
                                                        <td style={{fontWeight:"400"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                        <td id='statstr' className='text-dark'>{item.NewCases}</td>
                                                        <td style={{paddingLeft:'2rem'}} className='text-dark'>{item.Cases}</td>
                                                </tr> 
                                            )))}
                                        </tbody>
                                    </table>
                       </div>
                    </div>
                <div id='card-box' className='col-sm-12 col-lg-4 d-flex'>
                <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                            <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN DEATHS</p> 
                                   <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-danger'>
                                                <th scope="col">Location</th>
                                                <th id='statstr' scope="col">Deaths</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.NewDeaths.map((item =>(
                                            <tr>
                                                    <td style={{fontWeight:"400"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                    <td id='statstr' className='text-danger'>{item.NewDeaths}</td>
                                                    <td className='text-danger'>{item.Deaths}</td>
                                            </tr> 
                                        )))}
                                        </tbody>
                                    </table>
                                </div>
                    </div>
                    <div id='card-box' class="col-sm-12 col-lg-4 d-flex">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN RECOVERIES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-success'>
                                                <th scope="col">Location</th>
                                                <th id='statstr' scope="col">Recovered</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.NewRecovered.map((item =>(
                                                <tr>
                                                        <td style={{fontWeight:"400"}}>{this.getFlagIcon(item,codes)}{item.Country}</td>
                                                        <td id='statstr' className='text-success'>{item.NewRecovered}</td>
                                                        <td className='text-success'>{item.Recovered}</td>
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

