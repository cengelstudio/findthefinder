import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LostFound from '../../pages/lost_found';

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

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

describe('LostFound (Found Form) Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    mockGeolocation.getCurrentPosition.mockClear();
  });

  it('renders found form page', () => {
    render(<LostFound />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('displays form elements correctly', () => {
    render(<LostFound />);

    expect(screen.getByPlaceholderText('codePlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phonePlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('addressPlaceholder')).toBeInTheDocument();
    expect(screen.getByText('send')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<LostFound />);

    const codeInput = screen.getByPlaceholderText('codePlaceholder');
    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const phoneInput = screen.getByPlaceholderText('phonePlaceholder');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(codeInput).toHaveValue('TEST123');
    expect(emailInput).toHaveValue('finder@example.com');
    expect(phoneInput).toHaveValue('1234567890');
  });

  it('shows error when code is missing', async () => {
    render(<LostFound />);

    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('send');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('missingLabel')).toBeInTheDocument();
    });
  });

  it('shows error for invalid email', async () => {
    render(<LostFound />);

    const codeInput = screen.getByPlaceholderText('codePlaceholder');
    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('send');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('invalidEmail')).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    const mockResponse = { data: { status: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<LostFound />);

    const codeInput = screen.getByPlaceholderText('codePlaceholder');
    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const phoneInput = screen.getByPlaceholderText('phonePlaceholder');
    const submitButton = screen.getByText('send');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/found', {
        code: 'TEST123',
        email: 'finder@example.com',
        phone: '1234567890',
        address: '',
        lang: 'en',
      });
      expect(window.alert).toHaveBeenCalledWith('thanks');
    });

    // Should redirect to home after success
    setTimeout(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    }, 500);
  });

  it('handles API submission error', async () => {
    const mockResponse = { data: { status: false } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<LostFound />);

    const codeInput = screen.getByPlaceholderText('codePlaceholder');
    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('send');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('anError');
    });
  });

  it('handles network error gracefully', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<LostFound />);

    const codeInput = screen.getByPlaceholderText('codePlaceholder');
    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('send');

    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    fireEvent.change(emailInput, { target: { value: 'finder@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('anError');
    });
  });

  it('handles geolocation if available', () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    // Mock fetch for reverse geocoding
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        display_name: 'New York, NY, USA',
      }),
    });

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    render(<LostFound />);

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
