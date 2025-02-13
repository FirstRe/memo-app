import React from 'react'
import { Button as ButtonAntd } from 'antd'
import { ButtonProps } from 'antd/es/button/button'

type ButtonPropsType = ButtonProps & {
  label?: string
}

const Button = ({ children, ...rest }: ButtonPropsType) => {
  return <ButtonAntd {...rest}>{children}</ButtonAntd>
}

export default Button
