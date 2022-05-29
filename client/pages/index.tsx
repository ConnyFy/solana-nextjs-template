import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import { InitialInstructionComponent } from "../components/InitialInstructionComponent";
import { StateInstructionComponent } from "../components/StateInstructionComponent";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SolanApp</title>
        <meta
          name="description"
          content="NextJS front end of a Solana application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InitialInstructionComponent />
      <StateInstructionComponent />
    </div>
  );
};

export default Home;
