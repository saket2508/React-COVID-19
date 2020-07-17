import React, {Component} from "react";

class AppNavbar extends Component{
    navbar= (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className='container-md'>
        <a className="navbar-brand" href="#">
            COVID-19 TRACKER
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          </div>
        </div>
    </nav>
    );

    render(){
       return this.navbar;
    }
}

export default AppNavbar;
