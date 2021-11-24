export interface IDirTreeStructure {
    [key: string]: IDirTreeStructure | null;
}

export interface IDirectoryUpdatePayload {
    directory: string;
    path: string;
    itemType: 'file' | 'directory'
}
