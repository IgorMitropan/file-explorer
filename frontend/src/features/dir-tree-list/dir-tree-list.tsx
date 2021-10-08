import React, { FunctionComponent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DirTree } from './dir-tree';
import { getDirTreeList, selectDirTreeList } from './dir-tree-list-slice';
import { DirTreeStructure } from '../../interfaces';

import './dir-tree-list.scss';

const CN = 'dir-tree-list';

export const DirTreeList: FunctionComponent = () => {
    const dirTreeList = useAppSelector(selectDirTreeList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDirTreeList());
    }, [dispatch]);


    const renderTreesList = () => Object.keys(dirTreeList).map(key => (
            <div key={key} className={`${CN}__item`}>
                <div className={`${CN}__item__name`}>{key}</div>
                <DirTree structure={dirTreeList[key] as DirTreeStructure} />
            </div>
        )
    );

    return (
        <div className={CN}>
            {renderTreesList()}
        </div>
    );
};
