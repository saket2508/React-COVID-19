import React, {Component, Fragment} from 'react';
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
                <div className="text-center mb-2">
                    <small className="text-muted text-center">{new Date().toUTCString().slice(5,11)}, {this.props.insights.latestUpdate.timeStamp.slice(11,16)} IST</small>
                </div>
                <div id="stats border-bottom">
                        <div className="text-center">
                            <ul className="list-group list-group-flush" style={{margin:"auto"}}>
                                <li class="list-group-item"></li>
                                <li class="list-group-item"><p className="h6 text-muted">Total Individuals Tested</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.totalTests}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">Tests Per Million</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.insights.testspermillion}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Cases</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.data.deltaconfirmed}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Deaths</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.data.deltadeaths}</p></li>
                                <li class="list-group-item"><p className="h6 text-muted">New Recoveries</p><p className='h4 text-info' style={{fontWeight:"500"}}>{this.props.data.deltarecovered}</p></li>
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