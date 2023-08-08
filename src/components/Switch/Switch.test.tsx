import { fireEvent, render, screen } from '@testing-library/react'
import Switch from './Switch'

describe('Switch | component | unit test', () => {
  it('should render switch component with default unchecked value', () => {
    render(<Switch onCheckedChange={() => {}} />)

    const switchComponent = screen.getByRole('switch')

    expect(switchComponent).toHaveAttribute('aria-checked', 'false')
  })

  it('should set component as checked after clicking on it', () => {
    render(<Switch onCheckedChange={() => {}} />)

    const switchComponent = screen.getByRole('switch')

    fireEvent.click(switchComponent)

    expect(switchComponent).toHaveAttribute('aria-checked', 'true')
  })
})
