import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AccountType } from "../types/account";

const initialState: AccountType[] = []

const { persistAtom } = recoilPersist({
    key: 'fin-accounts',
    storage: localStorage,
})

export const accountState = atom<AccountType[]>({
    key: 'accountState',
    default: initialState,
    effects_UNSTABLE: [persistAtom],
    dangerouslyAllowMutability: true,
})