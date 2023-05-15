import { Component } from 'react';
import NavBar from '../Components/NavBar';
import './NotFound.css';

export default class NofFound extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="page-not-found" data-testid="page-not-found" />
      </>
    );
  }
}
