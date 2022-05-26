use crate::{error::CustomError::InvalidInstruction, state::State};
use borsh::BorshDeserialize;
use solana_program::program_error::ProgramError;

#[derive(Debug)]
pub enum Instruction {
    /// Initialize a new account
    ///
    /// Accounts expected
    ///
    /// 1. `[writable]` The account to be initialized
    InitInstruction,
    StateInstruction {
        state: State,
    },
}

impl Instruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => Self::InitInstruction,
            1 => Self::StateInstruction {
                state: State::try_from_slice(&rest)?,
            },
            _ => return Err(InvalidInstruction.into()),
        })
    }
}
