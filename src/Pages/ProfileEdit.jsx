import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../Components/Header';
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
    history.push('/profile');
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
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <div>
              <input
                data-testid="edit-input-image"
                type="url"
                value={ image }
                name="image"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <input
                data-testid="edit-input-name"
                type="text"
                value={ isName }
                name="isName"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <input
                data-testid="edit-input-email"
                type="email"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <textarea
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                type="text-area"
                value={ description }
                name="description"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <Link to="/profile">
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
