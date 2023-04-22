export type HistoryType = {
    id: number;
    createdAt: Date;
    operation: "deposit" | "withdraw";
    amount: number;
    category?: string;
}

export type AccountType = {
    email: string | null;
    nickname: string | null;
    password: string | null;
    balance: number;
    history: Array<HistoryType>;
};