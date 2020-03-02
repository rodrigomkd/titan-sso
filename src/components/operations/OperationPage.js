import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class OperationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
    }

  componentDidMount() {
    let ID = this.props.match.params.id;

    axios.post(API + 'getReportsX.php', {"turnid":ID})
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
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
               <h3>Cortes de Caja (Tipo X)</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Inicio Ope.</b></th>
      <th scope="col"><b>Fecha/Hora</b></th>
      <th scope="col"><b>Caja</b></th> 
      <th scope="col"><b>No. Ventas</b></th>
      <th scope="col"><b>Tarjeta</b></th>
      <th scope="col"><b>Efectivo</b></th>
      <th scope="col"><b>Propinas</b></th>
      <th scope="col"><b>Fondo Inicial</b></th>
      <th scope="col"><b>Retiros</b></th>
      <th scope="col"><b>Total Efectivo</b></th>      
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.start_date}</th>
        <th>{cat.date} {cat.time}</th>
        <th>{cat.name}</th>
        <th>{cat.sales_count}</th>
        <th>{cat.card}</th>
        <th>{cat.cash}</th>
        <th>{cat.tips}</th>
        <th>{cat.transactions}</th>
        <th>{cat.initial_found}</th>
        <th>{cat.total_cash}</th>      
      </tr>
    )}
  </tbody>
</table>


            </div>
        );
    }
}

export { OperationPage };