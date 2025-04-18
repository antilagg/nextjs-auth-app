import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/homepage.module.css'
import { useAuth } from '../contexts/AuthContext'

const homepage = () => {
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>welcome</h1>

        {user && (
          <p className={styles.username}>
            hello, {user.username}!
          </p>
        )}

        <p className={styles.infomsg}>
          built this to improve myself — not a serious project but ill apply what I learn over time.
        </p>

        <button onClick={logout} className={styles.btn}>logout</button>
      </div>
    </div>
  )
}

export default homepage
