import { Component } from 'react';
import Proptypes from 'prop-types';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
import logo from '../Imagens/logo.svg';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabled: true,
      login: false,
    };
    this.handlechanges = this.handlechanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlechanges = (event) => {
    const { target } = event;
    const { value } = target;

    const MIN_LENGTH = 3;
    if (target.value.length >= MIN_LENGTH) {
      this.setState({
        disabled: false,
        name: value,
      });
    } else {
      this.setState({
        disabled: true,
        name: value,
      });
    }
  };

  handleSubmit = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ login: true });
    await createUser({ name: `${name}` });
    history.push('/trybe_tunes/search');
  };

  render() {
    const { disabled, login } = this.state;
    if (login) {
      return (
        <Loading />
      );
    }
    return (
      <div className="page-login" data-testid="page-login">
        <div className="login">
          <div className="logo-login">
            <img src={ logo } alt="logo" />
          </div>
          <div className="form-login">
            <form onSubmit={ this.handleSubmit }>
              <input
                className="input-login"
                data-testid="login-name-input"
                onChange={ this.handlechanges }
                placeholder="Qual o seu nome?"
                type="text"
              />
              <button
                className="button-login"
                data-testid="login-submit-button"
                disabled={ disabled }
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func,
  }).isRequired,
};
