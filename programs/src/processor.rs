use crate::error::CustomError::InvalidInstruction;
use crate::{instruction::Instruction, state::State};
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
                Self::process_init_instruction(accounts, program_id)
            }
            Instruction::StateInstruction { ref state } => {
                msg!("Instruction: StateInstruction");
                Self::process_state_instruction(accounts, state, program_id)
            }
        }
    }
    fn process_init_instruction(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let account = next_account_info(account_info_iter)?;
        if !account.is_writable {
            return Err(InvalidInstruction.into());
        }

        if account.owner != program_id {
            return Err(ProgramError::IncorrectProgramId);
        }

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
            return Err(InvalidInstruction.into());
        }

        if account.owner != program_id {
            return Err(ProgramError::IncorrectProgramId);
        }

        if state.field != "" {
            return Err(ProgramError::InvalidAccountData);
        }

        Ok(())
    }
}
