import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin } from '../actions/loginAction'
import yelpLoginImage from './images/yelp_logo.jpg';
import jwt_decode from 'jwt-decode';
//const jwt_decode = require('jwt-decode');

class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.userLogin(data);
        console.log(this.props.user);
        this.setState({
            authFlag: true,
            loginFlag: 1
        });
    }
    render() {
        console.log(this.props);
        var userLogin = 'True';
        var restLogin = 'False';
        let redirectVar = null;
        let message = ""
        if(this.props.user && this.props.user.firstName)
        {
            localStorage.setItem("user", userLogin)
            localStorage.setItem("token", this.props.user.token)

            var decoded = jwt_decode(this.props.user.token.split(' ')[1]);
            localStorage.setItem("email_id", decoded.email);
            localStorage.setItem("first_name", this.props.user.firstName);
            localStorage.setItem("user_id", decoded._id);
            localStorage.setItem("last_name", this.props.user.lastName);
            //localStorage.setItem("user", 'True'),
            // localStorage.setItem("rest_name", this.props.user.name);
            // localStorage.setItem("rest_id", this.props.user.rest_id);
            
            redirectVar = <Redirect to="/home" />
        } else if (this.props.user && this.props.user.name)
        {

            localStorage.setItem("user", restLogin)
            localStorage.setItem("token", this.props.user.token)

            decoded = jwt_decode(this.props.user.token.split(' ')[1]);
            localStorage.setItem("rest_id", decoded._id);
            localStorage.setItem("rest_name", this.props.user.name);
            localStorage.setItem("rest_email", decoded.email);
            //localStorage.setItem("user", 'False');

            redirectVar =<Redirect to="/restaurant" />
        }
        if(this.props.user === "NO_USER" && this.state.loginFlag){
            message = "No user with this email id";
        }
        else if(this.props.user === "INCORRECT_PASSWORD" && this.state.loginFlag){
            message = "Incorrect Password";
        }
        console.log(redirectVar)
        return (
            <div>
                {redirectVar}
                <div class='container' style={{marginTop: "30px"}}>
                    <div class='form-container'>
                    <center>
                    <img src={yelpLoginImage} style={{ height: 'fit-content' }} alt='Yelp' />
                    </center>
                        <div class='container-fluid' style={{marginTop: "30px"}}>
                            <div class='row'>
                                <div class='col-md-4 col-sm-4 col-xs-12'></div>
                                <div class='col-md-4 col-sm-4 col-xs-12'>
                                    <center>
                                        <h3 style={{color: "red", marginBottom: "20px"}}> Sign in to Yelp</h3>
                                        <div>New to Yelp? <Link to='/customerSignup'>Sign Up</Link></div>
                                        <div style={{padding: "5px"}}></div>
                                    </center>
                                        <form onSubmit={this.onSubmit}>
                                            <div class='form-group'>
                                                <input type='text' onChange={this.onChange} name='email' class='form-control' id='inputEmail' placeholder='Email ID' pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required/>
                                            </div>
                                            <div class='form-group'>
                                                <input type='password' onChange={this.onChange} name='password' class='form-control' id='inputEmail' placeholder='password' required/>
                                            </div>
                                            <div class="checkbox">
                                                <label>
                                                    <input type='checkbox'/> Remember me
                                                </label>
                                            </div>
                                            <button type='submit' class='btn btn-danger btn-block' style={{marginTop:"10px", backgroundColor: "red"}}> Sign In </button>
                                        </form>
                                    </div>
                                    <div class='col-md-4 col-sm-4 col-xs-12'></div>
                            </div>
                        </div> 
                </div>  
            </div>
        </div>
        )
    }
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
    user: state.login.user
})};

export default connect(mapStateToProps, { userLogin })(Login);