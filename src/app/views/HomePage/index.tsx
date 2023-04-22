import { useRecoilState } from "recoil"
import { userState } from "../../../common/store/userStore"
import { useEffect, useState } from "react";

import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { BalanceDialog } from "./components/BalanceDialog";
import { CategoryDialog } from "./components/CategoryDialog";
import { accountState } from "../../../common/store/accountStore";

import { Knob } from 'primereact/knob';

export const HomePage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [account, setAccount] = useRecoilState(accountState);

    const getCategories = () => {
        return account.find(_acc => _acc.email === user.email)?.categories ?? [];
    }

    const getBalanceByCategory = (category: string) => {
        if (category === "Without category") {
            const without = account.find(_acc => _acc.email === user.email)?.history.filter(_h => {
                return (!_h.category && _h.operation !== 'deposit')
            });

            return without?.reduce((a, b) => a + b.amount, 0) ?? 0;
        } 
        else if (category === "Total") {
            const total = account.find(_acc => _acc.email === user.email)?.history.filter(_h => _h.operation !== 'deposit');
            return total?.reduce((a, b) => a + b.amount, 0) ?? 0;
        } else {
            const withCat = account.find(_acc => _acc.email === user.email)?.history.filter(_h => {
                return (_h.category === category && _h.operation !== 'deposit')
            });

            return withCat?.reduce((a, b) => a + b.amount, 0) ?? 0;
        }
    }

    const [depositDialogOpen, setDepositDialogOpen] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

    useEffect(() => {
        getBalanceByCategory("Without category");
    }, [account])

    return (
        <section className="balance w-full px-5">
            <div className="mt-5">
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

            <div className="mt-8">
                <div className="flex justify-content-between align-items-center">
                    <h2>Categories</h2>
                    <Button onClick={() => setCategoryDialogOpen(true)} label="Create category" icon="pi pi-plus" className="p-button-success" rounded size="small" />
                </div>

                <CategoryDialog 
                    visible={categoryDialogOpen} 
                    setVisible={setCategoryDialogOpen}
                />

                <div className="flex flex-wrap gap-5 mt-5">
                    <div className="w-2 flex gap-2 flex-column align-items-center">
                        <Knob value={getBalanceByCategory("Total")} max={getBalanceByCategory("Total")} />
                        <div className="text-primary">RUB Total cost</div>
                    </div>

                    <div className="w-2 flex gap-2 flex-column align-items-center">
                        <Knob value={getBalanceByCategory("Without category")} max={getBalanceByCategory("Without category")} />
                        <div className="text-primary">RUB Without category</div>
                    </div>

                    { getCategories().map((item, index) => (
                         <div key={`${item.category}-${index}`} className="w-2 flex gap-2 flex-column align-items-center">
                            <Knob value={getBalanceByCategory(item.category)} max={item.limit ?? 0} />
                            <div className="text-primary flex flex-column align-items-center">
                                RUB {item.category} 
                                <div>(limit {item.limit})</div>
                            </div>
                        </div>
                    )) }
                </div>

            </div>
        </section>
    )
}