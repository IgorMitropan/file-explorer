import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dirTreeListReducer from '../features/dir-tree-list/dir-tree-list-slice';

export const store = configureStore({
  reducer: {
    dirTreeList: dirTreeListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
