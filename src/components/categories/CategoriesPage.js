import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
    }

  refresh() {
    axios.post(API + 'getAllCategories.php', {"branchofficeid":1})
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      }).catch(error => console.log(error));
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  handleAddCategory(cat) {
    //const [store, setStore] = useStore();

    //firebase.database().ref().child('company').child(store()).child('categories').push(cat);
  }

  handleUpdateCategory(uid, cat) {
    //firebase.database().ref().child('company').child(this.state.companyuid).child('categories').child(uid).update(cat);
  }

  handleActiveCategory(cat) {
    axios.post(API + 'updateCategory.php', {"category_name":cat.category_name, "active" : !cat.active, "image" : cat.image, "description" : cat.description, "categoryid" : cat.categoryid})
      .then(res => {

      })
    /*
    firebase.database().ref().child('company').child(this.state.companyuid).child('categories').child(uid).update({"active" : !active});
    */
  }

  handleActive(cat) {
    if(cat.active === 1) {
      cat.active = 0;
    } else {
      cat.active = 1;
    }
    
    axios.post(API + "updateCategory.php", cat).then(res => {
    });

    let active = cat.active === 1 ? "activado" : "desactivado";
    alert("Se ha " + active + " la Categoria.");
  }

  addCategory(e) {
    this.props.history.push("/category/0");
  }

  edit(categoryid) {
    this.props.history.push("/category/" + categoryid);
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
            <button className="btn btn-primary btn-sm" onClick={this.addCategory.bind(this)}>+ Agregar Categoria</button>
              <br />
              <br />
               <h3>Categorias</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Categoria</b></th>
      <th scope="col"><b>Description</b></th>
      <th scope="col"><b>Imagen</b></th>
      <th scope="col"><b>Activo</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.category_name}</th>
        <th>{cat.description}</th>
            <th><img src={cat.image} witdh="30px" height="30px" alt="Imagen de la Categoria" /></th>
        <th>
        {cat.active == 1 ? (
        <button class="badge badge-danger" name="is_active" onClick={this.handleActive.bind(this, cat)}>Desactivar</button>
        ) : (
          <button class="badge badge-success" name="is_active" onClick={this.handleActive.bind(this, cat)}>Activar</button>
        )
        }
        </th>
        <th>
          <button onClick={this.edit.bind(this, cat.categoryid)} class="badge badge-warning">Editar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>


            </div>
        );
    }
}

export { CategoriesPage };