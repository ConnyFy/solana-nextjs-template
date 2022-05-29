import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { deserialize, serialize } from "borsh";
import {
  AccountDataObject,
  AccountDataSchema,
  ACCOUNTDATA_SEED,
  ACCOUNTDATA_SIZE,
} from "../schemas/accountdata";
import { StateObject, StateSchema } from "../schemas/state";
import { InstructionTags } from "../utils/instruction_tags";
import { programID } from "../utils/program";

export const createAccount = async (
  connection: Connection,
  sendTransactionCb: WalletContextState["sendTransaction"],
  publicKey: PublicKey
): Promise<PublicKey> => {
  const greetedPubkey = await PublicKey.createWithSeed(
    publicKey,
    ACCOUNTDATA_SEED,
    programID
  );

  const lamports = await connection.getMinimumBalanceForRentExemption(
    ACCOUNTDATA_SIZE
  );
  const transaction = new Transaction().add(
    SystemProgram.createAccountWithSeed({
      basePubkey: publicKey,
      fromPubkey: publicKey,
      lamports,
      newAccountPubkey: greetedPubkey,
      programId: programID,
      seed: ACCOUNTDATA_SEED,
      space: ACCOUNTDATA_SIZE,
    })
  );
  sendTransactionCb(transaction, connection);
  return greetedPubkey;
};

export const getAccountData = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<AccountDataObject> => {
  const accountInfo = await connection.getAccountInfo(publicKey);
  if (accountInfo === null) {
    throw new Error("Error: cannot find the greeted account");
  }
  const accountData = deserialize(
    AccountDataSchema,
    AccountDataObject,
    accountInfo.data
  );
  return accountData;
};

export const sendStateInstruction = async (
  connection: Connection,
  sendTransactionCb: WalletContextState["sendTransaction"],
  publicKey: PublicKey,
  data: StateObject
): Promise<string> => {
  let dataSerialized = serialize(StateSchema, data);
  let dataToSend = Uint8Array.from([
    InstructionTags.StateInstruction,
    ...dataSerialized,
  ]);
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: publicKey, isSigner: false, isWritable: true }],
    programId: programID,
    data: Buffer.from(dataToSend),
  });
  return sendTransactionCb(new Transaction().add(instruction), connection);
};
