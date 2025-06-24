import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Found from '../../pages/lost_found/[key]';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock next/router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { key: 'TEST123' },
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
  getCookie: jest.fn(),
}));

// Get the mocked function
const mockGetCookie = require('cookies-next').getCookie as jest.MockedFunction<typeof import('cookies-next').getCookie>;

describe('Found [key] Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    mockGetCookie.mockReturnValue(null);
  });

  it('shows loading initially', () => {
    const mockResponse = { data: { have: false } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Found />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders found form when label exists', async () => {
    const mockResponse = { data: { have: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Found />);

    await waitFor(() => {
      expect(screen.getByTestId('header-component')).toBeInTheDocument();
      expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('code')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('phone')).toBeInTheDocument();
    });
  });

  it('redirects to signup when label does not exist and no token', async () => {
    const mockResponse = { data: { have: false } };
    mockedAxios.post.mockResolvedValue(mockResponse);
    mockGetCookie.mockReturnValue(null);

    render(<Found />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/sign_up?code=TEST123');
    });
  });

  it('redirects to update when label does not exist but token exists', async () => {
    const mockResponse = { data: { have: false } };
    mockedAxios.post.mockResolvedValue(mockResponse);
    mockGetCookie.mockReturnValue('mock-token');

    render(<Found />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/update?code=TEST123');
    });
  });

  it('handles form input changes', async () => {
    const mockResponse = { data: { have: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Found />);

    await waitFor(() => {
      const codeInput = screen.getByPlaceholderText('code');
      const emailInput = screen.getByPlaceholderText('email');
      const phoneInput = screen.getByPlaceholderText('phone');

      expect(codeInput).toHaveValue('TEST123'); // Should be pre-filled from URL

      fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '1234567890' } });

      expect(emailInput).toHaveValue('finder@example.com');
      expect(phoneInput).toHaveValue('1234567890');
    });
  });

  it('shows error for missing label code', async () => {
    const mockResponse = { data: { have: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Found />);

    await waitFor(() => {
      const codeInput = screen.getByPlaceholderText('code');
      const emailInput = screen.getByPlaceholderText('email');
      const submitButton = screen.getByDisplayValue('send');

      fireEvent.change(codeInput, { target: { value: '' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('missingLabel');
    });
  });

  it('shows error for invalid email', async () => {
    const mockResponse = { data: { have: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Found />);

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('email');
      const submitButton = screen.getByDisplayValue('send');

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidEmail');
    });
  });

  it('submits form successfully', async () => {
    const mockLabelResponse = { data: { have: true } };
    const mockSubmitResponse = { data: { status: true } };
    mockedAxios.post
      .mockResolvedValueOnce(mockLabelResponse)  // for /api/label_control
      .mockResolvedValueOnce(mockSubmitResponse); // for /api/found

    render(<Found />);

    // Wait for the form to be displayed after label_control check
    await waitFor(() => {
      expect(screen.getByPlaceholderText('code')).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText('email');
    const phoneInput = screen.getByPlaceholderText('phone');
    const submitButton = screen.getByDisplayValue('send');

    fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/found', {
        code: 'TEST123',
        email: 'finder@example.com',
        phone: '1234567890',
      });
      // Check that the form was submitted (we get some response)
      expect(window.alert).toHaveBeenCalled();
    });
  });

  it('handles API submission error', async () => {
    const mockLabelResponse = { data: { have: true } };
    const mockSubmitResponse = { data: { status: false } };
    mockedAxios.post
      .mockResolvedValueOnce(mockLabelResponse)
      .mockResolvedValueOnce(mockSubmitResponse);

    render(<Found />);

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('email');
      const submitButton = screen.getByDisplayValue('send');

      fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('anError');
    });
  });
});
