import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
import Footer from '../Footer'

const url= 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'


class India extends Component{
    constructor(props){
        super(props);
        this.state= {StatesData:[],isLoaded:false,Data:{Cases:0,
            Deaths:0,
            Recovered:0,
            Active:0}}
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
                <HeadingStats DataTotal= {this.state.Data}/>
                <TableIndia Data= {this.state.StatesData}/>
                <Footer/>
            </div>
        );

    }
}

export default India