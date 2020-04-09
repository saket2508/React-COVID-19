import React, { Component, Fragment } from "react";
class AppHeading extends Component{

    Heading= (
        <div className='container-md'>
            <div class="jumbotron">
                <h1>COVID-19 DASHBOARD</h1>
                <p class="lead">See live statistics of the ongoing pandemic that includes the current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries. You can search a country to see its data from the table</p>
                <hr class="my-4"/>
                <p>Last Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} (IST)</p>
                <a class="btn btn-primary btn-md" href="/india" role="button">SEE CASES IN INDIA</a>
            </div>
        </div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
