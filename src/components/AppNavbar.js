import React, { Component, Fragment } from "react";
import {Navbar, Nav,  Container} from 'reactstrap';

class AppNavbar extends Component{
    navbar= (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
        <a class="navbar-brand" href="#"><h2>MyApp</h2></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                 <a class="nav-link" href="#"><h6>Home</h6><span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"><h6>Link</h6></a>
            </li>
        </ul>
        </div>
        </Container>
      </Nav>
    );

    render(){
       return this.navbar;
    }
}

export default AppNavbar;
