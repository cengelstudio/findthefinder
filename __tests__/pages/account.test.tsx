import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Account from '../../pages/account';
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
const mockGetCookie = jest.fn();
const mockRemoveCookies = jest.fn();
jest.mock('cookies-next', () => ({
  getCookie: mockGetCookie,
  removeCookies: mockRemoveCookies,
}));

describe('Account Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn();
    mockGetCookie.mockReturnValue('mock-token');
  });

  it('renders account page when user is authenticated', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: [
          { code: 'CODE1', codeDescription: 'Description 1' },
          { code: 'CODE2', codeDescription: 'Description 2' }
        ]
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

  it('redirects to login if no token exists', () => {
    mockGetCookie.mockReturnValue(null);

    render(<Account />);

    expect(mockPush).toHaveBeenCalledWith('/sign_in');
  });

  it('displays user information correctly', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('second@example.com')).toBeInTheDocument();
    });
  });

  it('displays user codes correctly', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: [
          { code: 'CODE1', codeDescription: 'Description 1' },
          { code: 'CODE2', codeDescription: 'Description 2' }
        ]
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('CODE1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Description 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('CODE2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Description 2')).toBeInTheDocument();
    });
  });

  it('handles form input changes', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
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

  it('handles profile update successfully', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    const mockUpdateResponse = { data: { status: 'success' } };
    mockedAxios.post
      .mockResolvedValueOnce(mockUserData)
      .mockResolvedValueOnce(mockUpdateResponse);

    render(<Account />);

    await waitFor(() => {
      const updateButton = screen.getByDisplayValue('update');
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('profileUpdated');
    });
  });

  it('handles profile update with validation errors', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      const emailInput = screen.getByDisplayValue('test@example.com');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const updateButton = screen.getByDisplayValue('update');
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('invalidEmail');
    });
  });

  it('handles logout correctly', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<Account />);

    await waitFor(() => {
      const logoutButton = screen.getByDisplayValue('logout');
      fireEvent.click(logoutButton);
    });

    expect(mockRemoveCookies).toHaveBeenCalledWith('ftftok');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('handles account deletion with confirmation', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    const mockDeleteResponse = { data: { status: 'success' } };
    mockedAxios.post
      .mockResolvedValueOnce(mockUserData)
      .mockResolvedValueOnce(mockDeleteResponse);

    window.confirm = jest.fn().mockReturnValue(true);

    render(<Account />);

    await waitFor(() => {
      const deleteButton = screen.getByDisplayValue('deleteAccount');
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('deleteAccountConfirm');
      expect(window.alert).toHaveBeenCalledWith('accountDeleted');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('handles account deletion cancellation', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        email: 'test@example.com',
        phone: '1234567890',
        secondMail: 'second@example.com',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    window.confirm = jest.fn().mockReturnValue(false);

    render(<Account />);

    await waitFor(() => {
      const deleteButton = screen.getByDisplayValue('deleteAccount');
      fireEvent.click(deleteButton);
    });

    expect(window.confirm).toHaveBeenCalledWith('deleteAccountConfirm');
    expect(mockedAxios.post).toHaveBeenCalledTimes(1); // Only initial data fetch
  });

  it('handles API errors gracefully', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<Account />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/sign_in');
    });
  });
});
