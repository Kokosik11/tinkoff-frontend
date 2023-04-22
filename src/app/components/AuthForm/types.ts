import { ReactNode } from "react"


export type AuthFormProps = {
    readonly children: ReactNode;
}

export type ReviewType = {
    readonly id: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly role: string;
    readonly review: string;
}

export type ShortAvatarProps = {
    readonly firstname: string;
    readonly lastname: string;
}