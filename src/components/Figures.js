import React, { Component} from "react"

function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}


class Figures extends Component{

    render(){
        return(
        <div id='c2' class='container-md mb-4'>
           <div class="card-group">
            <div class="card" style={{backgroundColor:'#f5f5f5'}}>
                <div class="card-body">
                    <p class="h6 card-title text-secondary text-center" style={{fontWeight:'600'}}>CONFIRMED</p>         
                    <p className='h4 text-secondary text-center' style={{fontWeight:'600'}}>{format(this.props.data.Cases)}</p>
                    <h6 className='text-center'><span class="badge badge-pill badge-secondary">+{format(this.props.data.TodayCases)}</span></h6>     
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#ffebee'}}>
                <div class="card-body"> 
                <p class=" h6 card-title text-danger text-center" style={{fontWeight:'600'}}>DEATHS</p>  
                    <p className='h4 text-danger text-center' style={{fontWeight:'600'}}>{format(this.props.data.Deaths)}</p>
                    <h6 className='text-center'><span class="badge badge-pill badge-danger">+{format(this.props.data.TodayDeaths)}</span></h6>   
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#e8f5e9'}}>               
                <div class="card-body">
                <p class="h6 card-title text-center" style={{fontWeight:'600',color:'#43a047'}}>RECOVERED</p>
                    <p className='h4 text-center' style={{fontWeight:'600',color:'#43a047'}}>{format(this.props.data.Recovered)}</p> 
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#e1f5fe'}}>               
                <div class="card-body">
                <p class="h6 card-title text-center" style={{fontWeight:'600',color:'#0288d1'}}>ACTIVE</p>
                    <p className='h4 text-center' style={{fontWeight:'600',color:'#0288d1'}}>{format(this.props.data.Active)}</p>               
                </div>
            </div>
        </div>
        </div>

        )
    }

}

export default Figures