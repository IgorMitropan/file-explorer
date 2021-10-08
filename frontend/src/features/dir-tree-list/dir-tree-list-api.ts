import { DirTreeStructure } from '../../interfaces';
import axios from 'axios';

export function fetchDirTreeList(): Promise<{ data:DirTreeStructure}> {
    return axios.get<string, { data:DirTreeStructure}>('/dir-trees');
}
