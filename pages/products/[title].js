import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Product.module.css';
import { useCart } from '../../hooks/use-cart';
import { toSeoUrl } from '../../lib/helpers.js';
import products from '../../products.json';

export default function Product({ product }) {  

  const { id, title, image, price, description } = product;
  
  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image          
            src={image}
            alt={title}
            width={400}
            height={400}
          />          
        </div>

        <div>
          <h1>
            { title }
          </h1>

          <p className={styles.description}>
            { description }
          </p>

          <p className={styles.description}>
            ${ price.toFixed(2) }
          </p>
          
          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>

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

export async function getStaticProps({ params = {} }) {
  const product = products.find(({ title }) => `${toSeoUrl(title)}` === `${params.title}`);
  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    const { title } = product;
    return {
      params: {
        title: toSeoUrl(title),
      },
    };
  });

  return {
    paths,
    fallback: false
  };
}