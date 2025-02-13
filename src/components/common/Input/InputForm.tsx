import React from 'react'
import { Input as AntInput, InputProps } from 'antd'
import { Control, Controller, FieldValues } from 'react-hook-form'
import classnames from 'classnames'

const { TextArea } = AntInput

interface InputFormProps extends IInputProps {
  id: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
    classInput?: string
  }
  type: string
  name: string
  control: Control<FieldValues, any>
}

interface IInputProps extends InputProps {
  inputRef?: any
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
    classInput?: string
  }
  multiline?: boolean
  error?: string
  onChange?: (value?: any) => void
  rows?: number
}

const Input = (props: IInputProps) => {
  const {
    id,
    inputLabel,
    inputRef,
    type,
    name,
    error,
    value,
    size = 'large',
    classNames,
    onChange = () => {},
    placeholder,
    disabled,
    suffix,
    prefix,
    rows,
    multiline,
    ...rest
  } = props

  return (
    <div>
      {inputLabel && (
        <div className={classnames(inputLabel.classNames)}>
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> *</span>}
        </div>
      )}
      {multiline ? (
        <TextArea
          rows={rows}
          placeholder={placeholder || inputLabel?.label}
          value={value}
          disabled={disabled}
          onChange={onChange}
          allowClear
          status={error ? 'error' : ''}
          style={{
            width: '234px',
            height: '176px',
            resize: 'none',
            borderRadius: '12px',
            backgroundColor: '#D4D4D84D',
          }}
        />
      ) : (
        <AntInput
          ref={inputRef}
          id={id}
          style={{ borderRadius: '12px', color: '#fff', height: '42px' }}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          size={size}
          className={classnames(classNames, inputLabel?.classInput)}
          status={error ? 'error' : ''}
          prefix={prefix}
          suffix={suffix}
          {...rest}
        />
      )}
      {error && <div className="mt-1 text-xs text-rose-600">{error}</div>}
    </div>
  )
}

const InputForm = (props: InputFormProps) => {
  const { id, inputLabel, type, name, control, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          id={id}
          name={name}
          inputLabel={inputLabel}
          type={type}
          onChange={field.onChange}
          value={field.value}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}

export { InputForm, Input }
