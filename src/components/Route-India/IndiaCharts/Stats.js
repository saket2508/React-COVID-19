import React, {Component, Fragment} from 'react';

const newcases=[]
const newdeaths=[]
const newrecoveries=[]

function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}

class Stats extends Component{
    constructor(props){
        super(props)
    }

    getCasesRow(cases){
        let data= cases.slice(-6).reverse()
        return(
                data.map((item =>(
                    <tr>
                        <td id='wrap'  style={{fontWeight:"600"}}>{item.State}</td>
                        <td id='td-2' className='text-dark'>{format(item.NewCases)}</td>
                        <td id='td-2' className='text-dark'>{format(item.Cases)}</td>
                    </tr> 
                )))
            )
        
    }

    getDeathsRow(deaths){
        let data= deaths.slice(-6).reverse()
            return(
                data.map((item =>(
                    <tr>
                        <td id='wrap'  style={{fontWeight:"600"}}>{item.State}</td>
                        <td id='td-2' className='text-danger'>{format(item.NewDeaths)}</td>
                        <td id='td-2' className='text-danger'>{format(item.Deaths)}</td>
                    </tr> 
                )))
            )
    }

    getRecoveredRow(recoveries){
        let data= recoveries.slice(-6).reverse()
            return(
                data.map((item =>(
                    <tr>
                        <td id='wrap'  style={{fontWeight:"600"}}>{item.State}</td>
                        <td id='td-2' className='text-success'>{format(item.NewRecoveries)}</td>
                        <td id='td-2' className='text-success'>{format(item.Recovered)}</td>
                    </tr> 
                )))
            )
    }



    render(){
       const cases=this.props.NewCases
       const deaths= this.props.NewDeaths
       const recoveries= this.props.NewRecoveries

        return(
            <Fragment>
            <div id='chart-2'>
                <div id='card-box' className='container-lg content-row mb-2'>
                <div className='row my-5'>
                <div className='col-12 mb-4'>
                    <h5 className='text-center text-muted' style={{fontWeight:'600'}}>SUMMARY AND INSIGHTS <i class="far fa-chart-bar ml-1"></i></h5>
                    <hr></hr>
                </div>
                <div id='card-box' class="col-sm-12 col-md-4 d-flex mb-2">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN CASES</p>
                                    <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-secondary'>
                                                <th scope="col">State/UT</th>
                                                <th id='td-2' scope="col">Cases</th>
                                                <th id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getCasesRow(this.props.NewCases)}
                                        </tbody>
                                    </table>
                        </div>
                </div>
                <div id='card-box' className='col-sm-12 col-md-4 d-flex mb-2'>
                <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                            <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN DEATHS</p> 
                                   <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-danger'>
                                                <th scope="col">State/UT</th>
                                                <th id='td-2' scope="col">Deaths</th>
                                                <th id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getDeathsRow(this.props.NewDeaths)}
                                        </tbody>
                                    </table>
                                </div>
                    </div>

                    <div id='card-box' class="col-sm-12 col-md-4 d-flex mb-2">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'600'}}>HIGHEST RISE IN RECOVERIES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-success'>
                                                <th scope="col">State/UT</th>
                                                <th id='td-2' scope="col">Recovered</th>
                                                <th id='td-2' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {this.getRecoveredRow(this.props.NewRecoveries)}
                                        </tbody>
                                    </table>
                       </div>
                    </div>
                </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Stats