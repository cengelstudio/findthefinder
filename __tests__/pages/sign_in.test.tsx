import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/sign_in';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock next/router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next-translate
jest.mock('next-translate/useTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
    lang: 'en',
  }),
}));

// Mock SEO component
jest.mock('../../components/SEO/SEO', () => {
  return function MockSEO() {
    return <div data-testid="seo-component" />;
  };
});

// Mock Header component
jest.mock('../../components/Header/Header', () => {
  return function MockHeader({ title }: { title?: string }) {
    return <div data-testid="header-component">{title}</div>;
  };
});

// Mock Footer component
jest.mock('../../components/Footer/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer-component" />;
  };
});

// Mock cookies-next
jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('renders sign in page with all form fields', () => {
    render(<SignIn />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByDisplayValue('send')).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(<SignIn />);

    const forgotPasswordLink = screen.getByText('forgotPassword');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot_password');
  });

  it('handles form input changes', () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows error for invalid email', async () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidEmail');
    });
  });

  it('shows error for short password', async () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12' } }); // Too short

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('passwordError');
    });
  });

  it('submits form successfully and redirects to account', async () => {
    const mockResponse = { data: { status: 'success', token: 'mock-token' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/users/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/account');
    });
  });

  it('handles login failure', async () => {
    const mockResponse = { data: { status: 'error' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('wrongEmailOrPassword');
    });
  });

  it('handles network error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('tryAgainLater');
    });
  });
});
