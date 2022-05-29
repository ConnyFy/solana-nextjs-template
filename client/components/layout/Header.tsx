import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="navbar bg-slate-200 flex-initial items-start px-8 py-4">
      <Image
        src="/solana-sol-logo.svg"
        alt="Solana Logo"
        width={48}
        height={48}
      />
      <div className="ml-auto">
        <WalletModalProvider>
          <WalletMultiButton className="!btn !btn-primary" />
        </WalletModalProvider>
      </div>
    </div>
  );
};
