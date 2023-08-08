import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input | component | unit test', () => {
  it('should render input with label', () => {
    render(<Input label="My input" />)

    const input = screen.getByRole('textbox')
    expect(screen.getByText('My input')).toBeVisible()
    expect(input).toBeInTheDocument()
  })

  it('should render error classes when error message is provided', () => {
    render(<Input error="This field is required" label="My input" />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('My input')
    const errorText = screen.getByText('This field is required')

    expect(input).toHaveClass('c-input--error')
    expect(label).toHaveClass('c-input__label--error')
    expect(errorText).toBeInTheDocument()
  })
})
