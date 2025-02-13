import * as yup from 'yup'

export const schema = yup.lazy(() => {
  return yup.object({
    memo: yup.array(
      yup.object({
        memo: yup.string().required(' '),
      }),
    ),
  })
})
