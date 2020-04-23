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
             <div id="statswindow">
               <div id="statswindow" class="container shadow p-3 mt-4 mb-3" style={{width:"90%"}}>
                <h5 class="text-muted text-center">FLASH INSIGHTS <i class="fas fa-chart-bar"></i></h5>
                <div id="stats border-bottom">
                        <div className="text-center">
                            <ul className="list-group list-group-flush" style={{margin:"auto"}}>
                                <li class="list-group-item"></li>
                                <li class="list-group-item"><p className="h6 text-muted">Total Individuals Tested</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.totalTests}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">Tests Per Million</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.testspermillion}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">Cases Per Million</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.casespermillion}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">Deaths Per Million</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.deathspermillion}</p></li>
                            </ul>
                        </div>
                        <div className="mt-1 border-top">
                </div>
                </div>
            </div>
            </div>
            </Fragment>
        );
    }
}

export default Stats