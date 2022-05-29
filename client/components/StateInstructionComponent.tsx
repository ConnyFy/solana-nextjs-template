import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import {
  createAccount,
  getAccountData,
  sendStateInstruction,
} from "../actions/stateInstruction";
import { AccountDataObject } from "../schemas/accountdata";
import { StateObject } from "../schemas/state";

export const StateInstructionComponent = () => {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();
  const [accountAddress, setAccountAddress] = useState("");

  const handleCreateAccount = async (_event: React.MouseEvent<HTMLElement>) => {
    if (connected && publicKey) {
      const result = await createAccount(
        connection,
        sendTransaction,
        publicKey
      );
      console.log(result);
      setAccountAddress(result.toString());
    }
  };
  const handleGetAccountInfo = async (
    _event: React.MouseEvent<HTMLElement>
  ) => {
    if (connected) {
      const result = await getAccountData(
        connection,
        new PublicKey(accountAddress)
      );
      console.log(result);
    }
  };
  const handleIncrement = async (_event: React.MouseEvent<HTMLElement>) => {
    if (connected) {
      const data = new StateObject({ field: "inc" });
      const result = await sendStateInstruction(
        connection,
        sendTransaction,
        new PublicKey(accountAddress),
        data
      );
      console.log(result);
    }
  };
  const handleDecrement = async (_event: React.MouseEvent<HTMLElement>) => {
    if (connected) {
      const data = new StateObject({ field: "dec" });
      const result = await sendStateInstruction(
        connection,
        sendTransaction,
        new PublicKey(accountAddress),
        data
      );
      console.log(result);
    }
  };
  const handleInvalid = async (_event: React.MouseEvent<HTMLElement>) => {
    if (connected) {
      const data = new StateObject({ field: "x" });
      const result = await sendStateInstruction(
        connection,
        sendTransaction,
        new PublicKey(accountAddress),
        data
      );
      console.log(result);
    }
  };

  return (
    <div className="my-4">
      <div className="divider">State Instruction</div>
      <div className="my-2">
        <button className="btn btn-primary mr-2" onClick={handleCreateAccount}>
          Create data account
        </button>
        <button className="btn btn-primary" onClick={handleGetAccountInfo}>
          Get data account data
        </button>
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          value={accountAddress}
          onChange={(e) => setAccountAddress(e.target.value)}
        />
      </div>

      <div className="my-2">
        <button className="btn btn-primary mr-2" onClick={handleIncrement}>
          Increment data
        </button>
        <button className="btn btn-primary" onClick={handleDecrement}>
          Decrement data
        </button>
      </div>
      <div className="my-2">
        <button className="btn btn-error" onClick={handleInvalid}>
          Invalid state instruction
        </button>
      </div>
    </div>
  );
};
