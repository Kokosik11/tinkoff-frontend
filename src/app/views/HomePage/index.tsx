import { useRecoilState } from "recoil"
import { userState } from "../../../common/store/userStore"
import { useState } from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { BalanceDialog } from "./components/BalanceDialog";

export const HomePage = () => {
    const [user, setUser] = useRecoilState(userState);

    const [depositDialogOpen, setDepositDialogOpen] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

    return (
        <section className="balance w-full">
            <div className="mt-5 mx-5">
                <h2>Your balance: <span className="text-primary">{user.balance} RUB</span></h2>
                <div className="mt-3 flex gap-2">
                    <Button label="Deposit" onClick={() => setDepositDialogOpen(true)} icon="pi pi-plus" rounded />
                    <Button label="Withdraw" onClick={() => setWithdrawDialogOpen(true)} icon="pi pi-minus" severity="danger" rounded />
                </div>

                <BalanceDialog 
                    type="deposit" 
                    visible={depositDialogOpen} 
                    setVisible={setDepositDialogOpen} 
                />
                <BalanceDialog 
                    type="withdraw" 
                    visible={withdrawDialogOpen} 
                    setVisible={setWithdrawDialogOpen} 
                />
            </div>
        </section>
    )
}