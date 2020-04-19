import React, { Component} from "react"

class HeadingStats extends Component{
    render(){
        const element=(
        <div>
            <div className='container shadow-sm p-3 mb-4 bg-white rounded mt-2'>
                <div id='c3' class="container sm mt-2 mb-3">
                <h4 className='text-center' style={{fontWeight:'400'}}>CASES IN INDIA</h4>
                    <div className='text-center'>
                        <img height='60' width='80' src='https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png' alt='' className='rounded'></img>            
                    </div>
                </div>
                <div className='mt-4 text-center'>
                    <p className='lead'>
                        See live stats tracking the number of confirmed cases, deaths and recovered in all 28 states and 8 UTs.
                        You can search a state to see its data from the table.
                    </p>
                    <div className='mt-2'>
                        <p className='text-info text-center'>
                            Last Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} (IST)
                        </p>
                        <a class="btn btn-primary btn-sm" href="/" role="button">SEE WORLDWIDE</a>
                    </div>
                </div>
            </div>
        <div id='c2' class='container mb-4'>
        <div class="card-group">
        <div class="card" style={{backgroundColor:'#f5f5f5'}}>
            <div class="card-body">
                <p class="h5 card-title text-secondary text-center" style={{fontWeight:'500'}}>CONFIRMED</p>         
                <p className='h3 text-secondary text-center' style={{fontWeight:'500'}}>{this.props.data.confirmed}</p> 
                <h5 className='text-center'><span class="badge badge-pill badge-secondary">+{this.props.data.deltaconfirmed}</span></h5>      
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#ffebee'}}>
            <div class="card-body"> 
                <p class=" h5 card-title text-danger text-center" style={{fontWeight:'500'}}>DEATHS</p>  
                <p className='h3 text-danger text-center' style={{fontWeight:'500'}}>{this.props.data.deaths}</p>
                <h5 className='text-center'><span class="badge badge-pill badge-danger">+{this.props.data.deltadeaths}</span></h5>   
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#e8f5e9'}}>               
            <div class="card-body">
            <p class="h5 card-title text-center" style={{fontWeight:'500',color:'#43a047'}}>RECOVERED</p>
                <p className='h3 text-center' style={{fontWeight:'500',color:'#43a047'}}>{this.props.data.recovered}</p>  
                <h5 className='text-center'><span class="badge badge-pill badge-success">+{this.props.data.deltarecovered}</span></h5>               
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#e1f5fe'}}>               
            <div class="card-body">
            <p class="h5 card-title text-center" style={{fontWeight:'500',color:'#0288d1'}}>ACTIVE</p>
                <p className='h3 text-center' style={{fontWeight:'500',color:'#0288d1'}}>{this.props.data.active}</p>               
            </div>
        </div>
        </div>
        </div>
       </div>
    );
        return element
    }
}

export default HeadingStats