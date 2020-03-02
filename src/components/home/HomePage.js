import React from 'react';
import axios from 'axios';

const API = "https://www.ep-solutions.com.mx/apps/order-app/js/"; //"https://nomada.com.mx/apps/order-app/js/";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            boxes: [],
            orders: [],
            productsTop: [],
            refresh: false
        };
    }

    async refresh() {
        axios.post(API + 'getRegisterBoxes.php', { "branchofficeid": 1 })
            .then(res => {
                const boxes = res.data;
                this.setState({ boxes });
            })

        axios.post(API + 'getOrdersOpen.php', { "branchofficeid": 1 })
            .then(res => {
                const orders = res.data;
                if (orders[0] != null) {
                    this.setState({ orders });
                }
            })

        axios.post(API + 'getUsersConnected.php', { "branchofficeid": 1 })
            .then(res => {
                const users = res.data;
                if (users[0] != null) {
                    this.setState({ users });
                }
            })

        await axios.get(API + 'getTopTenProducts.php', {  })
            .then(res => {
                const productsTop = res.data;
                if (productsTop[0] != null) {
                    this.setState({ productsTop });
                }
            })
    }

    componentDidUpdate() {
        if (this.state.refresh) {
            this.refresh();
            this.setState({"refresh" : false});
        }
    }

    componentDidMount() {
        this.refresh();
    }

    startOperation(boxid, name) {
      let initial_found = prompt("Favor de agregar el Efectivo inicial.", "");
      if (initial_found == null || initial_found === "" || isNaN(initial_found)) {
        alert("Cantidad no valida.");
        return;
      }
      
      let date = new Date();
      let formatDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      let formatTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      //verify if turn is open
      axios.post(API + `getTurnOpen.php`, { "branchofficeid" : 1 })
      .then(res => {
        if(res.data == null) {
          //create new open turn
          axios.post(API + `saveTurn.php`, { "branchofficeid" : 1, "userid" : 2, "initial_datetime" : formatDate + " " + formatTime })
          .then(res => {  })
        }
      })
      //update register box with initial found.
      let registerBox = {};
      registerBox.initial_found = initial_found;
      registerBox.registerboxid = boxid;
      registerBox.start_date = formatDate + " " + formatTime;
      
      axios.post(API + `updateRegisterBoxStart.php`, { "initial_found" : initial_found, "registerboxid" : boxid, "start_date" : formatDate + " " + formatTime })
      .then(res => { })

      //update getRegisterBoxes
      axios.post(API + 'getRegisterBoxes.php', {"branchofficeid":1})
      .then(res => {
        const boxes = res.data;
        this.setState({ boxes });
      })
        alert("Se ha iniciado la caja: " + name);
        this.setState({ "refresh": true });
    }

    render() {
        //const { user, users } = this.state;
        return (
        <div>
                <div class="jumbotron">
                    <div class="row">
                        <div class="col">
                            <h1>Bienvenido BUDA Bar!!!</h1>
                        </div>

                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Top Ten Productos</h5>
                                    <p class="card-text">
                                        <ul>
                                            {this.state.productsTop.map((cat, index) =>
                                                <li><span className="">{cat.product_name} ({cat.accum})</span></li>                                                 
                                            )}
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
          <p></p>
        </div>

        <div class="container-fluid">
  <div class="row">
    <div class="col-sm-4">
      <h3>Inicio de Operaciones</h3>
       <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Caja</b></th>
      <th scope="col"><b>Estatus</b></th>
      <th scope="col"><b>Inicio</b></th>
      <th scope="col"><b>Fin</b></th>
      <th scope="col"><b>Options</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.boxes.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.name}</th>
        <th><span className=
        {cat.style}>{cat.status}</span></th>
        <th>{cat.start_date}</th>
        <th>{cat.end_date}</th>
        
        <th>
           <p>
      {(() => {
        switch (cat.status) {
          case "Abierta": return null;
          case "Cerrada": return <button class="badge badge-success" onClick={this.startOperation.bind(this, cat.registerboxid, cat.name)}>Iniciar</button>;
          default:      return null;
        }
      })()}
    </p>
        </th>
      </tr>
    )}
  </tbody>
</table>
    </div>
    <div class="col-sm-4">
      <h3>Ordenes Activas</h3>
      <p>
         <table class="table table-sm">
  <thead>
    <tr>
                                            <th scope="col"><b>#</b></th>
                                            <th scope="col"><b>Sucursal</b></th>
                                            <th scope="col"><b>Mesa</b></th>
      <th scope="col"><b>No. Orden</b></th>
      <th scope="col"><b>Tipo</b></th>
                                            <th scope="col"><b>Fecha/Hora</b></th>
                                            <th scope="col"><b>Total</b></th>
      <th scope="col"><b>Mesero</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.orders.map((cat, index) => 
      <tr>
            <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
            <th>{cat.branch_office_name}</th>
            <th>{cat.item_name}</th>
            <th>{cat.order_number}</th>     
            <th>{cat.type}</th>
            <th>{cat.order_date} {cat.time}</th>       
            <th>{cat.total}</th>
            <th>{cat.name}</th>
      </tr>
    )}
  </tbody>
</table>
      </p>
    </div>
    <div class="col-sm-4">
      <h3>Usuarios Conectados</h3>
         <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col"><b>#</b></th>
      <th scope="col"><b>Nombre</b></th>
      <th scope="col"><b>Apellidos</b></th>
      <th scope="col"><b>Usuario</b></th>
      <th scope="col"><b>Tipo</b></th>
      <th scope="col"><b>Inicio Sesion</b></th>
    </tr>
  </thead>
  <tbody>
    {this.state.users.map((cat, index) => 
      <tr>
        <th scope="row" contenteditable={cat.editable}>{index + 1}</th>
        <th>{cat.name}</th>
        <th>{cat.last_name}</th>
        <th>{cat.username}</th>
        <th>{cat.type}</th>
        <th>{cat.login_datetime}</th>
      </tr>
    )}
  </tbody>
</table>
    </div>
  </div>
</div>
        </div>
        );
    }
}

export { HomePage };