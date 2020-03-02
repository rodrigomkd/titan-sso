import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/";

class OrdersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          categories: [],
          sales: 0,
          cash: 0,
          card: 0,
            total: 0,
            tips: 0,
          open: true
        };
    }

  componentDidMount() {
    axios.post(API + 'getOrdersCompleted.php', {"branchofficeid":1})
      .then(res => {
        const categories = res.data;
          if (categories[0] != null) {
              this.setState({ categories });
              let i = 0;
              for (let cat of categories) {
                  let cash = this.state.cash;
                  let card = this.state.card;
                  let total = this.state.total;
                  let tips = this.state.tips;
                  this.setState({ "cash": Number(cash) + Number(cat.cash) });
                  this.setState({ "card": Number(card) + Number(cat.card) });
                  this.setState({ "total": Number(total) + Number(cat.total) });
                  this.setState({ "tips": Number(tips) + Number(cat.tips) });
                  i++;
              }
              this.setState({ "sales": i });
          } else {
              //verify if turn is open
              axios.post(API + 'getTurnOpen.php', { "branchofficeid": 1 })
                  .then(res2 => {
                      if (res2.data == null) {
                          this.setState({ "open": false });
                      }
                  });
          }
      })
  }

  addCategory(e) {
    this.props.history.push("/category/0");
    }

    goTurns(e) {
        this.props.history.push("/turns");
    }

    render() {
        const requiredItem = this.state.selectedItem;
        if (this.state.categories === []) {
            let category = this.state.categories[requiredItem];
            if (typeof category == 'undefined') {
                category = [];
                category.category = "";
            }
        }


        return (
            <div class="container">
                <br />
                <label onClick={this.goTurns.bind(this)}><a href="#">Ventas por turno -></a></label>
                {this.state.open == true ? (
                    <div>
                    <h3>Ventas Turno Actual</h3>
                    <div class="jumbotron">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">No. Ventas</h5>
                                        <p class="card-text">{this.state.sales}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Efectivo</h5>
                                        <p class="card-text">$ {this.state.cash}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Tarjeta</h5>
                                        <p class="card-text">$ {this.state.card}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">TOTAL</h5>
                                        <p class="card-text">$ {this.state.total}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Propinas</h5>
                                        <p class="card-text">$ {this.state.tips}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <table class="table table-striped table-editable">
                        <thead>
                            <tr>
                                <th scope="col"><b>#</b></th>
                                <th scope="col"><b>No. Orden</b></th>
                                <th scope="col"><b>Caja</b></th>
                                <th scope="col"><b>Mesa</b></th>
                                <th scope="col"><b>Fecha/Hora</b></th>
                                <th scope="col"><b>Tipo</b></th>
                                <th scope="col"><b>Efectivo</b></th>
                                <th scope="col"><b>Tarjeta</b></th>
                                <th scope="col"><b>Total</b></th>
                                <th scope="col"><b>Propinas</b></th>

                                <th scope="col"><b>Mesero</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((cat, index) =>
                                <tr>
                                    <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
                                    <th>{cat.order_number}</th>
                                    <th>{cat.box_name}</th>
                                    <th>{cat.item_name}</th>
                                    <th>{cat.order_date} {cat.time}</th>
                                    <th>{cat.type}</th>
                                    <th>$ {cat.cash}</th>
                                    <th>$ {cat.card}</th>
                                    <th>$ {cat.total}</th>
                                    <th>$ {cat.tips}</th>
                                    <th>{cat.user_name}</th>
                                </tr>
                            )}
                        </tbody>
                        </table>
                        </div>
                 )
                    : (<h4>No hay Turno activo de momento.</h4>)}
          
            </div>
      )
       
    }
}

export { OrdersPage };