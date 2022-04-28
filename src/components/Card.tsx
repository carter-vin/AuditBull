import { DocumentCard } from '@fluentui/react';
import React from 'react';

interface CardProps {
    children?: React.ReactNode;
}

const Card = (props: CardProps) => {
    const { children } = props;
    return <DocumentCard className="p-6 rounded-md">{children}</DocumentCard>;
};

export default Card;
