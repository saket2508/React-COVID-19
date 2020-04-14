import React, { Component} from "react"
import RouteNavbar from './RouteNavbar'
import TableIndia from './TableIndia'
import HeadingStats from './HeadingStats'

const url= 'https://api.covid19india.org/data.json'

class India extends Component{
    constructor(props){
        super(props);
        this.state= {
            natnl:{
                'confirmed':0,
                'active':0,
                'deaths':0,
                'recovered':0,
                'deltaconfirmed':0,
                'deltadeaths':0,
                'deltarecovered':0,
            },
            statewise:[]
        }
    }

    componentDidMount(){
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                natnl:  {
                        'confirmed':json.statewise[0].confirmed,
                        'active':json.statewise[0].active,
                        'deaths':json.statewise[0].deaths,
                        'recovered':json.statewise[0].recovered,
                        'deltaconfirmed':json.statewise[0].deltaconfirmed,
                        'deltadeaths':json.statewise[0].deltadeaths,
                        'deltarecovered':json.statewise[0].deltarecovered,
                    },
                statewise:  json.statewise.slice(1)
            })
        })
    }

    render(){
        return(
            <div>
                <RouteNavbar/>
                <HeadingStats data= {this.state.natnl}/>
                <TableIndia data= {this.state.statewise}/>
            </div>
        );

    }
}

export default India