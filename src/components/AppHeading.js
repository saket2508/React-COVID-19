import React, {Component} from "react";
class AppHeading extends Component{

    Heading= (
        <div className='container shadow-sm p-3 mb-4 bg-white rounded mt-2'>
        <div id='c3' class="container sm mt-2 mb-3">
            <h4 className='text-center' style={{fontWeight:'400'}}>COVID-19 TRACKER</h4>
        </div>
        <div className='mt-4 text-center'>
            <p className='lead'>
                See live statistics of the ongoing COVID-19 pandemic that includes the current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries. You can search a country to see its data from the table
            </p>
            <a class="btn btn-primary btn-sm" href="/india" role="button">SEE INDIA</a>
        </div>
</div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
