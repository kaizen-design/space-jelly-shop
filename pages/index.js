import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import products from '../products.json';
import { useCart } from '../hooks/use-cart.js';
import { FaShoppingCart } from 'react-icons/fa';
import { toSeoUrl } from '../lib/helpers';

export default function Home() {

  const { subtotal, quantity, addToCart, checkout } = useCart();  

  return (
    <div className={styles.container}>
      <Head>
        <title>Space Jelly Shop</title>
        <meta name="description" content="The best space jellyfish swag on the web!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Space Jelly Shop
        </h1>

        <p className={styles.description}>
          The best space jellyfish swag on the web!
        </p>

        <p className={styles.cart}>
          <span><strong>Items:</strong> {quantity}</span>
          <span><strong>Total:</strong> ${subtotal.toFixed(2)}</span>
          <span>
            <button className={styles.button} onClick={checkout}>
              <FaShoppingCart />
              Check out
            </button>
          </span>
        </p>

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, description, image, price } = product;
            return (
              <li key={id} className={styles.card}>  
                <Link href={`/products/${toSeoUrl(title)}`}>
                  <a>
                    <img src={image} alt={title} />
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p className={styles.price}>${price.toFixed(2)}</p>
                  </a>  
                </Link>                              
                <p>
                  <button className={styles.button} onClick={() => addToCart({ id })}>
                    Add to Cart
                  </button>
                </p>                
              </li> 
            )  
          })}          
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}