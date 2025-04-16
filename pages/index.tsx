import { useRouter } from 'next/router'
import styles from '../styles/home.module.css'

const homepage = () => {
  const router = useRouter()

  const gotologin = () => {
    router.push('/login')
  }

  const gotoregister = () => {
    router.push('/register')
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>basic login</h1>

        <p className={styles.infomsg}>
          built this to improve myself — not a serious project but ill apply what I learn over time.
        </p>

        <div className={styles.btngroup}>
          <button onClick={gotologin} className={styles.btn}>login</button>
          <button onClick={gotoregister} className={styles.btn}>register</button>
        </div>
      </div>
    </div>
  )
}

export default homepage
