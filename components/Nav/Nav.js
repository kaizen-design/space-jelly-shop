import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/use-cart';

import styles from './Nav.module.css';

const Nav = () => {  
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>
        <Link href="/">
          <a>
            Space Jelly Shop
          </a>  
        </Link>  
      </p>
      <p className={styles.navCart}>
        <button onClick={checkout}>
          <FaShoppingCart /> ${subtotal.toFixed(2)}
        </button>
      </p>
    </nav>
  )
}

export default Nav;