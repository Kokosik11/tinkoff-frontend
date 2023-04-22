import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AccountType } from "../types/account";

export type UserType = {
    email: AccountType['email'];
    nickname: AccountType['nickname'];
    balance: AccountType['balance'];
}

const initialState: UserType = {
    email: null,
    nickname: null,
    balance: 0,
}

const { persistAtom } = recoilPersist({
    key: 'fin-user',
    storage: localStorage,
})

export const userState = atom<UserType>({
    key: 'userState',
    default: initialState,
    effects_UNSTABLE: [persistAtom],
})