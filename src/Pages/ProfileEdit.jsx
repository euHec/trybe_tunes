import { Component } from 'react';
import Header from '../Components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <span>ProfileEdit</span>
      </div>
    );
  }
}
