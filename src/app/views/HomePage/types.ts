
export type BalanceDialogProps = {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
    readonly type: "deposit" | "withdraw";
}