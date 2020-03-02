import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";//"https://nomada.com.mx/apps/order-app/js/";

class TablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          itemid: null,
          item_name: null,
          capacity: 0,
          available: 1,
          active: 1,
          branchofficeid: 1
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;
    this.setState({userid:ID});

    if(ID > 0) {
      axios.post(API + 'getItem.php', {"itemid":ID})
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

  async handleSubmit(e) {
    e.preventDefault();
    //validations
    if(this.state.item_name == null) {
      alert("Favor de agregar el Nombre de la Mesa.");
      return;
    }

      if (this.state.capacity == 0) {
      alert("Favor de agregar la Capacidad de la Mesa.");
      return;
    }

    //validate if username it does exist
    let ID = this.state.itemid;
    if(ID > 0) {
      console.log("updating user... " + ID);
      //update
      this.setState({"itemid" : ID});
      axios.post(API + "updateItem.php", this.state)
      .then(res => {
      }).catch(error => console.log(error));
      alert("Se han guardado los cambios correctamente.");
    } else {
        axios.post(API + "saveItem.php", this.state)
        .then(res2 => {
              
        });
        alert("Se ha creado la " + this.state.item_name);      
    }
     
    this.props.history.push("/tables");
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
             <label>Nombre Mesa:*</label>
               <input 
              type="text"
              name="item_name"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Numero de la Mesa"
              required
              value={this.state.item_name}
            />
          </div>
          </div>
          <div class="col">
            <div className="form-group">
            <label>Capacidad:*</label>
            <input 
              type="number"
              name="capacity"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Capacidad de la Mesa"
                                required
                                value={this.state.capacity}
            />
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

export { TablePage };