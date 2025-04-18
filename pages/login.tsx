import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/auth.module.css'
import { useAuth } from '../contexts/AuthContext'

const loginpage = () => {
  const router = useRouter()
  const { login, loading: authLoading, error: authError, user: authUser } = useAuth()
  const [username, setusername] = useState('')
  const [pass, setpass] = useState('')
  const [rememberme, setrememberme] = useState(false)
  const [errmsg, seterrmsg] = useState('')

  useEffect(() => {
    if (authUser) {
      router.push('/homepage')
    }
  }, [authUser, router])

  useEffect(() => {
    if (authError) {
      seterrmsg(authError)
    }
  }, [authError])

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !pass) {
      seterrmsg('fill all fields')
      return
    }

    seterrmsg('')

    await login(username, pass, rememberme)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formbox}>
        <h1 className={styles.title}>login</h1>

        {errmsg && <div className={styles.error}>{errmsg}</div>}

        <form onSubmit={handlesubmit} className={styles.form}>
          <div className={styles.inputgroup}>
            <label htmlFor="user">username</label>
            <input
              type="text"
              id="user"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputgroup}>
            <label htmlFor="pass">pass</label>
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.checkboxgroup}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberme}
              onChange={(e) => setrememberme(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="remember">remember me</label>
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={authLoading}
          >
            {authLoading ? 'logging' : 'login'}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/register" className={styles.link}>
            no acc? register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default loginpage
