import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import LoginPage from './LoginPage'
import { createWrapper } from '@/tests/wrapper'
import { useLogin } from '@/hooks/useLogin'
import { useAuth } from '@/hooks/useAuth'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

jest.mock('@/hooks/useLogin')
jest.mock('@/hooks/useAuth')
const mockedMutate = jest.fn()

describe('LoginPage | page | unit test', () => {
  beforeEach(() => {
    ;(useLogin as jest.Mock).mockReturnValue({
      mutate: mockedMutate,
      isLoading: false,
    })
    ;(useAuth as jest.Mock).mockReturnValue({ user: undefined })
  })

  it('should render login page with username and password input fields', () => {
    render(<LoginPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.getByText('Username')).toBeVisible()
    expect(screen.getByText('Password')).toBeVisible()
  })

  it('should render errors if user tries to login without filling input fields', async () => {
    render(<LoginPage />, {
      wrapper: createWrapper({}),
    })

    const submitButton = screen.getByRole('button')

    act(() => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.queryAllByText('This field is required!')).toHaveLength(2)
    })
  })

  it('should call mutation if fields are filled', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({
      mutate: mockedMutate,
      isLoading: false,
    })
    render(<LoginPage />, {
      wrapper: createWrapper({}),
    })

    const usernameInput = screen.getByRole('textbox')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'john@gmail.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockedMutate).toHaveBeenCalledTimes(1)
    })
  })

  it('should not show form if user info is already stored', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: { token: '123' } })
    render(<LoginPage />, {
      wrapper: createWrapper({}),
    })

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Password')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
