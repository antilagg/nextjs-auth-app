import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/auth.module.css'
import { useAuth } from '../contexts/AuthContext'

const registerpage = () => {
  const router = useRouter()
  const { register, loading: authLoading, error: authError, user: authUser } = useAuth()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [passrep, setpassrep] = useState('')
  const [errmsg, seterrmsg] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      router.push('/homepage')
    }
  }, [authUser, router])

  // Update error message when auth error changes
  useEffect(() => {
    if (authError) {
      seterrmsg(authError)
    }
  }, [authError])

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !pass || !passrep) {
      seterrmsg('fill all fields')
      return
    }

    if (pass !== passrep) {
      seterrmsg('pass dont match')
      return
    }

    if (pass.length < 6) {
      seterrmsg('min 6 chars for pass')
      return
    }

    // Clear any previous error messages
    seterrmsg('')

    // Use the register function from auth context
    await register(username, email, pass)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formbox}>
        <h1 className={styles.title}>register</h1>

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
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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

          <div className={styles.inputgroup}>
            <label htmlFor="passrep">pass repeat</label>
            <input
              type="password"
              id="passrep"
              value={passrep}
              onChange={(e) => setpassrep(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={authLoading}
          >
            {authLoading ? 'saving.' : 'register'}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/login" className={styles.link}>
            have an acc? sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default registerpage
