import { render, screen } from '@testing-library/react'
import MaskedInput from './MaskedInput'

describe('MaskedInput | component | unit test', () => {
  it('should render input with label', () => {
    render(<MaskedInput mask="9999-9999" label="My input" />)

    const input = screen.getByRole('textbox')
    expect(screen.getByText('My input')).toBeVisible()
    expect(input).toBeInTheDocument()
  })

  it('should render error classes when error message is provided', () => {
    render(
      <MaskedInput
        mask="9999-9999"
        error="This field is required"
        label="My input"
      />,
    )

    const input = screen.getByRole('textbox')
    const label = screen.getByText('My input')
    const errorText = screen.getByText('This field is required')

    expect(input).toHaveClass('c-masked-input--error')
    expect(label).toHaveClass('c-masked-input__label--error')
    expect(errorText).toBeInTheDocument()
  })
})
