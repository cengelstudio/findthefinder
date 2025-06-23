import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../../pages/forgot_password';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('renders forgot password page with form elements', () => {
    render(<ForgotPassword />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByDisplayValue('reset')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<ForgotPassword />);

    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('shows error for invalid email', () => {
    render(<ForgotPassword />);

    const emailInput = screen.getByPlaceholderText('email');
    const submitButton = screen.getByDisplayValue('reset');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('invalidEmail');
  });

  it('submits form successfully', async () => {
    const mockResponse = { data: { status: 'success' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<ForgotPassword />);

    const emailInput = screen.getByPlaceholderText('email');
    const submitButton = screen.getByDisplayValue('reset');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/users/forgot_password', {
        email: 'test@example.com',
        lang: 'en',
      });
      expect(window.alert).toHaveBeenCalledWith('passwordChanged');
    });
  });

  it('handles API error', async () => {
    const mockResponse = { data: { status: 'error' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<ForgotPassword />);

    const emailInput = screen.getByPlaceholderText('email');
    const submitButton = screen.getByDisplayValue('reset');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('passwordChanged');
    });
  });
});
