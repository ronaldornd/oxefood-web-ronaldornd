/* n */import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class MenuSistema extends React.Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item
            name="home"
            active={this.state.activeItem === "home"}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          />

          <Menu.Item
            name="cliente"
            active={this.state.activeItem === "cliente"}
            onClick={this.handleItemClick}
            as={Link}
            to='/list-cliente'
          />

          <Menu.Item
            name="produto"
            active={this.state.activeItem === "produto"}
            onClick={this.handleItemClick}
            as={Link}
            to="/list-produto"
          />

          <Menu.Item
            name="entregador"
            active={this.state.activeItem === "entregador"}
            onClick={this.handleItemClick}
            as={Link}
            to="/list-entregador"
          />
          <Menu.Item
            name="fornecedor"
            active={this.state.activeItem === "fornecedor"}
            onClick={this.handleItemClick}
            as={Link}
            to="/list-fornecedor"
          />
          <Menu.Item
          name="Sair"
          active={this.state.activeItem === "Sair"}
          onClick={this.handleItemClick}
          os={Link}
          to="/"
          />
        </Menu>
      </div>
    );
  }
}

export default MenuSistema;
