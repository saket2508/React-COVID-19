import React, { Component} from "react"


function TableBodyIndia(props){
    const tablebody= props.Data.map(item => (
            <tr>
                <th scope='row'>{item.state}</th>
                <td>{item.confirmed}</td>
                <td>{item.deaths}</td> 
                <td>{item.recovered}</td>
                <td>{item.active}</td>
            </tr>
          ));
        return(

            <tbody>
                {tablebody}
            </tbody>
        );
}

function TableHeader(){
    const tableheader=(
        <thead>
            <th scope='col'>State</th>
            <th scope='col'>Confirmed Cases</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active Cases</th>
        </thead>
    );
    return tableheader;
}

class TableIndia extends Component{
    constructor(props){
        super(props);
        this.state ={Data:this.props.Data}
    }


    render(){
        return(
            <div id='c4' className='container'>
                <h4 class='text-muted text-center font-weight-light'>Confirmed Cases And Deaths By State</h4>
                <div className='table-responsive'>
                    <table class="table table-striped table-bordered">
                        <TableHeader/>
                        <TableBodyIndia Data= {this.props.Data}/>
                    </table>
                </div>   
            </div>
        );
    }
}

export default TableIndia
