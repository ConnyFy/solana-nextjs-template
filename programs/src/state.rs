use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct State {
    pub field: String,
}
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct AccountData {
    pub field: u32,
}
