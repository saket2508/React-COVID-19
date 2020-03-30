import React, { Component, Fragment } from "react";
import {Jumbotron, Container} from 'reactstrap';

class AppHeading extends Component{


    Heading= (
        <div className= "container">
            <Jumbotron>
                <h1 className="display-6">Live COVID-19 Tracker</h1>
                <p className="lead">Our site tracks live statistics of the ongoing COVID-19 Pandemic by displaying current count of cases, deaths, recovered and the prevalence of the outbreak per million people in all affected countries.</p>
                <hr className="my-4"></hr>
                <p className='text-muted'>Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour24: true })}(IST)</p>
            </Jumbotron>
        </div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
