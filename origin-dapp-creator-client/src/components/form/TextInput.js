import React from 'react'
import { InputGroup, FormGroup } from '@blueprintjs/core'
import classnames from 'classnames'

import { InputFeedback } from './InputFeedback'

export const TextInput = ({
  className,
  error,
  helperText,
  id,
  label,
  labelInfo,
  onChange,
  placeholder,
  value,
  ...props
}) => {

  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  )

  return (
    <div className={classes}>
      <FormGroup
          helperText={helperText}
          label={label}
          labelFor={id}
          labelInfo={labelInfo}>
        <InputGroup
          name={id}
          placeholder={placeholder}
          className="input-width"
          value={value}
          onChange={onChange}>
        </InputGroup>
        <InputFeedback error={error} />
      </FormGroup>
    </div>
  )
}

export default TextInput
