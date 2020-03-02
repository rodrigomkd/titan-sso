import React from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class OrderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          categoryid: 0,
          category: '',
          description: '',
          image: null,
          active: true
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;
    this.setState({categoryid:ID});

    if(ID > 0) {
      axios.post(API + 'getCategory.php', {"categoryid":1})
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
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

  handleSubmit(e) {
    console.log("entra");
    e.preventDefault();
    let ID = this.state.categoryid;
    if(ID > 0) {
      //update
    } else {
      //add
    }
    alert("Se han guardado los cambios correctamente.");
    //const { from } = this.props.location.state || { from: { pathname: "/categories" } };
        
    this.props.history.push("/categories");
    //window.location.pathname = "/categories";
  }

  render() {
    return (
      <div className="card">
        <form className="card-body" >
         <h6>Agregar Categoria</h6>
          <div className="form-group">
            <input 
              type="text"
              name="category"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Nombre Categoria"
              required
            />
          </div>

          <div className="form-group">
            <input 
              type="text"
              name="description"
              onChange={this.handleInput.bind(this)}
              className="form-control"
              placeHolder="Descripcion"
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

export { OrderPage };