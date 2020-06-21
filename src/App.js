import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <div className="container mt-5">
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/products/new" component={NewProduct} />
              <Route exact path="/products/edit/:id" component={EditProduct} />
            </Switch>
          </div>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
