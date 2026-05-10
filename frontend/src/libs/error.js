
const catchAxiosError = (err) => {
  // Something happened in setting up the request that triggered an Error
  let message =
    'Something happened in setting up the request that triggered an Error'

  if (err.response) {
    const errors = err.response.data?.errors;
    message = Array.isArray(errors)
      ? errors.map((e) => e.message).join(', ')
      : err.response.data?.message || 'An unexpected error occurred';
  } else if (err.request) {
    message = 'The request was made, but no response was received'
  }

  return { error: message }
}

export default catchAxiosError