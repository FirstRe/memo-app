import React from 'react'
import { IMemo } from '../interface'
import { InputForm } from '@/components/common/Input'
import { Control, FieldValues } from 'react-hook-form'


interface ICardProps {
  memo: IMemo
  control: Control<FieldValues, any>
  index: number
  onSave: (memo: IMemo) => void
  length: number
  isShowNew: boolean
  userRole: string | null
}

const CardAntd = ({
  memo,
  control,
  index,
  onSave,
  length,
  isShowNew,
  userRole,
}: ICardProps) => {
  return (
    <div className="relative mx-auto h-[198px] w-[347px] rounded-[10px] bg-white shadow-md">
      {isShowNew &&
        (userRole === 'ADMIN' ? index === 0 : length - 1 === index) && (
          <span className="absolute -right-3 -top-3 z-30 rounded-[15px] bg-[#906CFF] px-[12px] py-[12px] text-12-20-600 text-white shadow-md  ">
            NEW
          </span>
        )}

      <div className="flex h-full w-full justify-center">
        <div className="flex flex-col items-center justify-between">
          <div className="flex w-[95px] flex-col items-start pb-[18.5px] pl-[15px] pt-[20.5px]">
            <span className="text-15-20-600 text-[rgba(0,0,0,0.5)]">
              {memo.user.role}-{memo.index}
            </span>
            <span
              className={`mt-2 rounded-full px-[10px] py-[5px] text-12-20-600 ${
                memo.user.role === 'ADMIN' ? 'bg-[#FF6C6F]' : 'bg-[#62AEFF]'
              }`}>
              {memo.user.role}
            </span>
          </div>
          {memo.isNew && (
            <button
              className="mx-auto mb-[18.5px] font-INTER text-12-20-600 font-semibold text-[#393937] underline underline-offset-2 transition"
              onClick={() => {
                onSave(memo)
              }}>
              SAVE
            </button>
          )}
        </div>
        {memo.isNew ? (
          <div className="h-[159px] w-full max-w-[234px] pt-[10.5px] font-INTER text-10-20-300 text-black">
            <InputForm
              id="username"
              className="bg-primary"
              type="text"
              name={`memo[${index}].memo`}
              control={control}
              multiline
              placeholder="Type something ..."
              variant="borderless"
            />
          </div>
        ) : (
          <div className="h-[159px] w-full max-w-[234px] pr-[23px] pt-[20.5px] font-INTER text-10-20-300 text-black">
            <p>{memo.memo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardAntd
