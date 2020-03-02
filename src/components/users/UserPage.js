import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";//"https://nomada.com.mx/apps/order-app/js/";

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          userid: null,
          name: null,
          last_name: null,
          username: null,
          is_active: 1,
          type: null,
          password: null,
          branchofficeid: 1,
          pin: null,
          user_number: null,
          online: 0,
          types: [{"id" : "A", "name" : "ADMINISTRADOR"},{"id" : "R", "name" : "CAJERO"},{"id" : "C", "name" : "COCINERO"}, {"id" : "W", "name" : "MESERO"}]
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;
    this.setState({userid:ID});

    if(ID > 0) {
      axios.post(API + 'getUserById.php', {"userid":ID})
      .then(res => {
        const product = res.data;
        this.setState(product);
      }).catch(error => console.log(error));
    }
  }

  getFiles(files){
    this.setState({ image: files.base64 })
  }

  handleInput(e){
    const { value, name } = e.target;
    this.setState({
      [name] : value
    })
  }

  handleAddComplement(e){
    if(this.state.complementid == null) {
      alert("Favor de seleccionar un Complemento.");
      return;
    }

    let complements = this.state.complements2;
    let index = this.state.complementid;
    let product = this.state.complements[index];
    complements.push(product);

    this.setState({
      "complements2" : complements
    });
  }

  handleAddIngredient(e){
    if(this.state.ingredient == null) {
      alert("Favor de agregar un Ingrediente.");
      return;
    }

    let ingredient = this.state.ingredient;
    let ingredients = this.state.ingredients;
    ingredients.push(ingredient);
    this.setState({
      "ingredientes" : ingredients
    });
  }

  handleRemoveComplement(e, index) {
    let complements = this.state.complements2;
    complements.splice(index, 1);
    this.setState({
      "complements2" : complements
    });
  }

  handleRemoveIngredient(e, index) {
    let complements = this.state.ingredients;
    complements.splice(index, 1);
    this.setState({
      "ingredients" : complements
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    //validations
    if(this.state.name == null) {
      alert("Favor de agregar el Nombre del Usuario.");
      return;
    }

    if(this.state.last_name == null) {
      alert("Favor de agregar los Apellidos.");
      return;
    }

    if(this.state.type === 'A' && this.state.username == null) {
      alert("Favor de agregar un Nombre de Usuario.");
      return;
    }

    if(this.state.type == null) {
      alert("Favor de seleccionar Tipo.");
      return;
    }

    if(this.state.type === 'A') {
      if(this.state.password == null) {
        alert("Favor de agregar una Contrasena.");
        return;
      }
    } else {
      if(this.state.pin == null) {
        alert("Favor de agregar un PIN.");
        return;
      } else if(this.state.pin.length !== 6) {
        alert("Favor de agregar solo 6 digitos para el PIN.");
        return;
      }
    }

    //validate if username it does exist
    let ID = this.state.userid;
    if(ID > 0) {
      console.log("updating user... " + ID);
      //update
      this.setState({"userid" : ID});
      axios.post(API + "updateUser.php", this.state)
      .then(res => {
      }).catch(error => console.log(error));
      alert("Se han guardado los cambios correctamente.");
    } else {
      if(this.state.type !== 'A') {
        //get user number
        await axios.post(API + "getUserNumber.php", this.state)
        .then(res => {
            let usernumber = Number(res.data.user_number) + 1;
            this.setState({"user_number" : usernumber});        
        });

        axios.post(API + "saveUser.php", this.state)
        .then(res2 => {
              
        });
        alert("Se ha creado el usuario con el Numero: " + this.state.user_number);
        } else {
          axios.post(API + "saveUser.php", this.state)
            .then(res2 => {
              alert("Se ha guardado el usuario correctamente.");
            });
        }
    }
     
    this.props.history.push("/users");
  }

  render() {
    return (
      <div className="container">
      <br />
         <h6>Formulario - Usuario</h6>
        <form>
         <div class="row">
          <div class="col">
             <div className="form-group">
             <label>Nombre:*</label>
               <input 
              type="text"
              name="name"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Nombre de la Persona"
              required
              value={this.state.name}
            />
          </div>
          </div>
          <div class="col">
            <div className="form-group">
            <label>Apellidos:*</label>
            <input 
              type="text"
              name="last_name"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Apellidos"
              required
              value={this.state.last_name}
            />
          </div>
          </div>
          </div>

          <div class="row">
            

          <div class="col">
            <div className="form-group">
            <label>Tipo:</label>
            <select 
              name="type"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Complemento"
              value={this.state.type}
              >
              <option></option>
              {this.state.types.map((cat, index) => 
                <option value={cat.id}>{cat.name}</option>
              )}
            </select>
          </div>
          </div>

          <div class="col">
            
            {this.state.type === 'A' ? (
            <div className="form-group">
                <label>Password:*</label>
                <input 
                  type="password"
                  name="password"
                  onChange={this.handleInput.bind(this)}
                  className="form-control"
                  placeHolder="Contrasena"
                  value={this.state.password}
                />
              </div>
      ) : (
        <div className="form-group">
                <label>PIN:*</label>
                <input 
                  type="number"
                  name="pin"
                  onChange={this.handleInput.bind(this)}
                  className="form-control"
                  placeHolder="PIN (6 digitos)"
                  value={this.state.pin}
                />
              </div>
      )}
              
            </div>
          </div>

         <div class="row">
         <div class="col">
         {this.state.type === 'A' ? (
            <div className="form-group">
              <label>Nombre Usuario:</label>
              <input 
                type="text"
                name="username"
                onChange={this.handleInput.bind(this)}
                className="form-control"
                placeHolder="Nombre Usuario"
                value={this.state.username}
              />
            </div>  
         ) : null}
          </div>
          <div class="col">
            <div className="form-group">
              
            </div>
          </div>
 
         </div>

          <div className="form-group">
            <button
              type="button" 
              name="save"
              className="btn btn-primary"
              onClick={this.handleSubmit.bind(this)}
              >Aceptar
            </button>
          </div>   
          </form> 
          </div>  
    );
  }

}

export { UserPage };