

import { Navbar, NavbarBrand } from 'reactstrap';
import React, { Component } from 'react';
import Menu from './Menu';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';


class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      dishes:DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS

    };
  }
  
  render() {
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }

    const DishWithId = ({match}) =>{
      return(
        <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    } 

    return (
      <div className="App">
        <Header/>
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path = '/menu/:dishId' component = {DishWithId}/>
              <Route exact path = '/contactus' component = {Contact}/>
              <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
