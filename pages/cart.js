import Head from 'next/head';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Cart.module.css';
import { useCart } from '../hooks/use-cart';
import products from '../products.json';
import { toSeoUrl } from '../lib/helpers';
import Table from '../components/Table';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name'
  },
  {
    columnId: 'quantity',
    Header: 'Quantity'
  },
  {
    columnId: 'pricePerUnit',
    Header: 'Price Per Item'
  },
  {
    columnId: 'total',
    Header: 'Item Total'
  }
];

export default function Cart() {
  
  const { cartItems, checkout, updateItem, subtotal } = useCart();

  const data = cartItems.map(({ id, quantity, pricePerUnit }) => {
    const product = products.find(({ id: pid }) => pid === id);
    const { title } = product || {};

    const Quantity = () => {
      function handleOnSubmit(e) {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(input => input.name === 'quantity')?.value;

        updateItem({
          id,
          quantity: quantity && parseInt(quantity)
        });
      }

      return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
          <input name="quantity" type="number" min={0} defaultValue={quantity} />
          <button className={styles.button}>Update</button>
        </form>
      )
    }

    const Title = () => {
      return (
        <Link href={`/products/${toSeoUrl(title)}`}>
          {title}
        </Link>
      )
    }

    return {
      id,
      title: <Title />,
      quantity: <Quantity />,
      pricePerUnit: `\$${pricePerUnit.toFixed(2)}`,
      total: `\$${(quantity * pricePerUnit).toFixed(2)}`
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />
        <p className={styles.total}>Total: ${subtotal.toFixed(2)}</p>

        <p className={styles.checkout}>          
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}