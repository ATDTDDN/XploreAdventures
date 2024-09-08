import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>XploreAdventures</title>
        <link rel="icon" href="/icon_2.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>
      <Component {...pageProps} />
      <div className="hidden cursor lg:block lg:custom-cursor-hidden"></div>
      <script src="/script.js"></script>
    </Provider>
  )
}
