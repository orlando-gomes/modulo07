export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
/* Intl.NumberFormat retorna algumas funções, entre elas, a função format().
Estamos exportando só a format, pela desentruturação, e estamos renomeando
esta função também */
