import React, {Component, Fragment} from 'react';

const newcases=[]
const newdeaths=[]
const newrecoveries=[]

class Stats extends Component{
    constructor(props){
        super(props)
    }

    getCasesRow(cases){
        let data= cases.slice(-5).reverse()
        let isZero= false

        for(const item of data){
            if(item.NewCases===0){
                isZero=true
                break;
            }
        }

        if(isZero===true){
            data= cases.sort((a,b) => a.Cases-b.Cases).slice(-5).reverse()
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-dark'>{item.NewCases}</td>
                        <td className='text-dark'>{item.Cases}</td>
                    </tr> 
                )))
            )
        }
        else{
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-dark'>{item.NewCases}</td>
                        <td className='text-dark'>{item.Cases}</td>
                    </tr> 
                )))
            )
        }
    }

    getDeathsRow(deaths){
        let data= deaths.slice(-5).reverse()
        let isZero= false

        for(const item of data){
            if(item.NewDeaths===0){
                isZero=true
                break;
            }
        }

        if(isZero===true){
            data= deaths.sort((a,b) => a.Deaths-b.Deaths).slice(-5).reverse()
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-danger'>{item.NewDeaths}</td>
                        <td className='text-danger'>{item.Deaths}</td>
                    </tr> 
                )))
            )
        }
        else{
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-danger'>{item.NewDeaths}</td>
                        <td className='text-danger'>{item.Deaths}</td>
                    </tr> 
                )))
            )
        }
    }

    getRecoveredRow(recoveries){
        let data= recoveries.slice(-5).reverse()
        let isZero= false

        for(const item of data){
            if(item.NewRecoveries===0){
                isZero=true
                break;
            }
        }

        if(isZero==true){
            data= recoveries.sort((a,b) => a.Recovered-b.Recovered).slice(-5).reverse()
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-dark'>{item.NewRecoveries}</td>
                        <td className='text-dark'>{item.Recovered}</td>
                    </tr> 
                )))
            )
        }
        else{
            return(
                data.map((item =>(
                    <tr>
                        <td style={{fontWeight:"400"}}>{item.State}</td>
                        <td className='text-dark'>{item.NewRecoveries}</td>
                        <td className='text-dark'>{item.Recovered}</td>
                    </tr> 
                )))
            )
        }
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
                    <h5 className='text-center text-muted'>SUMMARY AND INSIGHTS <i class="far fa-chart-bar ml-1"></i></h5>
                    <hr></hr>
                </div>
                <div id='card-box' class="col-sm-12 col-md-4 d-flex">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN CASES</p>
                                    <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-secondary'>
                                                <th scope="col">State/UT</th>
                                                <th scope="col">Confirmed</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getCasesRow(this.props.NewCases)}
                                        </tbody>
                                    </table>
                        </div>
                </div>
                <div id='card-box' className='col-sm-12 col-md-4 d-flex'>
                <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                            <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN DEATHS</p> 
                                   <table id='stats' className='table table-sm'>
                                    <thead>
                                            <tr className='table-danger'>
                                                <th scope="col">State/UT</th>
                                                <th scope="col">Deaths</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getDeathsRow(this.props.NewDeaths)}
                                        </tbody>
                                    </table>
                                </div>
                    </div>

                    <div id='card-box' class="col-sm-12 col-md-4 d-flex">
                    <div class="shadow p-3 mb-3 bg-white rounded flex-fill">
                        <p className='text-center text-muted' style={{fontWeight:'500'}}>HIGHEST RISE IN RECOVERIES</p>
                                   <table id='stats' className='table table-sm'>
                                        <thead>
                                            <tr className='table-success'>
                                                <th scope="col">State/UT</th>
                                                <th scope="col">Recovered</th>
                                                <th scope="col">Total</th>
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