import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class UsersPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
  }

  refresh() {
    axios.post(API + 'getUsers.php', {"branchofficeid":1}).then(res => {
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
    this.props.history.push("/user/0");
  }

  edit(userid) {
    this.props.history.push("/user/" + userid);
  }

  handleActive(cat) {
    cat.is_active = !cat.is_active;
    axios.post(API + "updateUser.php", cat).then(res => {

    });
    let active = cat.is_active == true ? "activado" : "desactivado";
    alert("Se ha " + active + " el usuario.");
  }

    render() {
     const requiredItem = this.state.selectedItem;
     if(this.state.categories == []) {
       let category = this.state.categories[requiredItem];
      if(typeof category == 'undefined') {
       category = [];
       category.category = "";
      }
     }

        return (
            <div class="container">
            <br />
            <button className="btn btn-primary btn-sm" onClick={this.addCategory.bind(this)}>+ Agregar Usuario</button>
              <br />
              <br />
               <h3>Usuarios</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Nombre</b></th>
      <th scope="col"><b>Apellidos</b></th>
      <th scope="col"><b>Usuario</b></th>
      <th scope="col"><b>Tipo</b></th>
      <th scope="col"><b>Online</b></th>
      <th scope="col"><b>Activo</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.name}</th>
        <th>{cat.last_name}</th>
        <th>{cat.username}</th>
        <th>{cat.type}</th>
        <th>{cat.online}</th>
        <th>
        {cat.is_active == 1 ? (
        <button class="badge badge-danger" name="is_active" onClick={this.handleActive.bind(this, cat)}>Desactivar</button>
        ) : (
          <button class="badge badge-success" name="is_active" onClick={this.handleActive.bind(this, cat)}>Activar</button>
        )
        }
        </th>
        <th>
          <button onClick={this.edit.bind(this, cat.userid)} class="badge badge-warning">Editar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>


            </div>
        );
    }
}

export { UsersPage };