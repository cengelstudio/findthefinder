import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../../pages/sign_up';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock next/router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/signUp?code=TEST123',
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

describe('SignUp Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('renders sign up page with all form fields', () => {
    render(<SignUp />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('codeDescription')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('rePassword')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('secondMail')).toBeInTheDocument();
  });

  it('extracts code from URL and sets it in form', () => {
    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    expect(codeInput).toHaveValue('TEST123');
  });

  it('handles form input changes', () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const passwordInput = screen.getByPlaceholderText('password');
    const rePasswordInput = screen.getByPlaceholderText('rePassword');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(passwordInput).toHaveValue('password123');
    expect(rePasswordInput).toHaveValue('password123');
  });

  it('shows error when terms are not accepted', async () => {
    render(<SignUp />);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('needTerms');
    });
  });

  it('shows error for invalid code', async () => {
    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: '12' } }); // Too short
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidCode');
    });
  });

  it('shows error for invalid email', async () => {
    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const emailInput = screen.getByPlaceholderText('email');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidEmail');
    });
  });

  it('shows error for short phone number', async () => {
    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '12' } }); // Too short
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('phoneError');
    });
  });

  it('shows error for password mismatch', async () => {
    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const passwordInput = screen.getByPlaceholderText('password');
    const rePasswordInput = screen.getByPlaceholderText('rePassword');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'different' } });
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('passwordMatch');
    });
  });

  it('submits form successfully', async () => {
    const mockResponse = { data: { status: 'added' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const codeDescriptionInput = screen.getByPlaceholderText('codeDescription');
    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const passwordInput = screen.getByPlaceholderText('password');
    const rePasswordInput = screen.getByPlaceholderText('rePassword');
    const secondMailInput = screen.getByPlaceholderText('secondMail');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(codeDescriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });
    fireEvent.change(secondMailInput, { target: { value: 'second@example.com' } });
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/users/sign_up', {
        code: 'TEST123',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password123',
        rePassword: 'password123',
        secondMail: 'second@example.com',
        codeDescription: 'Test description',
        lang: 'en',
      });
      expect(window.alert).toHaveBeenCalledWith('successRegister');
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('handles API error responses', async () => {
    const mockResponse = { data: { status: 'email' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<SignUp />);

    const codeInput = screen.getByPlaceholderText('code');
    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const passwordInput = screen.getByPlaceholderText('password');
    const rePasswordInput = screen.getByPlaceholderText('rePassword');
    const checkbox = screen.getByRole('checkbox');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });
    fireEvent.click(checkbox);

    const submitButton = screen.getByDisplayValue('send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('alreadyRegisterEmail');
    });
  });

  it('renders terms link correctly', () => {
    render(<SignUp />);

    const termsLink = screen.getByRole('link');
    expect(termsLink).toHaveAttribute('href', '/terms_en.txt');
    expect(termsLink).toHaveAttribute('target', '_blank');
  });
});
