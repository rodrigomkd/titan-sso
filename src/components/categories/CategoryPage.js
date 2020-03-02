import React from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          categoryid: 0,
          category_name: null,
          description: null,
          image: null,
          active: true
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;
    this.setState({categoryid:ID});

    if(ID > 0) {
      axios.post(API + 'getCategory.php', {"categoryid":ID})
      .then(res => {
        const category = res.data;
        this.setState(category);
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

  async handleSubmit(e) {
    e.preventDefault();
    let ID = this.state.categoryid;
    if(ID > 0) {
      //update
      await axios.post(API + 'updateCategory.php', this.state)
      .then(res => {
        console.log(res);
      });
    } else {
      //add
      await axios.post(API + 'saveCategory.php', {"category_name":this.state.category, "active" : 1, "image" : this.state.image, "description" : this.state.description})
      .then(res => {
        console.log(res);
      });
    }

    alert("Se han guardado los cambios correctamente.");       
    this.props.history.push("/categories");
  }

  render() {
    return (
      <div className="card">
        <form className="card-body" >
         <h6>Formulario - Categoria</h6>
          <div className="form-group">
            <input 
              type="text"
              name="category_name"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Nombre Categoria"
              required
              value={this.state.category_name}
            />
          </div>

          <div className="form-group">
            <input 
              type="text"
              name="description"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Descripcion"
              value={this.state.description}
            />
          </div>

          <div className="form-group">
            <FileBase64
              multiple={ false }
              onDone={ this.getFiles.bind(this) } 
              accept="image/*"
            />
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

export { CategoryPage };