import React from 'react'
import { useLoginController } from './controller'
import LoadingOverlay from 'react-loading-overlay-ts'
import { InputForm } from '@/components/common/Input'
import Button from '@/components/common/Button/Button'

const LoginPage = () => {
  const { formHandler, onSubmit, loading } = useLoginController()

  return (
    <LoadingOverlay active={loading}>
      <div className="bg-login">
        <div className="container mx-auto">
          <div className="layout-loginForm">
            <div className="w-full max-w-[313px]">
              <p className="mb-[20px] text-left text-32-20-400 text-white">
                เข้าสู่ระบบ
              </p>
              <InputForm
                id="username"
                className="mb-[20px] bg-primary"
                type="text"
                name="username"
                control={formHandler.control}
                variant="borderless"
                inputLabel={{
                  label: 'บัญชีพนักงาน',
                  required: false,
                  classNames: 'text-12-16-400 text-white mb-[12px]',
                }}
              />
              <InputForm
                id="password"
                className="mb-[20px] bg-primary"
                type="password"
                name="password"
                control={formHandler.control}
                variant="borderless"
                inputLabel={{
                  label: 'รหัสผ่าน',
                  required: false,
                  classNames: 'text-12-16-400 text-white mb-[12px]',
                  classInput: 'text-white!',
                }}
              />

              <Button
                className="!h-[40px] !w-[100%] !bg-white font-KANIT text-14-20-400 !normal-case !text-black !no-underline"
                color="default"
                variant="solid"
                onClick={onSubmit}>
                เข้าสู่ระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default LoginPage
