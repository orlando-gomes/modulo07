import React, { Component } from 'react';
import { connect } from 'react-redux';
// Esta função liga um ActionCreator com a função dispatch
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import PropTypes from 'prop-types';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    /* Optou-se fazer a formatação aqui em vez de fazê-la no render, pois
    o render é chamado várias vezes e a função de formatação seria chamada
    6 vezes toda vez que o render fosse executado */
    const data = response.data.map((product) => ({
      ...product,
      formattedPrice: formatPrice(product.price),
    }));

    this.setState({
      products: data,
    });
  }

  /* // Antes da função mapDispatchToProps
  handleAddProduct = (product) => {
    const { dispatch } = this.props;

    dispatch(CartActions.addToCart(product));
  };
  */

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amountProduct } = this.props;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.formattedPrice}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amountProduct[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = (state) => ({
  amountProduct: state.cart.reduce((amountObj, product) => {
    amountObj[product.id] = product.amount;
    return amountObj;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  amountProduct: PropTypes.objectOf(PropTypes.number).isRequired,
};
