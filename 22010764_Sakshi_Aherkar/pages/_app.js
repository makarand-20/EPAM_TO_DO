import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div style={{margin:"2% 12% 1% 12%"}}>
      <Component {...pageProps} />
    </div>
  
  )
}
