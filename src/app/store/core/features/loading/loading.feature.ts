import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { LoadingKey, LoadingState } from './loading.model';

export function withLoading<_>() {
  return signalStoreFeature(
    {state: type<{loading: LoadingState}>()},
    withMethods(state => {
      return {
        setLoading(key: LoadingKey, status: boolean): void {
          patchState(state, { loading: { ...state.loading(), [key]: status } });
        }
      };
    })
  );
}
