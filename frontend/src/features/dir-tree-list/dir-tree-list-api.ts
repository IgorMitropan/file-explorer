import { IDirTreeStructure } from '../../interfaces';
import axios from 'axios';

export function fetchDirTreeList(): Promise<{ data:IDirTreeStructure}> {
    return axios.get<string, { data:IDirTreeStructure}>('/dir-trees');
}
