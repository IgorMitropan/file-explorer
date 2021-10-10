import counterReducer, {
  DirTreeListState,
  addItemToDirTree,
  removeItemFromDirTree,
} from './dir-tree-list-slice';
import { IDirectoryUpdatePayload } from '../../interfaces';

describe('counter reducer', () => {
  const initialState: DirTreeListState = {
    value: {
      dir1: {
        dir2: {
          'test%*%txt': null
        }
      }
    },
    status: 'idle',
  };

  it('should handle adding file to dir tree', () => {
    const payload: IDirectoryUpdatePayload = {
      directory: 'dir1',
      path: '/dir2/test2%*%txt',
      itemType: 'file'
    };
    const actual = counterReducer(initialState, addItemToDirTree(payload));
    expect(actual.value).toHaveProperty('dir1.dir2.test2%*%txt', null);
  });

  it('should handle adding file to dir tree', () => {
    const payload: IDirectoryUpdatePayload = {
      directory: 'dir1',
      path: '/dir2/test3',
      itemType: 'directory'
    };
    const actual = counterReducer(initialState, addItemToDirTree(payload));
    expect(actual.value).toHaveProperty('dir1.dir2.test3', {});
  });

  it('should handle removing file from dir tree', () => {
    const payload: IDirectoryUpdatePayload = {
      directory: 'dir1',
      path: '/dir2/test3',
      itemType: 'directory'
    };
    const actual = counterReducer(initialState, removeItemFromDirTree(payload));
    expect(actual.value).not.toHaveProperty('dir1.dir2.test3');
  });
});
