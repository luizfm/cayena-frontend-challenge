import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner | component | unit test', () => {
  it('should render spinner with default large size', () => {
    render(<Spinner />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).not.toHaveClass('c-spinner--small')
  })

  it('should render spinner with small size', () => {
    render(<Spinner size="small" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('c-spinner--small')
  })
})
