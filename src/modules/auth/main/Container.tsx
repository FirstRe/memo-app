import Layout from '@/layout/Layout'
import React from 'react'
import CardAntd from './views/card'
import { useMainController } from './controller/controller'
import { IMemo } from './interface'

const Container = () => {
  const {
    memo,
    formHandler,
    onAddNew,
    onSubmit,
    onLogout,
    userEmail,
    isEnableAdd,
    current,
    newValue,
    isShowNew,
    userRole,
  } = useMainController()
  return (
    <Layout userEmail={userEmail} onLogout={onLogout}>
      <div className="flex  h-[calc(100vh-64px)] items-center justify-center">
        <div>
          <h1 className="mb-[76px]  text-center text-48-20-700 lg:text-64-20-700">
            Memo Cards{' '}
            <span className="text-32-20-500">
              ({`${current}${newValue ? `+${newValue}` : ''}`})
            </span>
          </h1>
          <div className="grid  max-h-[600px] grid-cols-1 gap-[18px] overflow-y-auto p-4 lg:grid-cols-3">
            {memo?.map((m: IMemo, index: number) => {
              return (
                <>
                  <CardAntd
                    memo={m}
                    index={index}
                    control={formHandler.control as any}
                    onSave={onSubmit}
                    length={memo.length}
                    isShowNew={isShowNew}
                    userRole={userRole}
                  />
                </>
              )
            })}
            {isEnableAdd && (
              <button
                onClick={onAddNew}
                className="mx-auto flex h-[198px] w-[347px] cursor-pointer items-center justify-center rounded-lg bg-[rgba(255,255,255,0.5)] text-3xl text-[64px] text-black">
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Container
