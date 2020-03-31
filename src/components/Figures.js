import React, { Component} from "react"
class Figures extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div class='container mb-4'>
            <div class="card-group">
            <div class="card">
                <div class="card-body">
                    <p class="h3 card-title text-center font-weight-light">CASES</p>         
                    <p className='h3 text-warning text-center'>{this.props.data.Cases}</p>     
                </div>
            </div>
            <div class="card">
                <div class="card-body"> 
                <p class=" h3 card-title text-center font-weight-light">DEATHS</p>  
                    <p className='h3 text-danger text-center'>{this.props.data.Deaths}</p>
                </div>
            </div>
            <div class="card">               
                <div class="card-body">
                <p class="h3 card-title text-center font-weight-light">RECOVERED</p>
                    <p className='h3 text-success text-center'>{this.props.data.Recovered}</p>               
                </div>
            </div>
        </div>
        </div>
        
        )
    }

}

export default Figures