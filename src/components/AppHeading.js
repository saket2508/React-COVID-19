import React, {Component} from "react";
class AppHeading extends Component{

    Heading= (
        <div className='container-lg shadow-sm p-3 mb-4 bg-white rounded mt-2'>
        <div id='c3' class="container-lg mt-2 mb-3">
            <h5 className='text-center' style={{fontWeight:'400'}}>COVID-19 TRACKER</h5>
        </div>
        <div className='mt-4 text-center'>
            <p className='lead'>
                See live statistics of the ongoing COVID-19 pandemic that includes the current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries. You can search a country to see its data from the table
            </p>
        </div>
</div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
