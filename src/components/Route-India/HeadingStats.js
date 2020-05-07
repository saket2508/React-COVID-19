import React, { Component} from "react"


function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}

function MainHeading(){
    const mainheading=(
        <div className='container-lg shadow-sm p-3 mb-4 bg-white rounded mt-2'>
                <div id='c3' class="container-lg mt-2 mb-3">
                <h5 className='text-center' style={{fontWeight:'600'}}>COVID-19 PANDEMIC IN INDIA</h5>
                    <div className='text-center'>
                        <img height='54' width='72' src='https://corona.lmao.ninja/assets/img/flags/in.png' alt='' className='rounded'></img>            
                    </div>
                </div>
                <div className='mt-4 text-center'>
                    <p className='lead' style={{fontWeight:'400'}}>
                        See live stats tracking the number of confirmed cases, deaths and recovered in all 28 states and 8 UTs.
                        You can search a state to see its data from the table.
                    </p>
                </div>
            </div>
    )
    return mainheading
}
//#ffebee-red

function StatsSummary(props){
    const summary=(
        <div id='c2' class='container-md mb-4'>
        <div class="card-group">
        <div class="card" style={{backgroundColor:'#f5f5f5'}}>
            <div class="card-body">
                <p class="h6 card-title text-secondary text-center" style={{fontWeight:'600'}}>CONFIRMED</p>         
                <p className='h4 text-secondary text-center' style={{fontWeight:'600'}}>{format(props.data.confirmed)}</p> 
                <h6 className='text-center'><span class="badge badge-pill badge-secondary">+{format(props.data.deltaconfirmed)}</span></h6>      
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#ffebee'}}>
            <div class="card-body"> 
                <p class=" h6 card-title text-danger text-center" style={{fontWeight:'600'}}>DEATHS</p>  
                <p className='h4 text-danger text-center' style={{fontWeight:'600'}}>{format(props.data.deaths)}</p>
                <h6 className='text-center'><span class="badge badge-pill badge-danger">+{format(props.data.deltadeaths)}</span></h6>   
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#e8f5e9'}}>               
            <div class="card-body">
            <p class="h6 card-title text-center" style={{fontWeight:'600',color:'#43a047'}}>RECOVERED</p>
                <p className='h4 text-center' style={{fontWeight:'600',color:'#43a047'}}>{format(props.data.recovered)}</p>  
                <h6 className='text-center'><span class="badge badge-pill badge-success">+{props.data.deltarecovered}</span></h6>               
            </div>
        </div>
        <div class="card" style={{backgroundColor:'#e1f5fe'}}>               
            <div class="card-body">
            <p class="h6 card-title text-center" style={{fontWeight:'600',color:'#0288d1'}}>ACTIVE</p>
                <p className='h4 text-center' style={{fontWeight:'600',color:'#0288d1'}}>{format(props.data.active)}</p>               
            </div>
        </div>
        </div>
        </div>
    )
    return summary
}

class HeadingStats extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const element=(
        <div>
           <MainHeading/>
           <StatsSummary data={this.props.data}/>
       </div>
    );
        return element
    }
}

export default HeadingStats