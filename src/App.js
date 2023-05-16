import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import NotFound from './Pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/trybe_tunes/" component={ Login } />
          <Route exact path="/trybe_tunes/search" component={ Search } />
          <Route exact path="/trybe_tunes/album/:id" component={ Album } />
          <Route exact path="/trybe_tunes/favorites" component={ Favorites } />
          <Route exact path="/trybe_tunes/profile" component={ Profile } />
          <Route exact path="/trybe_tunes/profile/edit" component={ ProfileEdit } />
          <Route path="" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
