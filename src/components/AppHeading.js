import React, {Component} from "react";
class AppHeading extends Component{

    Heading= (
        <div className='container shadow-sm pt-1 pl-3 pr-3 pb-1 mb-4 bg-white rounded'>
            <div className='mt-4'>
                <p class='lead' style={{fontSize:'500'}}>
                    See live statistics of the ongoing COVID-19 pandemic that includes the current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries. You can search any country to see it's figures from the table and also from the select menu to see more details.
                </p>
            </div>
        </div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
