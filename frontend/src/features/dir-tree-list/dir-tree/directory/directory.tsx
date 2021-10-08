import React, { useState, FunctionComponent, ReactNode, MouseEvent } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import cn from 'classnames';

import './directory.scss';

interface DirectoryProps {
    name: string
    children: ReactNode;
}
const CN = 'directory';

export const Directory: FunctionComponent<DirectoryProps> = ({ name, children }: DirectoryProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (e: MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className={CN}>
            <div className={`${CN}__label`} onClick={handleToggle}>
                <AiOutlineFolder />
                <span className={`${CN}__label__name`}>{name}</span>
            </div>
            <div className={cn(`${CN}__collapsible`, { [`${CN}__collapsible__open`]: isOpen})}>
                {children}
            </div>
        </div>
    );
};
