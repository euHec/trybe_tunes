import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';

export default class Profile extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.getUseData();
  }

  getUseData = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  };

  render() {
    const { loading, description, email, image, name } = this.state;
    return (
      <div data-testid="page-profile">
        <NavBar />
        { loading ? <Loading /> : (
          <div>
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
            </div>
            <div>
              <p>{ name }</p>
            </div>
            <div>
              <p>{ email }</p>
            </div>
            <div>
              <p>{ description }</p>
            </div>
            <div>
              <Link to="/profile/edit"><button>Editar perfil</button></Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
