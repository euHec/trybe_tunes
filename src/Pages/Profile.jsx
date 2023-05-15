import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';
import './Profile.css';

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
      <div className="page-profile" data-testid="page-profile">
        <NavBar />
        <div className="profile-content">
          { loading ? <Loading /> : (
            <>
              <div className="profile">
                <div className="profile-image">
                  <img src={ image } alt={ name } data-testid="profile-image" />
                </div>
                <div className="profile-data">
                  <h5>Nome</h5>
                  <p>{ name }</p>
                  <h5>E-mail</h5>
                  <p>{ email }</p>
                  <h5>Descrição</h5>
                  <p>{ description }</p>
                </div>
              </div>
              <div className="div-button">
                <Link to="/profile/edit">
                  <button className="button-edit">Editar perfil</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
