import { Component } from 'react';
import { FaTimes, FaGripLines } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar1 from './NavBar/NavBar1';
import NavBar2 from './NavBar/NavBar2';
import './NavBar.css';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isName: '',
      loading: true,
      icon: true,
    };
    this.getName = this.getName.bind(this);
  }

  async componentDidMount() { await this.getName(); }

  getName = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({
      loading: false,
      isName: name,
    });
  };

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
    const { loading, isName, icon } = this.state;
    return (
      <div
        className={ icon ? 'nav-bar-1' : 'nav-bar-2' }
        data-testid="header-component"
      >
        <div className="icon-nav">
          <i className="icon-element">
            { icon
              ? (<FaGripLines onClick={ this.changeIcon } />)
              : (<FaTimes onClick={ this.changeIcon } />)}
          </i>
        </div>
        <div className="nav-bar-section1">
          { icon ? <NavBar1 /> : <NavBar2 /> }
        </div>
        <div className="nav-bar-section2">
          {
            loading ? <Loading /> : (
              <h5 data-testid="header-user-name">
                { isName }
              </h5>
            )
          }
        </div>
      </div>
    );
  }
}
