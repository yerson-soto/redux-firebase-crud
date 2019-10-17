import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Books from './components/books/Books';
import ShowBook from './components/books/Books';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import LoanBook from './components/books/LoanBook';

import Suscribers from './components/suscribers/Suscribers';
import AddSuscriber from './components/suscribers/AddSuscriber';
import ShowSuscriber from './components/suscribers/ShowSuscriber';
import EditSuscriber from './components/suscribers/EditSuscriber';

import Navbar from './components/layouts/Navbar';



class App extends Component {
   state = {  }
   render() { 
      return (  
         <Router>

            <Navbar />
            
            <div className="container">
              <Switch>
                  <Route exact path="/" component={Books} />
                  <Route exact path="/books/show/:id" component={ShowBook} />
                  <Route exact path="/books/new" component={AddBook} />
                  <Route exact path="/books/edit/:id" component={EditBook} />
                  <Route exact path="/books/loan/:id" component={LoanBook} />

                  <Route exact path="/suscribers" component={Suscribers} />
                  <Route exact path="/suscribers/new" component={AddSuscriber} />
                  <Route exact path="/suscribers/show/:id" component={ShowSuscriber} />
                  <Route exact path="/suscribers/edit/:id" component={EditSuscriber} />
               </Switch> 
            </div>
            
         </Router>
      );
   }
}
 
export default App;
