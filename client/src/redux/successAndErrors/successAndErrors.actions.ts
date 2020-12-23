export const SuccessAndErrorsActions = {
  apiError: (errorMessage: string) => {
    return {
      type: 'API_ERROR',
      payload: errorMessage,
    } as const
  },

  apiSuccess: (successMessage: string) => {
    return {
      type: 'API_SUCCESS',
      payload: successMessage,
    } as const
  },
}
