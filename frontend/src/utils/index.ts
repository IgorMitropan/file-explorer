/*
 *  Simple function that replaces '%*%' with '.' to display correct names on the view
 */
export const decodePath = (path: string): string => {
    return path.replace(/%\*%/g, '.');
}

/*
 *  Simple function to get file extension
 */
export const getFileExtension = (fileName: string): string => {
    const splitName = fileName.split('.');
    return splitName[splitName.length - 1];
}

/*
 *  Simple function that removing leading slash and replacing the other slashes with dots
 */
export const prepareDirTreePath = (path: string): string => {
    return path
        .slice(1)
        .replace(/\//g, '.');
}
