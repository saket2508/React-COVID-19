import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'
import Charts from './IndiaCharts/Charts'
//import Charts from './IndiaCharts/Charts'

const labels=[]
const data=[]

const cases=[]
const deaths=[]
const recovered=[]

const dates=[]

const url= 'https://api.covid19india.org/data.json'

class India extends Component{
    constructor(props){
        super(props);
        this.state= {
            natnlData:{
                'confirmed':0,
                'active':0,
                'deaths':0,
                'recovered':0,
                'deltaconfirmed':0,
                'deltadeaths':0,
                'deltarecovered':0,
            },
            statewiseData:[],
        }
    }

    componentDidMount(){
        this.getData();
    }


    getData(){
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                natnlData:  {
                        'confirmed':json.statewise[0].confirmed,
                        'active':json.statewise[0].active,
                        'deaths':json.statewise[0].deaths,
                        'recovered':json.statewise[0].recovered,
                        'deltaconfirmed':json.statewise[0].deltaconfirmed,
                        'deltadeaths':json.statewise[0].deltadeaths,
                        'deltarecovered':json.statewise[0].deltarecovered,
                    },
                statewiseData: json.statewise.slice(1)
                })
    })}

    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingStats data= {this.state.natnlData}/>
                <Charts/>
                <TableIndia data= {this.state.statewiseData}/>
            </div>
        );

    }
}

export default India