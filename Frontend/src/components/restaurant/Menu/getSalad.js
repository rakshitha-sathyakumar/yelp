import React, { Component } from 'react';
import Navigationbar from '../../navigation';
// import userProfile from './profile';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import backgroundImage from '../images/menuCard.jpg';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../../backendServer";
import ReactPaginate from 'react-paginate';
import '../pagination.css';
import {getsalad} from '../../../actions/menuAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class getSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saladList: [],
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: null
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.props.getsalad();
        console.log(this.props.user);
    }

    handlePageClick = e => {
        alert("inside handle");
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }
        );

    };



    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          saladList : !nextProps.user ? this.state.saladList : nextProps.user,
          pageCount: Math.ceil(this.state.saladList.length / this.state.perPage)  
        }
       );	
      }


    render () {
        const count = this.state.saladList.length;
        const slice = this.state.saladList.slice(this.state.offset, this.state.offset + this.state.perPage);

          let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.saladList.length / this.state.perPage) > 0 ? Math.ceil(this.state.saladList.length / this.state.perPage) : 10}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );
        let renderSalad;
        if(this.state.saladList){
        renderSalad = slice.map((menu, key) => {
            var fileName = menu.dishFileName
            var imgSrc = `${backendServer}/yelp/upload/restaurant/${fileName}`
            return (
                <div>
                    <Card style={{borderLeft: "none", borderBottom: "none"}}>
                        <Card.Img src = {imgSrc} style={{width: "500px", height: "420px"}}></Card.Img>
                        <Card.Title style={{margin: "10px", fontSize: "25px"}}>{menu.dishName} </Card.Title>
                        <Card.Text style={{margin: "10px"}}>{menu.ingredients}</Card.Text>
                        <Card.Text style={{margin: "10px"}}>{menu.description}</Card.Text>
                        <Card.Text style={{margin: "10px"}}> ${menu.price}</Card.Text>
                        <div>
                        <Button style={{backgroundColor:"red", border: "1px solid red", marginLeft: "10px"}}> <Link to = {{pathname: `/editDish/${localStorage.getItem("rest_id")}/${menu.dish_id}`}} style={{color: "white"}}> Edit dish </Link>
                        </Button>
                        </div>
                    </Card>
                    <br/>
                    <br/>
                </div>
            )
        })
        }
        return (
            <React.Fragment>
            <Navigationbar/>
            <div class='panel'>
                <div class="container">
                    <center>
                        <h1 style={{margin: "10px"}}> Salads </h1>
                    </center>
                        {renderSalad}
                </div>
                <center>
                {paginationElement}
                </center>
            </div>
        </React.Fragment>
        )
    }
         
}

getSalad.propTypes = {
    getsalad: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return ({
    user: state.getMenu.user
  })
};

export default connect(mapStateToProps, { getsalad })(getSalad);