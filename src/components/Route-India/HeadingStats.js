import React, { Component} from "react"

class HeadingStats extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const element=(
        <div class='c1'>
            <div className='container sm shadow-sm p-3 mb-5 bg-white rounded mt-2'>
                <div id='c3' class="container sm mt-2 mb-3">
                    <h2 className='text-center'>CASES IN INDIA</h2>
                    <div className='text-center'>
                        <img height='60' width='80' src='https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png' alt='' className='rounded'></img>            
                    </div>
                </div>
                <div className='mt-4 text-center'>
                    <p className='lead'>
                        See live stats tracking the number of confirmed cases, deaths and recovered in all 28 states and 9 UTs.
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
        <div class="card">
            <div class="card-body">
                <p class="h5 card-title text-center">CONFIRMED</p>         
                <p className='h3 text-secondary text-center'>{this.props.DataTotal.Cases}</p>     
            </div>
        </div>
        <div class="card">
            <div class="card-body"> 
            <p class=" h5 card-title text-center">DEATHS</p>  
                <p className='h3 text-danger text-center'>{this.props.DataTotal.Deaths}</p>
            </div>
        </div>
        <div class="card">               
            <div class="card-body">
            <p class="h5 card-title text-center">RECOVERED</p>
                <p className='h3 text-success text-center'>{this.props.DataTotal.Recovered}</p>               
            </div>
        </div>
        <div class="card">               
            <div class="card-body">
            <p class="h card-title text-center">ACTIVE</p>
                <p className='h3 text-primary text-center'>{this.props.DataTotal.Active}</p>               
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