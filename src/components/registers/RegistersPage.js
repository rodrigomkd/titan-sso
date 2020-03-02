import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class RegistersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
  }

  refresh() {
    axios.post(API + 'getAllRegisterBoxes.php', {"branchofficeid":1}).then(res => {
      const categories = res.data;
      this.setState({ categories });
    })
  }

  componentDidUpdate() {
    this.refresh();
  }

  componentDidMount() {
    this.refresh();
  }

  addCategory(e) {
    this.props.history.push("/register/0");
  }

  edit(userid) {
    this.props.history.push("/register/" + userid);
  }

    handleActive(cat) {
        if (cat.active == 1) {
            cat.active = 0;
        } else {
            cat.active = 1;
        }

    axios.post(API + "updateRegisterBox.php", cat).then(res => {

    });
    let active = cat.active == 1 ? "activado" : "desactivado";
    alert("Se ha " + active + " la Caja.");
  }

    render() {
     const requiredItem = this.state.selectedItem;
     if(this.state.categories === []) {
       let category = this.state.categories[requiredItem];
      if(typeof category == 'undefined') {
       category = [];
       category.category = "";
      }
     }

        return (
            <div class="container">
            <br />
            <button className="btn btn-primary btn-sm" onClick={this.addCategory.bind(this)}>+ Agregar Caja</button>
              <br />
              <br />
               <h3>Usuarios</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Caja</b></th>
      <th scope="col"><b>Activo</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row">{index + 1}</th>
        <th>{cat.name}</th>
        <th>
        {cat.active == 1 ? (
        <button class="badge badge-danger" name="active" onClick={this.handleActive.bind(this, cat)}>Desactivar</button>
        ) : (
          <button class="badge badge-success" name="active" onClick={this.handleActive.bind(this, cat)}>Activar</button>
        )
        }
        </th>
        <th>
          <button onClick={this.edit.bind(this, cat.registerboxid)} class="badge badge-warning">Editar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>
            </div>
        );
    }
}

export { RegistersPage };