
export type BalanceDialogProps = {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
    readonly type: "deposit" | "withdraw";
}

export type CategoryDialogProps = {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
}