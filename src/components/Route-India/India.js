import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'

const url= 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'


function HeadingInfo(props){
   const heading=(
    <div>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div id='d1' class="carousel-item active">
            <div className='container-fluid mt-2'>
                <p id='p1' className='small text-center'>DO YOUR BIT IN FLATTENING THE CURVE BY STAYING AT HOME.</p>
            </div>
        </div>
        <div id='d2' class="carousel-item">
            <div className='container-fluid mt-2'>
                <p id='p2' className='small text-center'>SPREAD THE MESSAGE: WASH YOUR HANDS FOR AT LEAST 20 SECONDS. AVOID TOUCHING YOUR FACE</p>    
            </div>       
        </div>
        <div id='d3' class="carousel-item">
            <div className='container-fluid mt-2'>
                <p id='p3' className='small text-center'>WEAR A MASK ONLY IF YOU ARE CARING FOR SOMEONE WHO IS ILL</p>    
            </div>       
        </div>
        <div id='d4' class="carousel-item">
            <div className='container-fluid mt-2'>
                <p id='p4' className='small text-center'>THERE IS NO PROOF THAT HOT WEATHER STOPS THE SPREAD OF THE VIRUS</p>    
            </div>       
        </div>
        <div id='d5' class="carousel-item">
            <div className='container-fluid mt-2'>
                <p id='p5' className='small text-center'>WE DON'T HAVE A CURE FOR THE VIRUS YET SO OUR ONLY HOPE LIES IN SOCIAL DISTANCING.</p>    
            </div>       
        </div>
        <div id='d6' class="carousel-item">
            <div className='container-fluid mt-2'>
                <p id='p6' className='small text-center'>SPEND QUALITY TIME WITH LOVED ONES. LEARN A NEW SKILL.</p>    
            </div>       
        </div>
    </div>
</div>
       <div class='c1'>
           <div className='container shadow-sm p-3 mb-5 bg-white rounded mt-4'>
                <div id='c3' class="container mt-2 mb-2">
                    <h2 className='font-weight-light text-center'>CASES IN INDIA</h2>
                </div>
                <img height='60' width='80' src='https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png' alt='' className='center'></img>            
            </div>
        <div id='c2' class='container mb-4'>
        <div class="card-group">
        <div class="card">
            <div class="card-body">
                <p class="h3 card-title text-center font-weight-light">CONFIRMED</p>         
                <p className='h3 text-primary text-center'>{props.DataTotal.Cases}</p>     
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
       </div>
    );
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