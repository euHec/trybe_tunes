import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Nav from './Nav';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isName: '',
      loading: true,
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

  render() {
    const { loading, isName } = this.state;
    return (
      <header data-testid="header-component">
        <Nav />
        {
          loading ? <Loading /> : (
            <span data-testid="header-user-name">
              { isName }
            </span>
          )
        }
      </header>
    );
  }
}
