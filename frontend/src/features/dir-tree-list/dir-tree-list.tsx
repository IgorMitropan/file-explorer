import React, { FunctionComponent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DirTree } from './dir-tree';
import { socket } from '../../socket';
import {
    addItemToDirTree,
    getDirTreeList,
    removeItemFromDirTree,
    selectDirTreeList
} from './dir-tree-list-slice';
import { IDirTreeStructure } from '../../interfaces';

import './dir-tree-list.scss';

const CN = 'dir-tree-list';

export const DirTreeList: FunctionComponent = () => {
    const dirTreeList = useAppSelector(selectDirTreeList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDirTreeList());
    }, [dispatch]);

    useEffect(() => {
        socket.on('added', payload => {
            dispatch(addItemToDirTree(payload));
        });
        socket.on('removed', payload => {
            dispatch(removeItemFromDirTree(payload));
        });
    });

    const renderTreesList = () => Object.keys(dirTreeList).map(key => (
            <div key={key} className={`${CN}__item`}>
                <div className={`${CN}__item__name`}>{key}</div>
                <DirTree structure={dirTreeList[key] as IDirTreeStructure} />
            </div>
        )
    );

    return (
        <div className={CN}>
            {renderTreesList()}
        </div>
    );
};
