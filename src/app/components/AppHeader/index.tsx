import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { useRecoilState } from 'recoil';
import { userState } from '../../../common/store/userStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const AppHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const [activeTab, setActiveTab] = useState(0);

    console.log(location.pathname);

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'History', icon: 'pi pi-fw pi-calendar'},
    ];


    const onLogoutClick = () => {
        setUser({ email: null, nickname: null, balance: 0 });
    }

    const handleTabChange = (index: number) => {
        switch (index) {
            case 0: navigate('/'); break;
            case 1: navigate('/history'); break;
        }
    }    

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setActiveTab(0);
                break;
            case '/history':
                setActiveTab(1);
                break;
            default:
                setActiveTab(0);
        }

    }, [location.pathname])

    return (
        <header className="card flex justify-content-between align-items-center px-5 shadow-1">
            <TabMenu activeIndex={activeTab} model={items} onTabChange={(e) => handleTabChange(e.index)} />
            <Button onClick={onLogoutClick} severity="secondary" label="Log out" rounded outlined size="small" />
        </header>
    )
}