import '@/styles/globals.css'
import store from '@/provider/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
export default function App({ Component, pageProps }) {
  return( 
    <Provider store={store}>
      <Toaster/>
    <Component {...pageProps} />
  </Provider>)
}
