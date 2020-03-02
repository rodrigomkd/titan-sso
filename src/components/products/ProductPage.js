import React from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";//"https://nomada.com.mx/apps/order-app/js/";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          categoryid: null,
          description: null,
          productName: null,
          image: null,
          active: true,
          price: null,
          duration: null,
          categories: [],
          complements: [],
          complements2: [],
          ingredients: [],
          complementid: null,
          ingredient: null,
          sections: [{"id" : "B", "name" : "BAR"}, {"id" : "F", "name" : "BARRA FRIA"}, {"id" : "P", "name" : "PARRILLA"}],
          section: null,
          isComplement: false,
          loaded: false
        };
    }

  componentDidMount() {
    //categories
    axios.post(API + "getCategories.php", {"branchofficeid":1})
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
    })

    //complements
    axios.post(API + "getProductsComplements.php", {})
      .then(res => {
        const complements = res.data;
        if(complements[0] != null) {
          this.setState({ complements });
        }     
    })

    let ID = this.props.match.params.id;
    this.setState({productid:ID});

    if(ID > 0) {
      axios.post(API + 'getProduct.php', {"productid":ID})
      .then(res => {
        const product = res.data;
        
        this.setState({product : product});
        this.setState({
          productName : product.product_name,
          description : product.description,
          price : product.price,
          duration : product.duration,
          section : product.section,
          isComplement : product.is_complement,
          categoryid : product.categoryid,
          loaded : true
        });
        
        //get complements
        axios.post(API + 'getComplements.php', {"productid":ID})
        .then(res => {
          const product = res.data;
          console.log(product);
          if(product[0] != null) {
            this.setState({
              complements2 : product
            });
          }
        }).catch(error => console.log(error));

        //get ingredients
        axios.post(API + 'getIngredients.php', {"productid":ID})
        .then(res => {
          const product = res.data;
          if(product[0] != null) {
            let ingredients = [];
            for(let ingredient of product) {
              ingredients.push(ingredient.ingredient_name);
            }
            this.setState({
              ingredients : ingredients
            });
          }
        }).catch(error => console.log(error));
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
    if(this.state.categoryid === 0) {
      alert("Favor de seleccionar una Categoria.");
      return;
    }

    if(this.state.productName == null) {
      alert("Favor de agregar el Nombre de Producto.");
      return;
    }

    if(this.state.price == null) {
      alert("Favor de agregar el Precio.");
      return;
    }

    if(this.state.duration == null) {
      alert("Favor de agregar la Duracion.");
      return;
    }

    if(this.state.section == null) {
      alert("Favor de agregar la Seccion.");
      return;
    }

    let ID = this.state.productid;
    if(ID > 0) {
      console.log("updating product...");
      //update
      axios.post(API + "updateProduct.php", {"product_name" : this.state.productName, "price" : this.state.price,"code" : "","description" : this.state.description,"categoryid" : this.state.categoryid,"duration" : this.state.duration,"subcategoryid" : 0,"section" : this.state.section,"    is_complement" : this.state.isComplement,"preparation" : "", "image" : this.state.image, "productid" : ID})
      .then(res => {

      });

      //add complements
      if(this.state.complements2.length > 0) {
        //delete complements
        await axios.post(API + "deleteComplementsByProductId.php", {"productid" : ID})
        .then(res => {
        });

        for(let compl of this.state.complements2) {
            await axios.post(API + "saveComplement.php", {"idproduct" : ID, "idcomplement" : compl.productid})
            .then(res2 => {
            });
          } 
      }

      //add ingredientes
      if(this.state.ingredients.length > 0) {
        //delete ingredients
        await axios.post(API + "deleteIngredients.php", {"productid" : ID})
        .then(res => {
        });
        for(let compl of this.state.ingredients) {
           await axios.post(API + "saveIngredient.php", {"ingredient_name" : compl, "active" : 1, "productid" : ID})
            .then(res2 => {
            });
        } 
      }
    } else {
      //add
      axios.post(API + "saveProduct.php", {"product_name" : this.state.productName, "price" : this.state.price,"code" : "","description" : this.state.description,"categoryid" : this.state.categoryid,"duration" : this.state.duration,"subcategoryid" : 0,"section" : this.state.section,"    is_complement" : this.state.isComplement,"preparation" : ""})
      .then(res => {
        //save complements
        if(this.state.complements2.length > 0) {
          for(let compl of this.state.complements2) {
            axios.post(API + "saveComplement.php", {"idproduct" : res.data, "idcomplement" : compl.productid})
            .then(res2 => {
            });
          } 
        }
        //save ingredientes
        if(this.state.ingredients.length > 0) {
          for(let compl of this.state.ingredients) {
            axios.post(API + "saveIngredient.php", {"ingredient_name" : compl, "active" : 1, "productid" : res.data})
            .then(res2 => {
            });
          } 
        }
      });
    } //else
    alert("Se han guardado los cambios correctamente.");
        
    this.props.history.push("/products");
  }

  render() {
    return (
      <div className="container">
      <br />
         <h6>Formulario - Producto</h6>
        <form>
         <div class="row">
          <div class="col">
             <div className="form-group">
             <label>Categoria:*</label>
            <select 
              name="categoryid"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              value={this.state.categoryid}
              required
              >
              <option></option>
              {this.state.categories.map((cat, index) => 
                <option value={cat.categoryid}>{cat.category_name}</option>
              )}
            </select>
          </div>
          </div>
          <div class="col">
            <div className="form-group">
            <label>Nombre Producto:*</label>
            <input 
              type="text"
              name="productName"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Nombre Producto"
              required
              value={this.state.productName}
            />
          </div>
          </div>
          </div>

          <div class="row">
            <div class="col">
            <div className="form-group">
            <label>Descripcion:</label>
            <input 
              type="text"
              name="description"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Descripcion"
              value={this.state.description}
            />
          </div>
          </div>
          <div class="col">
            <div className="form-group">
            <label>Imagen:</label>
            <br />
            <FileBase64
              multiple={ false }
              onDone={ this.getFiles.bind(this) } 
              accept="image/*"
            />
          </div>
          </div>
          </div>

         <div class="row">
            <div class="col">
              <div className="form-group">
                <label>Precio:*</label>
                <input 
                  type="number"
                  name="price"
                  onChange={this.handleInput.bind(this)}
                  className="form-control"
                  placeHolder="Precio"
                  value={this.state.price}
                />
              </div>
            </div>

            <div class="col">
              <div className="form-group">
                <label>Duracion:*</label>
                <input 
                  type="number"
                  name="duration"
                  onChange={this.handleInput.bind(this)}
                  className="form-control"
                  placeHolder="Tiempo de Preparacion del Producto (en minutos)"
                  value={this.state.duration}
                />
              </div>
            </div>
         </div>

        <div class="row">
            <div class="col">
                            
              <div className="form-group">
          <label>Seccion:*</label>
          <br />  
          <select 
              name="section"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Complemento"
              value={this.state.section}
              >
              <option></option>
              {this.state.sections.map((cat, index) => 
                <option value={cat.id}>{cat.name}</option>
              )}
            </select>
          </div>
            </div>

            <div class="col">
            <div className="form-group">
                <label>Es un complemento: </label>
                <br />
                <label>SI/NO&nbsp;</label>
                <input
                  type="checkbox" 
                  name="isComplement"
                  className="form-group"
                  onChange={this.handleInput.bind(this)}
                  value={this.state.isComplement}
                />
              </div>
</div>
</div>

<div class="row">
  <div class="col">
  <br />
    <label><b>Complementos</b></label>
      <select 
              name="complementid"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Complemento"
              >
              <option></option>
              {this.state.complements.map((cat, index) => 
                <option value={index}>{cat.product_name}</option>
              )}
            </select>
            
            <button
              type="button" 
              name="save"
              className="btn btn-secondary btn-sm"
              onClick={this.handleAddComplement.bind(this)}
              >+ Agregar
            </button>

               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Complemento</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.complements2.map((cat, index) => 
      <tr>
        <th scope="row">{index + 1}</th>
        <th>{cat.product_name}</th>
        <th>
          <button onClick={this.handleRemoveComplement.bind(this, index)}class="badge badge-danger" >Eliminar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>
  </div>
  
  <div class="col">
  <br />
    <label><b>Ingredientes</b></label>
    <input
              type="text" 
              name="ingredient"
              className="form-control"
              placeholder="Ingrediente..."
              onChange={this.handleInput.bind(this)}
            />
            
            <button
              type="button" 
              name="save"
              className="btn btn-secondary btn-sm"
              onClick={this.handleAddIngredient.bind(this)}
              >+ Agregar
            </button>

               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Ingrediente</b></th>
      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.ingredients.map((cat, index) => 
      <tr>
        <th scope="row">{index + 1}</th>
        <th>{cat}</th>
        <th>
          <button onClick={this.handleRemoveIngredient.bind(this, index)} class="badge badge-danger" >Eliminar</button>
        </th>
      </tr>
    )}
  </tbody>
</table>
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

export { ProductPage };