import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route,Redirect} from 'react-router-dom'

import './App.css';
import Navi from './components/navbar/Navi.js';
import AboutUs from './components/aboutus/AboutUs'
import Calendar from './components/calendar/Calendar'
import Membership from './components/membership/Membership'
import ContactUs from './components/contactus/ContactUs'

import HeaderCarousel from './components/headercarousel/HeaderCarousel.js';
import Body from './components/body/Body.js';
import FooterCarousel from './components/footercarousel/FooterCarousel.js';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      error: null,
      isLoaded: false,
      calendarEvents:[]
    }
  }

  componentDidMount() {
    // TODO: Make this configurable and change the "timeMin" parameter dynamically.
    fetch("https://www.googleapis.com/calendar/v3/calendars/acm.calstatela%40gmail.com/events?orderBy=startTime&singleEvents=true&timeMin=2019-08-19T15%3A17%3A00%2B00%3A00&key=AIzaSyDI1k8ZbH2VsqxqwVAefQylegA7ORaW05c")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            calendarEvents : result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Navi/>
          <Route exact path='/' render={() => <Body state={this.state}/>}/>
          <Route path='/aboutus' component={AboutUs}/>
          <Route path='/calendar' component={Calendar}/>
          <Route path='/membership' component={Membership}/>
          <Route path='/contactus' component={ContactUs}/>
        </BrowserRouter>
        <FooterCarousel/>
      </div>
    );
  }
}

export default App;
