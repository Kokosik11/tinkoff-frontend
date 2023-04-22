import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from "react";
import { FormValuesType } from "./types";
import { Toast } from "primereact/toast";
import { useRecoilState } from "recoil";
import { accountState } from "../../../../common/store/accountStore";


export const SignupPage = () => {
    const [formValues, setFormValues] = useState<FormValuesType>({
        email: "",
        nickname: "",
        password: "",
        repeatPassword: "",
    });

    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const [account, setAccount] = useRecoilState(accountState);


    const showError = (detail: string) => {
        toast.current?.show({severity:'error', summary: 'Ошибка', detail, life: 3000});
    }

    const showSuccess = (detail: string) => {
        toast.current?.show({severity:'success', summary: 'Успешно', detail, life: 3000});
    }

    const onSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, nickname, password, repeatPassword } = formValues;

        if (email === "" || nickname === "" || password === "" || repeatPassword === "") {
            return showError('Please fill in all fields');
        }

        if (password !== repeatPassword) {
            return showError('Password mismatch');
        }

        if (password.length < 6) {
            return showError('Password must be at least 6 characters');
        }

        if (account.some(a => a.email === email)) {
            return showError('Email already exists');
        }

        setAccount(users => [...users, { email, nickname, password, balance: 0, history: [] }]);

        showSuccess('You have successfully sign up!');
        navigate('/');
    }

    return (
        <div className="auth__container">
            <Toast ref={toast} />

            <h2 className="auth__heading">Sign up <span className="senid">FCN<span className="senid__id">ID</span></span></h2>
            <div className="auth__desc">
                Create a new account<br />
            </div>

            <form onSubmit={onSignupSubmit}>
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
                    <label htmlFor="nickname">Nickname</label>
                    <InputText 
                        value={formValues?.nickname} 
                        onChange={(e) => setFormValues({...formValues, nickname: e.target.value })}
                        className="border-round-sm" 
                        placeholder="Enter your nickname"  
                        id="nickname" 
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

                <div className="flex flex-column gap-2 mt-4">
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <InputText 
                        value={formValues?.repeatPassword} 
                        onChange={(e) => setFormValues({...formValues, repeatPassword: e.target.value })}
                        type="password"
                        className="border-round-sm" 
                        placeholder="********" 
                        id="repeatPassword" 
                    />
                </div>

                <Button className="button__blue w-full flex align-items-center justify-content-center mt-5 border-round-sm">Create account</Button>
                <div className="mt-3 auth__signup">
                    Already have an account? <Link to='/' className="auth__link">Log in</Link>
                </div>
            </form>
        </div>
    )
}