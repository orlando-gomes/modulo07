import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amountProduct = useSelector((state) =>
    state.cart.reduce((amountObj, product) => {
      amountObj[product.id] = product.amount;
      return amountObj;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      /* Optou-se fazer a formatação aqui em vez de fazê-la no render, pois
    o render é chamado várias vezes e a função de formatação seria chamada
    6 vezes toda vez que o render fosse executado */
      const data = response.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  /* // Antes da utilização dos hooks
  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map((product) => ({
      ...product,
      formattedPrice: formatPrice(product.price),
    }));

    this.setState({
      products: data,
    });
  }
  */

  /* // Antes da função mapDispatchToProps
  handleAddProduct = (product) => {
    const { dispatch } = this.props;

    dispatch(CartActions.addToCart(product));
  };
  */

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
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
