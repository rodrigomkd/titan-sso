import React from 'react';
import axios from 'axios';

import { userService } from '../../_services';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";
const BASE_URL = "https://www.ep-solutions.com.mx/apps/zeropos/";//"https://fullgradient.com/apps/zeropos/";

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.props.history.push("/login");
        window.location = BASE_URL + "login";

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
        //IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo
        //validate user and password
        axios.post(API + 'getUserByName.php', {"username":username}).then(res => {
            this.setState({ loading: false });
          if(res.data == null) {
            this.setState({ error: "Usuario y/o contraseña incorrecta." });
            return;
          }
          const user = res.data;
          if(user.type == 'A' && user.is_active == 1 && user.password == password) {
            userService.login(username, password);
            const { from } = this.props.location.state || { from: { pathname: "/" } };

              //update connected user
              let date = new Date();
              let loginDatetime = new Date();
              axios.post(API + 'updateUserConnected.php', {
                  "online": 1, "login_datetime": loginDatetime,
                  "userid": user.userid }).then(res => { });

            
            window.location.pathname = "/";
          } else {
            this.setState({ error: "Usuario y/o contraseña incorrecta." });
          }
        });

        
        //window.location.pathname = "/";
        /*
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
            */
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="container">   
                <br />
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                        <div class="card-header"><h3>Zero POS - Iniciar Sesion</h3></div>
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
                </div>
        );
    }
}

export { LogoutPage }; 