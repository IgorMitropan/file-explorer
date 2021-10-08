import React, { FunctionComponent, ReactNode } from 'react';
import { AiOutlineFile } from 'react-icons/ai';
import { DiCss3Full, DiHtml5, DiReact } from 'react-icons/di';
import { SiJavascript, SiTypescript } from 'react-icons/si';
import { VscJson, VscFileMedia } from 'react-icons/vsc'
import { GrDocumentTxt } from 'react-icons/gr'

import './file-item.scss';

interface FileProps {
    name: string
}

const CN = 'file-item';
const FILE_ICONS: Record<string, ReactNode> = {
    js: <SiJavascript color = '#FFC300' />,
    ts: <SiTypescript color = '#00008b' />,
    css: <DiCss3Full color = 'blue'/>,
    html: <DiHtml5 color='orange' />,
    jsx: <DiReact color = '#61dafb'/>,
    tsx: <DiReact color = '#61dafb'/>,
    json: <VscJson />,
    svg: <VscFileMedia color = 'blue'/>,
    png: <VscFileMedia color='red'/>,
    jpg: <VscFileMedia color='green'/>,
    jpeg: <VscFileMedia color='green'/>,
    txt: <GrDocumentTxt/>
};

export const FileItem: FunctionComponent<FileProps> = ({ name }: FileProps) => {
    const splitName = name.split('.');
    const ext = splitName[splitName.length - 1];

    return (
        <div className={CN}>
            {/* render the extension or fallback to generic file icon  */}
            {FILE_ICONS[ext] || <AiOutlineFile color= 'grey'/>}
            <span className={`${CN}__name`}>{name}</span>
        </div>
    );
};
