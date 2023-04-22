import { Dialog } from "primereact/dialog"
import { ChangeEvent, FC, useState } from "react";
import { CategoryDialogProps } from "../types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { useRecoilState } from "recoil";
import { accountState } from "../../../../common/store/accountStore";
import { userState } from "../../../../common/store/userStore";


export const CategoryDialog: FC<CategoryDialogProps> = ({
    visible, 
    setVisible
}) => {
    const [user, setUser] = useRecoilState(userState);
    const [account, setAccount] = useRecoilState(accountState);

    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState(0);

    const onSaveClick = () => {
        if (!category && !limit) return setError("Please enter a category and a limit");
        setAccount(account.map(_acc => {
            if (_acc.email === user.email) {
                if (_acc.categories) {
                    _acc.categories.push({ category: category, limit: limit });
                } else {
                    _acc.categories = [{ category: category, limit: limit }];
                }
            }
            return _acc;
        }))

        setVisible(false);
    }

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={onSaveClick} autoFocus />
        </div>
    );

    return (
        <Dialog 
            header="Deposit" 
            footer={footerContent}
            visible={visible} 
            onHide={() => setVisible(false)}
            className="w-5"
        >
            <div>
                <InputText onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} placeholder="Category name" />
            </div>
            <div className="mt-3">
                <InputNumber onValueChange={(e: InputNumberValueChangeEvent) => setLimit(e.value as number)} placeholder="Category limit (number)" />
            </div>
        </Dialog>
    )
}