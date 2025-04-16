import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/auth.module.css'

const loginpage = () => {
  const router = useRouter()
  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')
  const [errmsg, seterrmsg] = useState('')
  const [loading, setloading] = useState(false)

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !pass) {
      seterrmsg('filşl all fields')
      return
    }

    try {
      setloading(true)
        // placeholder for actual api req logic
        // adjust endpoint method and payload as needed for your implementation
        // exmp:
        // const res = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ user, pass })
        // })

      setTimeout(() => {
        console.log('login successful:', user)
        router.push('/homepage')
      }, 1500)
    } catch (err) {
      seterrmsg('login error')
      setloading(false)
    }
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
              value={user}
              onChange={(e) => setuser(e.target.value)}
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

          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
          >
            {loading ? 'logging' : 'login'}
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
