import { AppProps } from 'next/app'
import '../styles/globals.css'

const myapp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default myapp
