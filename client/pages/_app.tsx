import "../styles/globals.css";
import type { AppProps } from "next/app";
import ClientWalletProvider from "../contexts/ClientWalletProvider";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientWalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientWalletProvider>
  );
}

export default MyApp;
