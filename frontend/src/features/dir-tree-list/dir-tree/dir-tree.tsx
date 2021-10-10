import React, { FunctionComponent } from 'react';
import { Directory } from './directory';
import { FileItem } from './file-item';
import { IDirTreeStructure } from '../../../interfaces';

import './dir-tree.scss';

interface DirTreeProps {
    structure: IDirTreeStructure;
}
const CN = 'dir-tree';

export const DirTree: FunctionComponent<DirTreeProps> = ({ structure }: DirTreeProps) => {
    const renderTreeRecursively = (data: IDirTreeStructure) => Object.keys(data).map(item => {
        // if item has no children, it is a file and we render <File />
        if (data[item] === null) {
            return <FileItem key={item} name={item} />;
        } else {
            // if item has children, it is a directory and we render <Directory />
            return (
                <Directory key={item} name={item}>
                    {/* Recursive Call */}
                    {renderTreeRecursively(data[item] as IDirTreeStructure)}
                </Directory>
            );
        }
    });

    return (
        <div className={CN}>
            {renderTreeRecursively(structure)}
        </div>
    );
};
