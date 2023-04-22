
import { Avatar } from 'primereact/avatar';
import { FC } from 'react';
import { ShortAvatarProps } from '../types';

export const ShortAvatar: FC<ShortAvatarProps> = ({
    firstname,
    lastname
}) => {

    return <Avatar 
                label={`${firstname[0]}${lastname[0]}`} 
                className="mr-2" 
                size="large" 
                style={{ backgroundColor: '#FFFFFF', color: '#283CDB', borderRadius: 3 }}
            />
}