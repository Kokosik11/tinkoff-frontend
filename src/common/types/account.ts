export type HistoryType = {
    id: number;
    createdAt: Date;
    operation: "deposit" | "withdraw";
    amount: number;
    category?: string;
}

export type CategoryType = {
    category: string;
    limit: number | null;
}

export type AccountType = {
    email: string | null;
    nickname: string | null;
    password: string | null;
    balance: number;
    history: Array<HistoryType>;
    categories?: Array<CategoryType>;
};