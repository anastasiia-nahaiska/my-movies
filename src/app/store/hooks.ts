import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, type RootStore } from './root-store';

export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
