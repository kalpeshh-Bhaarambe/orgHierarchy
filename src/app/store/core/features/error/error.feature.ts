import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { ErrorKey, ErrorState, ApplicationError } from './error.model';

export function withError<_>() {
  return signalStoreFeature(
    {state: type<{error: ErrorState}>()},
    withMethods(state => {
      return {
        setError(key: ErrorKey, error: ApplicationError): void {
          patchState(state, {error: {...state.error(), [key]: error}});
        }
      };
    })
  );
}
