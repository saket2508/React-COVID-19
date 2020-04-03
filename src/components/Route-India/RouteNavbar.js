import React, { Component, Fragment } from "react";
import {Container} from 'reactstrap';

class RouteNavbar extends Component{
    navbar= (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
      <a class="navbar-brand" href="#">STAY HOME<span><i class="far fa-smile ml-2"></i></span></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto ml-2 mt-2 mt-lg-0">
          <li class="nav-item">
               <a class="nav-link" href="/">SEE WORLDWIDE</a>
          </li>
          <li class="nav-item active">
              <a class="nav-link" href="#">SEE INDIA<span class="sr-only">(current)</span></a>
          </li>
      </ul>
      </div>
      </Container>
    </nav>
    );

    render(){
       return this.navbar;
    }
}

export default RouteNavbar;
