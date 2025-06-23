import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Account from '../../pages/account';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock next/router
const mockPush = jest.fn();
const mockReload = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    reload: mockReload,
    asPath: '/account', // Make sure this doesn't match '/update?code=' pattern
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
  getCookie: jest.fn(),
  removeCookies: jest.fn(),
  setCookie: jest.fn(),
}));

// Get the mocked functions
const mockGetCookie = require('cookies-next').getCookie as jest.MockedFunction<typeof import('cookies-next').getCookie>;
const mockRemoveCookies = require('cookies-next').removeCookies as jest.MockedFunction<typeof import('cookies-next').removeCookies>;
const mockSetCookie = require('cookies-next').setCookie as jest.MockedFunction<typeof import('cookies-next').setCookie>;

describe('Account Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn();
    mockGetCookie.mockReturnValue('mock-token');
  });

  it('redirects to login if no token exists', async () => {
    mockGetCookie.mockReturnValue(null);

    render(<Account />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('authError');
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('renders account page when user is authenticated', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: []
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(screen.getByTestId('seo-component')).toBeInTheDocument();
      expect(screen.getByTestId('header-component')).toBeInTheDocument();
      expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    });
  });

  it('displays user information correctly', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: []
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('second@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    });
  });

  it('displays user codes in table', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: [
            { content: 'CODE1', used_on: 'Description 1' },
            { content: 'CODE2', used_on: 'Description 2' }
          ]
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(screen.getByText('CODE1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('CODE2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('handles form input changes', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: []
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      const emailInput = screen.getByDisplayValue('test@example.com');
      fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
      expect(emailInput).toHaveValue('updated@example.com');
    });
  });

  it('shows alert for invalid email during update', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: []
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      const emailInput = screen.getByDisplayValue('test@example.com');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const saveButton = screen.getByDisplayValue('save');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidEmail');
    });
  });

  it('handles logout correctly', async () => {
    const mockUserData = {
      data: {
        auth: true,
        data: {
          email: 'test@example.com',
          secondMail: 'second@example.com',
          number: '1234567890',
          codes: []
        }
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      const logoutButton = screen.getByText('logout');
      fireEvent.click(logoutButton);
    });

    expect(mockRemoveCookies).toHaveBeenCalledWith('ftftok');
    setTimeout(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    }, 500);
  });

  it('handles authentication error', async () => {
    const mockUserData = {
      data: {
        auth: false,
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('authError');
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
