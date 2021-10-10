/*
 *  Simple function that replaces '.' with '%*%' to display correct names on the view
 */
export const encodePath = (path: string): string => {
    return path.replace(/\./g, '%*%');
}
