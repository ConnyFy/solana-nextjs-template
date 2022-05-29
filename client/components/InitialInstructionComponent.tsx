import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { sendInitialInstruction } from "../actions/initialInstruction";

export const InitialInstructionComponent = () => {
  const { connection } = useConnection();
  const { connected, sendTransaction } = useWallet();

  const handleClick = async (_event: React.MouseEvent<HTMLElement>) => {
    console.log("Hello");
    if (connected) {
      const result = await sendInitialInstruction(connection, sendTransaction);
      console.log(result);
    }
  };

  return (
    <div className="my-4">
      <div className="divider">Initial Instruction</div>
      <button className="btn btn-primary" onClick={handleClick}>
        Send Initial Instuction
      </button>
    </div>
  );
};
