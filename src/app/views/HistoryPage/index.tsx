import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRecoilState } from 'recoil';
import { accountState } from '../../../common/store/accountStore';
import { userState } from '../../../common/store/userStore';
import { useEffect, useState } from 'react';
import { HistoryType } from '../../../common/types/account';
import { Tag } from 'primereact/tag';

export const HistoryPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [account, setAccount] = useRecoilState(accountState);
    
    const [items, setItems] = useState<HistoryType[]>([]);

    useEffect(() => {
        if (user && account && account.length > 0) {
            setItems(account.find(_acc => _acc.email === user.email)?.history ?? []);
        }
    }, [account])

    const getSeverity = (status: HistoryType["operation"]) => {
        switch (status) {
            case "deposit":
                return "success";
            case "withdraw":
                return "danger";
        }
    }
    
    const statusBodyTemplate = (rowData: HistoryType) => {
        return <Tag value={rowData.operation} severity={getSeverity(rowData.operation)} />;
    };

    const dateBodyTemplate = (rowData: HistoryType) => {
        return new Date(rowData.createdAt).toLocaleString();
    }

    return (
        <section className="mx-5 my-5">
            <h2 className="text-primary">History</h2>

            <div className='mt-5'>
                <DataTable value={items} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
                    <Column field="createdAt" header="Date" sortable style={{ width: '25%' }} body={dateBodyTemplate}></Column>
                    <Column field="operation" header="Operation type" sortable style={{ width: '25%' }} body={statusBodyTemplate}></Column>
                    <Column field="amount" header="Amount" sortable style={{ width: '25%' }}></Column>
                </DataTable>
            </div>
        </section>
    )
}
