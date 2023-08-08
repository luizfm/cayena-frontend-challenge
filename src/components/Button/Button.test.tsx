import { render, screen } from '@testing-library/react'
import Button from './Button'
import { createWrapper } from '@/tests/wrapper'

describe('Button | component | unit test', () => {
  it('should render button as Link', () => {
    render(<Button to="/" />, { wrapper: createWrapper({}) })

    const buttonAsLink = screen.getByRole('link')

    expect(buttonAsLink).toHaveProperty('href', 'http://localhost/')
  })

  it('should render button with primary variant', () => {
    render(<Button>Click me</Button>, { wrapper: createWrapper({}) })

    const button = screen.getByRole('button')

    expect(button).toHaveClass('c-button--primary')
  })

  it('should render button with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>, {
      wrapper: createWrapper({}),
    })

    const button = screen.getByRole('button')

    expect(button).toHaveClass('c-button--secondary')
  })

  it('should make button disabled when is loading is true', () => {
    render(<Button isLoading>Click me</Button>, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.queryAllByText('Click me')).toHaveLength(0)
  })
})
