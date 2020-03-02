import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
    }

  refresh() {
    //categories
    axios.post(API + "getAllProducts.php", {"branchofficeid":1})
      .then(res => {
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
    this.props.history.push("/product/0");
  }

  edit(productid) {
    this.props.history.push("/product/" + productid);
  }

  async handleActive(cat) {
    cat.active = !cat.active;
    await axios.post(API + "updateProductActive.php", cat).then(res => {
      console.log(res);
    });
    console.log(cat);
    let active = cat.active === true ? "activado" : "desactivado";
    alert("Se ha " + active + " el Producto.");
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
            <button className="btn btn-primary btn-sm" onClick={this.addCategory.bind(this)}>+ Agregar Producto</button>
              <br />
              <br />
               <h3>Productos</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Nombre Producto</b></th>
      <th scope="col"><b>Categoria</b></th>
      <th scope="col"><b>Descripcion</b></th>
      <th scope="col"><b>Precio</b></th>
      <th scope="col"><b>Imagen</b></th>
      <th scope="col"><b>Activo</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.product_name}</th>
        <th>{cat.category_name}</th>
        <th>{cat.description}</th>
        <th>$ {cat.price}</th>
            <th><img src={cat.image} witdh="30px" height="30px" alt="Imagen del Producto" />
        </th>
        <th>
        {cat.active == 1 ? (
        <button class="badge badge-danger" name="is_active" onClick={this.handleActive.bind(this, cat)}>Desactivar</button>
        ) : (
          <button class="badge badge-success" name="is_active" onClick={this.handleActive.bind(this, cat)}>Activar</button>
        )
        }
        </th>
        <th>
          <button onClick={this.edit.bind(this, cat.productid)} class="badge badge-warning">Editar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>
            </div>
        );
    }
}

export { ProductsPage };