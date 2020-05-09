import React, {Component} from "react";

class AppNavbar extends Component{
    navbar= (
      <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor:'#37474f'}}>
        <div className='container-md'>
          <a className="navbar-brand" href="#">STAY HOME</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto ml-2 mt-2 mt-lg-0">
              <li className="nav-item active">
                  <a className="nav-link" href="#">WORLDWIDE<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="/India">INDIA</a>
              </li>    
          </ul>
          </div>
        </div>
    </nav>
    );

    render(){
       return this.navbar;
    }
}

export default AppNavbar;
