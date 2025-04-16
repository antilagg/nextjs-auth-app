import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/auth.module.css'

const registerpage = () => {
  const router = useRouter()
  const [user, setuser] = useState('')
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [passrep, setpassrep] = useState('')
  const [errmsg, seterrmsg] = useState('')
  const [loading, setloading] = useState(false)

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !email || !pass || !passrep) {
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

    try {
      setloading(true)
      // placeholder for actual api req logic
      // adjust endpoint method and payload as needed for your implementation
      // exmp:
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ user, email, pass })
      // })

      // after successful registration, redirect to login page
      setTimeout(() => {
        console.log('register succ:', user, email)
        router.push('/login')
      }, 1500)
    } catch (err) {
      seterrmsg('register error')
      setloading(false)
    }
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
              value={user}
              onChange={(e) => setuser(e.target.value)}
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
            disabled={loading}
          >
            {loading ? 'saving.' : 'register'}
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
