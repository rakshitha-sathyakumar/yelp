import React, { Component } from 'react';
import Navigationbar from '../../navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../../backendServer";
import ReactPaginate from 'react-paginate';
import '../pagination.css';
import {getdessert} from '../../../actions/menuAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class getDessert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dessertList: [],
            offset: 0,
            perPage: 2,
            currentPage: 0,
            pageCount: null
        };
    }

    componentDidMount() {
        this.props.getdessert();
        console.log(this.props.user)
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
          dessertList : !nextProps.user ? this.state.dessertList : nextProps.user,
          pageCount: Math.ceil(this.state.dessertList.length / this.state.perPage)  
        }
       );	
      }

    render () {

        console.log(this.state.dessertList);

        const count = this.state.dessertList.length;
        const slice = this.state.dessertList.slice(this.state.offset, this.state.offset + this.state.perPage);

        let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.dessertList.length / this.state.perPage) > 0 ? Math.ceil(this.state.dessertList.length / this.state.perPage) : 10}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );
        let renderDessert;
        if(this.state.dessertList) {
        renderDessert = slice.map((menu,key) => {
            var fileName = menu.fileText
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
                        <Button style={{backgroundColor:"red", border: "1px solid red", marginLeft: "10px"}}> 
                        <Link to = {{pathname: `/editDish/${localStorage.getItem("rest_id")}/${menu.dish_id}`}} style={{color: "white"}}> Edit dish </Link> </Button>
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
            <div class="container">
                <center>
                <h1 style={{margin: "10px"}}> Desserts </h1>
                </center>
                    {renderDessert}
                <div>
                {paginationElement}
                </div>
            </div>
        </React.Fragment>
        )
    }
         
}


getDessert.propTypes = {
    getdessert: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return ({
    user: state.getMenu.user
  })
};

export default connect(mapStateToProps, { getdessert })(getDessert);