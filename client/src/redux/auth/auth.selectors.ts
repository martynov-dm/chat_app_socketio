import { createSelector } from 'reselect'
import { selectProductsError } from '../products/products.selectors'

const selectAuth = (state) => state.auth

export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
)

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
)

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
)

export const selectAllErrors = createSelector(
  [selectAuthError, selectProductsError],
  (authError, productsError) => {
    if (authError)
      return {
        isError: true,
        errMessage: authError,
      }
    if (productsError)
      return {
        isError: true,
        errMessage: productsError,
      }

    return { isError: false }
  }
)
