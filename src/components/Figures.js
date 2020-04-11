import React, { Component} from "react"
class Figures extends Component{

    render(){
        return(
        <div id='c2' class='container-sm mb-4'>
           <div class="card-group">
            <div class="card" style={{backgroundColor:'#f5f5f5'}}>
                <div class="card-body">
                    <p class="h5 card-title text-secondary text-center" style={{fontWeight:'500'}}>CONFIRMED</p>         
                    <p className='h3 text-secondary text-center' style={{fontWeight:'500'}}>{this.props.data.Cases}</p>
                    <h5 className='text-center'><span class="badge badge-pill badge-secondary">+{this.props.data.TodayCases}</span></h5>     
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#ffebee'}}>
                <div class="card-body"> 
                <p class=" h5 card-title text-danger text-center" style={{fontWeight:'500'}}>DEATHS</p>  
                    <p className='h3 text-danger text-center' style={{fontWeight:'500'}}>{this.props.data.Deaths}</p>
                    <h5 className='text-center'><span class="badge badge-pill badge-danger">+{this.props.data.TodayDeaths}</span></h5>   
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#e8f5e9'}}>               
                <div class="card-body">
                <p class="h5 card-title text-center" style={{fontWeight:'500',color:'#43a047'}}>RECOVERED</p>
                    <p className='h3 text-center' style={{fontWeight:'500',color:'#43a047'}}>{this.props.data.Recovered}</p> 
                </div>
            </div>
            <div class="card" style={{backgroundColor:'#e1f5fe'}}>               
                <div class="card-body">
                <p class="h5 card-title text-center" style={{fontWeight:'500',color:'#0288d1'}}>ACTIVE</p>
                    <p className='h3 text-center' style={{fontWeight:'500',color:'#0288d1'}}>{this.props.data.Active}</p>               
                </div>
            </div>
        </div>
        </div>

        )
    }

}

export default Figures