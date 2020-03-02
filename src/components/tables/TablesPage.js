import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class TablesPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
  }

  refresh() {
    axios.post(API + 'getItems.php', {"branchofficeid":1}).then(res => {
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
    this.props.history.push("/table/0");
  }

  edit(userid) {
    this.props.history.push("/table/" + userid);
  }

  handleActive(cat) {
    cat.active = !cat.active;
    axios.post(API + "updateItem.php", cat).then(res => {

    });
    let active = cat.active === true ? "activado" : "desactivado";
    alert("Se ha " + active + " la mesa.");
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
            <button className="btn btn-primary btn-sm" onClick={this.addCategory.bind(this)}>+ Agregar Mesa</button>
              <br />
              <br />
               <h3>Mesas</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Mesa</b></th>
      <th scope="col"><b>Capacidad</b></th>
                            <th scope="col"><b>Disponibilidad</b></th>
      <th scope="col"><b>Activo</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.item_name}</th>
        <th>{cat.capacity}</th>
            <th>
                {cat.available == 1 ? (
                    <span className="badge badge-success">Disponible</span>) :
                    (<span className="badge badge-danger">Ocupada</span>)}              
            </th>
        <th>
        {cat.active == 1 ? (
        <button class="badge badge-danger" name="active" onClick={this.handleActive.bind(this, cat)}>Desactivar</button>
        ) : (
          <button class="badge badge-success" name="active" onClick={this.handleActive.bind(this, cat)}>Activar</button>
        )
        }
        </th>
        <th>
          <button onClick={this.edit.bind(this, cat.itemid)} class="badge badge-warning">Editar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>


            </div>
        );
    }
}

export { TablesPage };