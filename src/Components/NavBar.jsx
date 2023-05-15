import { Component } from 'react';
import { FaTimes, FaGripLines } from 'react-icons/fa';
import NavBar1 from './NavBar/NavBar1';
import NavBar2 from './NavBar/NavBar2';
import '../styles/NavBar.css';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      icon: true,
    };
  }

  changeIcon = () => {
    const { icon } = this.state;
    if (icon === true) {
      this.setState(
        { icon: false },
      );
    } else {
      this.setState(
        { icon: true },
      );
    }
  };

  render() {
    const { icon } = this.state;
    return (
      <>
        <i className="icon-element">
          { icon
            ? (<FaGripLines onClick={ this.changeIcon } />)
            : (<FaTimes onClick={ this.changeIcon } />)}
        </i>
        <div
          className={ icon ? 'nav-bar-1' : 'nav-bar-2' }
          data-testid="header-component"
        >
          { icon ? <NavBar1 /> : <NavBar2 /> }
        </div>
      </>
    );
  }
}
