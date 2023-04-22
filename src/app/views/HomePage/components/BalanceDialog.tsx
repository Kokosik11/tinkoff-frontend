import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { BalanceDialogProps } from "../types";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../../common/store/userStore";
import { accountState } from "../../../../common/store/accountStore";
import { HistoryType } from "../../../../common/types/account";
import { Dropdown } from 'primereact/dropdown';


export const BalanceDialog: FC<BalanceDialogProps> = ({
    visible,
    setVisible,
    type
}) => {
    const [user, setUser] = useRecoilState(userState);
    const [account, setAccount] = useRecoilState(accountState);

    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({ category: "Without category", limit: null });

    const getCategories = () => {
        const categories = account.find(_acc => _acc.email === user.email)?.categories ?? [];

        return [{ category: "Without category", limit: null }, ...categories];
    }

    const onYesClick = () => {
        if (type === "withdraw" && user.balance + amount < 0) {
            setError("There are not enough funds on the balance sheet. Please top up your balance.");
            return;
        }

        if (type === "deposit") {
            setUser({...user, balance: user.balance + amount });
            const accountList = account.map(_acc => {
                if (_acc.email === user.email) {
                    _acc.balance = _acc.balance + amount;
                    console.log(_acc)
                    _acc.history.push({ id: _acc.history.length + 1, createdAt: new Date(), operation: "deposit" as HistoryType["operation"], amount: amount })
                }
                return _acc;
            })
            setAccount(accountList);
        } else if (type === "withdraw") {
            setUser({...user, balance: user.balance + amount });
            const accountList = account.map(_acc => {
                if (_acc.email === user.email) {
                    _acc.balance = _acc.balance + amount;
                    const history: HistoryType = { id: _acc.history.length + 1, createdAt: new Date(), operation: "withdraw" as HistoryType["operation"], amount: amount };
                    if (selectedCategory.category !== "Without category") {
                        history.category = selectedCategory.category;
                    }
                    _acc.history.push(history);
                }
                return _acc;
            })

            setAmount(0);
            setAccount(accountList);
        }
        
        setVisible(false);
    }

    useEffect(() => {
        console.log(selectedCategory);
    }, [selectedCategory])

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={onYesClick} autoFocus />
        </div>
    );
    
    return (
        <Dialog 
            header={type === "deposit"? "Deposit" : "Withdraw"} 
            footer={footerContent}
            visible={visible} 
            onHide={() => setVisible(false)}
            className="w-5"
        >
            <div className="text-red-500">{ error ?? error }</div>
            <InputNumber className="w-5" value={amount} min={type === 'deposit' ? 0 : undefined} max={type === 'withdraw' ? 0 : undefined} step={5} onValueChange={(e: InputNumberValueChangeEvent) => setAmount(e.value as number)} showButtons mode="currency" currency="RUB" />
            { type === 'withdraw' ? (
                <div className="mt-3 flex flex-column gap-2 w-5">
                    <label htmlFor="category">Category</label>
                    <Dropdown value={selectedCategory} name="category" onChange={(e) => setSelectedCategory(e.value)} options={getCategories()} optionLabel="category" />
                </div>
            ) : null}
        </Dialog>
    )
}