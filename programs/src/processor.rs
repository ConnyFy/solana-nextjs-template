use crate::error::CustomError::InvalidInstruction;
use crate::state::AccountData;
use crate::{instruction::Instruction, state::State};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
pub struct Processor;
impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = Instruction::unpack(instruction_data)?;

        match instruction {
            Instruction::InitInstruction => {
                msg!("Instruction: InitInstruction");
                Self::process_init_instruction()
            }
            Instruction::StateInstruction { ref state } => {
                msg!("Instruction: StateInstruction");
                Self::process_state_instruction(accounts, state, program_id)
            }
        }
    }
    fn process_init_instruction() -> ProgramResult {
        Ok(())
    }
    fn process_state_instruction(
        accounts: &[AccountInfo],
        state: &State,
        program_id: &Pubkey,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let account = next_account_info(account_info_iter)?;
        if !account.is_writable {
            return Err(ProgramError::IllegalOwner);
        }

        if account.owner != program_id {
            return Err(ProgramError::IncorrectProgramId);
        }

        let mut accound_data = AccountData::try_from_slice(&account.data.borrow())?;

        if state.field == "inc" {
            accound_data.field += 1;
        } else if state.field == "dec" {
            accound_data.field -= 1;
        } else {
            return Err(InvalidInstruction.into());
        }

        accound_data.serialize(&mut &mut account.data.borrow_mut()[..])?;

        Ok(())
    }
}
