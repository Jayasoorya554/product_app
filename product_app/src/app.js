import React from "react";
import ReactDOM from "react-dom";

class ProductApp extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      products: ["Apple", "Samsung", "MI", "Oppo", "Realme"],
    };
  }

  addOption(pdt) {
    this.setState((prevState) => {
      return {
        products: prevState.products.concat(pdt),
      };
    });
  }

  removeItem(pdt) {
    this.setState((prevState) => ({
      products: prevState.products.filter((value) => {
        return value !== pdt;
      }),
    }));
  }

  render() {
    const data = {
      title: "PRODUCT LIST",
    };
    return (
      <div>
        <Header first={data.title} />
        <Products products={this.state.products} removeItem={this.removeItem} />
        <Add addOption={this.addOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <center>
        <h1>{props.first}</h1>
      </center>
    </div>
  );
};

const Products = (props) => {
  return (
    <div>
      <center>
        <p>Your have {props.products.length} products</p>
        {props.products.map((pdt) => {
          return (
            <Product key={pdt} product={pdt} removeItem={props.removeItem} />
          );
        })}
      </center>
    </div>
  );
};

const Product = (props) => {
  return (
    <div>
      <center>
        <p>
          {props.product}
          <button
            onClick={(e) => {
              props.removeItem(props.product);
            }}
          >
            Remove
          </button>
        </p>
      </center>
    </div>
  );
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddoption = this.handleAddoption.bind(this);
  }

  handleAddoption(e) {
    e.preventDefault();
    const option = e.target.elements.ipfield.value.trim();
    if (option) {
      this.props.addOption(option);
    }
    e.target.elements.ipfield.value = "";
  }

  render() {
    return (
      <div>
        <center>
          <form onSubmit={this.handleAddoption}>
            <input type="text" name="ipfield" />
            <br />
            <button>Add Product</button>
          </form>
        </center>
      </div>
    );
  }
}

ReactDOM.render(<ProductApp />, document.getElementById("app"));
