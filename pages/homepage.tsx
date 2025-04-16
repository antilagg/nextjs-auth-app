import { useRouter } from 'next/router'
import styles from '../styles/homepage.module.css'

const homepage = () => {
  const router = useRouter()

  const gotohome = () => {
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>welcome</h1>

        <p className={styles.infomsg}>
          built this to improve myself — not a serious project but ill apply what I learn over time.
        </p>


        <button onClick={gotohome} className={styles.btn}>logout</button>
      </div>
    </div>
  )
}

export default homepage
