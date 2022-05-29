import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { InstructionTags } from "../utils/instruction_tags";
import { programID } from "../utils/program";

export const sendInitialInstruction = async (
  connection: Connection,
  sendTransactionCb: WalletContextState["sendTransaction"]
): Promise<string> => {
  let data_to_send = new Uint8Array([InstructionTags.InitInstruction]);
  const instruction = new TransactionInstruction({
    keys: [],
    programId: programID,
    data: Buffer.from(data_to_send),
  });
  return sendTransactionCb(new Transaction().add(instruction), connection);
};
