import { Component } from 'react';
import '../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div>
          <p className="loading-title">Carregando...</p>
        </div>
        <div className="loading-element" />
      </div>
    );
  }
}
