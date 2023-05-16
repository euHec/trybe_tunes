import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    isName: '',
    email: '',
    image: '',
    description: '',
    disabled: true,
  };

  componentDidMount() {
    this.getUseData();
  }

  getUseData = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({
      loading: false,
      isName: name,
      email,
      image,
      description,
    }, this.buttonActive);
  };

  saveNewDataUser = () => {
    const { description, email, image, isName: name } = this.state;
    const { history } = this.props;
    updateUser({ description, email, image, name });
    history.push('/trybe_tunes/profile');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.buttonActive();
  };

  buttonActive = () => {
    const LENGTHNUMBER = 0;
    const { description, email, image, isName } = this.state;
    if (
      description.length > LENGTHNUMBER
      && email.length > LENGTHNUMBER
      && image.length > LENGTHNUMBER
      && isName.length > LENGTHNUMBER
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    const { loading, disabled, description, email, image, isName } = this.state;
    return (
      <div className="page-profile-edit" data-testid="page-profile-edit">
        <NavBar />
        { loading ? <Loading /> : (
          <div className="profile-edit">
            <div className="profile-inputs">
              <input
                placeholder="Link da foto"
                data-testid="edit-input-image"
                type="url"
                value={ image }
                name="image"
                onChange={ this.handleChange }
              />
              <input
                placeholder="Seu nome"
                data-testid="edit-input-name"
                type="text"
                value={ isName }
                name="isName"
                onChange={ this.handleChange }
              />
              <input
                placeholder="Seu e-mail"
                data-testid="edit-input-email"
                type="email"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
              <textarea
                placeholder="Sobre você"
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                type="text-area"
                value={ description }
                name="description"
                onChange={ this.handleChange }
              />
              <Link to="/trybe_tunes/profile">
                <button
                  data-testid="edit-button-save"
                  onClick={ this.saveNewDataUser }
                  disabled={ disabled }
                >
                  Editar perfil
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape(
    PropTypes,
  ).isRequired,
};
