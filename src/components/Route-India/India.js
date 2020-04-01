import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import {Jumbotron, Container} from 'reactstrap';

const url= 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'


function HeadingInfo(props){
   const heading=(
       <div class='c1'>    
            <div id='c3' class="container mt-4">
                <h1 className='font-weight-light text-center'>Cases in India</h1>
            </div>
            <img height='60' width='80' src='https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png' alt='' className='center'></img>            
        <div id='c2' class='container mb-4'>
        <div class="card-group">
        <div class="card">
            <div class="card-body">
                <p class="h3 card-title text-center font-weight-light">CONFIRMED</p>         
                <p className='h3 text-secondary text-center'>{props.DataTotal.Cases}</p>     
            </div>
        </div>
        <div class="card">
            <div class="card-body"> 
            <p class=" h3 card-title text-center font-weight-light">DEATHS</p>  
                <p className='h3 text-danger text-center'>{props.DataTotal.Deaths}</p>
            </div>
        </div>
        <div class="card">               
            <div class="card-body">
            <p class="h3 card-title text-center font-weight-light">RECOVERED</p>
                <p className='h3 text-success text-center'>{props.DataTotal.Recovered}</p>               
            </div>
        </div>
    </div>
    </div>
       </div>
    )
    return heading;
}

function TableHeader(){
    const tableheader=(
        <thead>
            <th scope='col'>State</th>
            <th scope='col'>Cofirmed Cases</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active</th>
        </thead>
    );
    return tableheader;
}

class India extends Component{
    constructor(props){
        super(props);
        this.state= {StatesData:[],isLoaded:false,Data:{Cases:0,Deaths:0,Recovered:0}}

    }

    componentDidMount(){
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded:true,
                StatesData: json.data.statewise,
                Data: {Cases:json.data.total.confirmed,
                    Deaths:json.data.total.deaths,
                    Recovered:json.data.total.recovered,
                    Active:json.data.total.active}
            })
        })
    }

    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingInfo DataTotal= {this.state.Data}/>
                <TableIndia Data= {this.state.StatesData}/>
            </div>
        );

    }
}

export default India