import React from 'react';
import axios from 'axios';

import { userService } from '../../_services';

const API = "https://fullgradient.com/apps/titan/webservices/";
const BASE_URL = "https://fullgradient.com/apps/giphy/";//"https://fullgradient.com/apps/zeropos/";
const backgroundStyle = {
    backgroundImage: "url('https://nomada.com.mx/apps/order-app/css/images/zeropos_background.png')"
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        //userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        userService.logout();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        
        //get application access
        let data = JSON.parse(localStorage.getItem("app")); 
        console.log(data.client_id);

        //validate user and password
        axios.post(API + 'authentication.php', {"username":username, "password":password, "client_id" : data.client_id}).then(res => {
            this.setState({ loading: false });

          if(res.data == null) {
            this.setState({ error: "Usuario y/o contraseña incorrecta." });
            return;
          }

          //save token on local storage
          userService.login(username, password);
                  
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
          window.location = data.redirect_uri;
        });
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="container" style={backgroundStyle}>   
                <br />
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                        <div class="card-header"><h3>TITAN SSO - Iniciar Sesion</h3></div>
                        <div class="card-body">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">El Usuario es requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Contraseña:</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                                        <div className="help-block">La Contraseña es requerida</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Login</button>
                        {loading}
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
                    </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>        
        );
    }
}

export { LoginPage }; 