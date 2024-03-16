import { FC } from 'react';
import { Header } from '../Header';

import './layout.css';

interface ILayoutProps {
    children: React.ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="layout__content container">{children}</div>
        </div>
    );
};
