import React, {Component} from "react";

function checkDateGlobal(item){
    let time_rn= new Date().getTime()
    //console.log(item)
    let last_updated= ((time_rn-item)/60000).toFixed(0)
    return <span>Last Updated: {last_updated} mins ago</span>
}


class AppHeading extends Component{
    constructor(props){
        super(props)
    }

    checkDateGlobal = (item) => {
        let time_rn= new Date().getTime()
        //console.log(item)
        let last_updated= ((time_rn-item)/60000).toFixed(0)
        return <span>Last Updated: {last_updated} mins ago</span>
    }


    render(){
      return(
        <div className='container shadow-sm pt-1 pl-3 pr-3 pb-1 mb-4 bg-white rounded'>
        <div className='mt-3'>
            <p class='lead'>
                See live statistics of the ongoing COVID-19 pandemic that includes the current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries. You can search any country to see it's figures from the table and also from the select menu to see more details.
            </p>
        </div>

        <div className='mt-3'>
          <small style={{fontWeight:'500'}} className='text-muted font-italic'>{this.checkDateGlobal(this.props.data.lastupdated)}</small>
        </div>
    </div>
      )
    }

}

export default AppHeading;
