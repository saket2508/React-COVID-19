import React, { Component} from "react"

function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}


class Figures extends Component{

    render(){
        return(
        <div class='container'>
           <div class="card-group">
            <div class="card">
                <div class="card-body">
                    <p class="h6 card-title text-center" style={{fontWeight:'600'}}>CONFIRMED</p>         
                    <p className='h4 text-secondary text-center' style={{fontWeight:'600',color:'#616161'}}>{format(this.props.data.Cases)}</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body"> 
                <p class=" h6 card-title text-center" style={{fontWeight:'600',color:'#616161'}}>DEATHS</p>  
                    <p className='h4 text-center' style={{fontWeight:'600',color:'#616161'}}>{format(this.props.data.Deaths)}</p>
                </div>
            </div>
            <div class="card">               
                <div class="card-body">
                <p class="h6 card-title text-center" style={{fontWeight:'600'}}>RECOVERED</p>
                    <p className='h4 text-center' style={{fontWeight:'600',color:'#616161'}}>{format(this.props.data.Recovered)}</p> 
                </div>
            </div>
            <div class="card">               
                <div class="card-body">
                <p class="h6 card-title text-center" style={{fontWeight:'600'}}>ACTIVE</p>
                    <p className='h4 text-center' style={{fontWeight:'600',color:'#616161'}}>{format(this.props.data.Active)}</p>               
                </div>
            </div>
        </div>
        </div>

        )
    }

}

export default Figures