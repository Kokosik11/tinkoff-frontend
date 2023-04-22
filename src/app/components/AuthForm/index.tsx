import { FC } from "react"
import { AuthFormProps } from "./types"
import { Carousel } from 'primereact/carousel';

import './styles.css';

import LogoIcon from '../../../assets/imgs/logo.svg';
import { reviewData } from "./constants";
import { ReviewCarousel } from "./elements/ReviewCarousel";

export const AuthForm: FC<AuthFormProps> = ({ children }) => {

    return (
        <div className="auth__form mx-auto my-5">
            <div className="auth__about-container">
                <header className="auth__header">
                    <img src={LogoIcon} alt="FCN Logo" />

                    <h1 className="auth__title">Control your finances with us</h1>
                    <p className="auth__description">
                        Join our financial app and start taking better control of your funds
                    </p>
                </header>

                <footer className="auth__footer">
                    <Carousel prevIcon={null} nextIcon={null} className="auth__carousel" autoplayInterval={7000} value={reviewData} numVisible={1} itemTemplate={ReviewCarousel} showNavigators={false} indicatorsContentClassName="review__points" />
                </footer>
            </div>
            <div className="auth__content">
                {children}
            </div>
        </div>
    )
}