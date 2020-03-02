import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";//"https://nomada.com.mx/apps/order-app/js/";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          registerboxid: null,
          branchofficeid: 1,
          name: null,
          active: 1
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;
    this.setState({userid:ID});

    if(ID > 0) {
        axios.post(API + 'getRegisterBox.php', {"registerboxid":ID})
      .then(res => {
        const product = res.data;
        this.setState(product);
      }).catch(error => console.log(error));
    }
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
      alert("Favor de agregar el Nombre de la Caja.");
      return;
    }

    //validate if username it does exist
    let ID = this.state.registerboxid;
    if(ID > 0) {
      //update
      this.setState({"registerboxid" : ID});
      axios.post(API + "updateRegisterBox.php", this.state).then(res => {
      }).catch(error => console.log(error));     
    } else {
        axios.post(API + "saveRegisterBox.php", this.state).then(res => {
        }).catch(error => console.log(error));
    }

      alert("Se han guardado los cambios correctamente.");
    this.props.history.push("/registers");
  }

  render() {
    return (
      <div className="container">
      <br />
         <h6>Formulario - Caja</h6>
        <form>
         <div class="row">
          <div class="col">
             <div className="form-group">
             <label>Nombre Caja:*</label>
               <input 
              type="text"
              name="name"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Nombre de la Caja"
              required
              value={this.state.name}
            />
            </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
          <div className="form-group">
            <button
              type="button" 
              name="save"
              className="btn btn-primary"
              onClick={this.handleSubmit.bind(this)}
              >Aceptar
            </button>
                        </div>  
                        </div>
                    </div>
          </form> 
                </div>
    );
  }

}

export { RegisterPage };