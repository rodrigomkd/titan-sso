import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class TurnsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          categories: []
        };
    }

  componentDidMount() {
    axios.post(API + 'getTurns.php', {"branchofficeid":1})
      .then(res => {
          const categories = res.data;
          if (categories[0] != null) {
            this.setState({ categories });
          } 
      })
  }

  addCategory(e) {
    this.props.history.push("/category/0");
    }

    goOrdersTurn(turnid) {
        this.props.history.push("/turn/" + turnid);
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
          <h3>Turnos</h3>                     
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
                      <th scope="col"><b>Fecha/Hora Inicio</b></th>
                      <th scope="col"><b>Fecha/Hora Fin</b></th>
                      <th scope="col"><b>No. Ventas</b></th>
                      <th scope="col"><b>Opciones</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
            <th>{cat.initial_datetime}</th>
            <th>{cat.finish_datetime}</th>
            <th>{cat.order_count}</th> 
            <th>
                <button onClick={this.goOrdersTurn.bind(this, cat.turnid)} class="badge badge-secondary">Ver Ventas</button>
            </th>
      </tr>
    )}
  </tbody>
</table>
            </div>
        );
    }
}

export { TurnsPage };