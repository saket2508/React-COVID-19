import React, { Component, Fragment } from "react";
import {Jumbotron, Container} from 'reactstrap';

class AppHeading extends Component{

    Heading= (
        <div>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div id='d1' class="carousel-item active">
                            <div className='container-fluid mt-2'>
                                <p id='p1' className='small text-center'>DO YOUR BIT IN FLATTENING THE CURVE BY STAYING AT HOME.</p>
                            </div>
                        </div>
                        <div id='d2' class="carousel-item">
                            <div className='container-fluid mt-2'>
                                <p id='p2' className='small text-center'>SPREAD THE MESSAGE: WASH YOUR HANDS FOR AT LEAST 20 SECONDS. AVOID TOUCHING YOUR FACE</p>    
                            </div>       
                        </div>
                        <div id='d3' class="carousel-item">
                            <div className='container-fluid mt-2'>
                                <p id='p3' className='small text-center'>WEAR A MASK ONLY IF YOU ARE CARING FOR SOMEONE WHO IS ILL</p>    
                            </div>       
                        </div>
                        <div id='d4' class="carousel-item">
                            <div className='container-fluid mt-2'>
                                <p id='p4' className='small text-center'>THERE IS NO PROOF THAT HOT WEATHER STOPS THE SPREAD OF THE VIRUS</p>    
                            </div>       
                        </div>
                        <div id='d5' class="carousel-item">
                            <div className='container-fluid mt-2'>
                                <p id='p5' className='small text-center'>WE DON'T HAVE A CURE FOR THE VIRUS YET SO OUR ONLY HOPE LIES IN SOCIAL DISTANCING.</p>    
                            </div>       
                        </div>
                        <div id='d6' class="carousel-item">
                            <div className='container-fluid mt-2'>
                                <p id='p6' className='small text-center'>SPEND QUALITY TIME WITH LOVED ONES. LEARN A NEW SKILL.</p>    
                            </div>       
                        </div>
                    </div>
                </div>
                <div className='container shadow-sm p-3 mb-5 bg-white rounded mt-4'>
                    <div id='c3' class="container mt-2 mb-3">
                        <h2 className='font-weight-light text-center'>COVID-19 TRACKER</h2>
                    </div>
                    <p className='lead'>See live statistics of the ongoing pandemic that includes the current count of cases, deaths, recovered and the prevalance of the outbreak per million people in all affected countries.</p>
                    <p className='small'><a href='/india'>SEE CASES IN INDIA</a></p>
                </div>
            </div>
    );

    render(){
       return this.Heading;
    }

}

export default AppHeading;
