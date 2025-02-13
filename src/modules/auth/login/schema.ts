import * as yup from 'yup'

export const schema = yup.lazy(() => {
  return yup.object({
    username: yup.string().nullable().required('กรุณาใส่ บัญชีพนักงาน'),
    password: yup.string().nullable().required('กรุณาใส่ รหัสผ่าน'),
  })
})
