import React, { Component, Fragment } from "react";
import {Jumbotron, Container} from 'reactstrap';
import Snippets from './Snippets'

class AppHeading extends Component{

    Heading= (
        <div>
            <Snippets/>
                <div className='container shadow-sm p-3 mb-5 bg-white rounded mt-4'>
                    <div id='c3' class="container mt-2 mb-3">
                        <h2 className='font-weight-light text-center'>COVID-19 DASHBOARD</h2>
                    </div>
                    <p className='lead'>See live statistics of the ongoing pandemic that includes the current count of cases, deaths, recovered and the prevalance of the outbreak per million people in all affected countries.</p>
                    <a class="btn btn-outline-primary" href="/india" role="button"><small>SEE CASES IN INDIA</small></a>
                    <p className='mt-4 small text-muted text-center'>LAST UPDATED: {new Date().toLocaleDateString()}  {new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} (IST)</p>

                </div>
        </div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
