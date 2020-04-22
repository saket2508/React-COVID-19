import React, {Component, Fragment} from 'react';

const url='https://api.covid19india.org/data.json'
const state_names=[]
const state_data=[]

class Stats extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Fragment>
            <div id="statswindow" class="container shadow p-3 mt-4 mb-3" style={{width:"90%"}}>
                <h5 class="text-muted text-center">FLASH INSIGHTS <i class="fas fa-chart-bar"></i></h5>
                <div id="stats border-bottom">
                        <div className="text-center">
                            <ul className="list-group list-group-flush" style={{margin:"auto"}}>
                                <li class="list-group-item"></li>
                                <li class="list-group-item"><p className="h6 text-muted">Total Individuals Tested</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.totalTests}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">Individuals Tested Yesterday</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.newTests}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Cases</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.latestUpdate.newCases}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Deaths</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.latestUpdate.newDeaths}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Recoveries</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.latestUpdate.newRecoveries}</p></li>
                            </ul>
                        </div>
                </div>
                <div className='mt-2 border-top'>
                    <div className='footer mt-4'>
                        <p className="small text-center text-muted">Last Updated: {this.props.insights.latestUpdate.timeStamp}</p>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Stats