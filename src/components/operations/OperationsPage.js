import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class OperationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedItem: 0
        };
    }

  componentDidMount() {
    axios.post(API + 'getReports.php', {"branchofficeid":1})
      .then(res => {
          const categories = res.data;
          if (categories[0] != null) {
            this.setState({ categories });
          }   
      })
  }

  goReportX(turnid) {
    this.props.history.push("/operation/" + turnid);
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
            <div class="container-fluid">
              <br />
               <h3>Cortes de Turno</h3>
               <br />
               <table class="table table-striped table-editable">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
                            <th scope="col"><b>Fecha/Hora</b></th>
                            <th scope="col"><b>Tipo</b></th>
      <th scope="col"><b>No. Ventas</b></th>
      <th scope="col"><b>Tarjeta</b></th>
      <th scope="col"><b>Efectivo</b></th>
                            <th scope="col"><b>Propinas</b></th>
      <th scope="col"><b>Retiros</b></th>
                            <th scope="col"><b>Total Efectivo</b></th>
                            <th scope="col"><b>Efectivo Caja</b></th>
                            <th scope="col"><b>Diferencia</b></th>
                            <th scope="col"><b>Tarjeta Caja</b></th>
                            <th scope="col"><b>Diferencia</b></th>
                            <th scope="col"><b>Comentarios</b></th>
                            <th scope="col"><b>Usuario</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.categories.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
            <th>{cat.date} {cat.time}</th>
            <th>{cat.type}</th>
        <th>{cat.sales_count}</th>
        <th>{cat.card}</th>
        <th>{cat.cash}</th>
        <th>{cat.tips}</th>
        <th>{cat.transactions}</th>
            <th>{cat.total_cash}</th>
            <th>{cat.register_cash}</th>
            <th>{cat.diff}</th>
            <th>{cat.register_card}</th>
            <th>{cat.diff_card}</th>
            <th>{cat.comments}</th>
        <th>{cat.name}</th>
      </tr>
    )}
  </tbody>
</table>


            </div>
        );
    }
}

export { OperationsPage };