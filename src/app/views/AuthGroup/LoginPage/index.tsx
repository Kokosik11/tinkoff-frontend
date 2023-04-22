import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './styles.css';
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useState, useRef, FormEvent } from "react";
import { FormValuesType } from "./types";
import { useRecoilState } from "recoil";
import { userState } from "../../../../common/store/userStore";
import { accountState } from "../../../../common/store/accountStore";

export const LoginPage = () => {
    const [formValues, setFormValues] = useState<FormValuesType>({
        email: "",
        password: "",
    });

    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const [user, setUser] = useRecoilState(userState);
    const [account, setAccount] = useRecoilState(accountState);

    const showError = (detail: string) => {
        toast.current?.show({severity:'error', summary: 'Ошибка', detail, life: 3000});
    }

    const showSuccess = (detail: string) => {
        toast.current?.show({severity:'success', summary: 'Успешно', detail, life: 3000});
    }

    const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;

        if (email === "" || password === "") {
            return showError('Please fill in all fields');
        }

        const _user = account.find(_u => _u.email === email)

        if (_user === undefined) {
            return showError('User not found');
        }
        if (_user.password === password) {   
            showSuccess('You have successfully logged in!');
            setUser({ email, nickname: _user.nickname, balance: _user.balance });
            navigate('/');
            return;
        } else {
            showError('Incorrect nickname and/or password!');
        }
    }

    return (
        <div className="auth__container">
            <Toast ref={toast} />

            <h2 className="auth__heading">Log in <span className="senid">FCN<span className="senid__id">ID</span></span></h2>
            <div className="auth__desc">
                Log in to your <span className="senid">FCN<span className="senid__id">ID</span></span> account<br />
            </div>

            <form onSubmit={onLoginSubmit}>
                <div className="flex flex-column gap-2 mt-4">
                    <label htmlFor="email">Email</label>
                    <InputText 
                        value={formValues?.email} 
                        onChange={(e) => setFormValues({...formValues, email: e.target.value })}
                        className="border-round-sm" 
                        type="email" 
                        placeholder="example@gmail.com" 
                        id="email" 
                    />
                </div>
                
                <div className="flex flex-column gap-2 mt-4">
                    <label htmlFor="password">Password</label>
                    <InputText 
                        value={formValues?.password} 
                        onChange={(e) => setFormValues({...formValues, password: e.target.value })}
                        type="password"
                        className="border-round-sm" 
                        placeholder="********" 
                        id="password" 
                    />
                </div>

                <Button className="button__blue w-full flex align-items-center justify-content-center mt-5 border-round-sm">Log in</Button>
                <div className="mt-3 auth__signup">
                    Don't have an account yet? <Link to='/signup' className="auth__link">Sign up</Link>
                </div>
            </form>
        </div>
    )
}