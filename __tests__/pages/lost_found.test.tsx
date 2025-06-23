import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LostFound from '../../pages/lost_found';
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
jest.mock('cookies-next', () => ({
  getCookie: mockGetCookie,
}));

describe('LostFound Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    mockGetCookie.mockReturnValue('mock-token');
  });

  it('renders lost found page when user is authenticated', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: [
          { code: 'CODE1', codeDescription: 'Description 1' }
        ]
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<LostFound />);

    await waitFor(() => {
      expect(screen.getByTestId('seo-component')).toBeInTheDocument();
      expect(screen.getByTestId('header-component')).toBeInTheDocument();
      expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    });
  });

  it('redirects to login if no token exists', () => {
    mockGetCookie.mockReturnValue(null);

    render(<LostFound />);

    expect(mockPush).toHaveBeenCalledWith('/sign_in');
  });

  it('displays user codes correctly', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: [
          { code: 'CODE1', codeDescription: 'Description 1' },
          { code: 'CODE2', codeDescription: 'Description 2' }
        ]
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<LostFound />);

    await waitFor(() => {
      expect(screen.getByText('CODE1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('CODE2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('displays form for generating new code', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<LostFound />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('codeDescription')).toBeInTheDocument();
      expect(screen.getByDisplayValue('generateCode')).toBeInTheDocument();
    });
  });

  it('handles code generation successfully', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: []
      }
    };
    const mockGenerateResponse = { data: { status: 'success', code: 'NEWCODE123' } };
    mockedAxios.post
      .mockResolvedValueOnce(mockUserData)
      .mockResolvedValueOnce(mockGenerateResponse);

    render(<LostFound />);

    await waitFor(() => {
      const descriptionInput = screen.getByPlaceholderText('codeDescription');
      const generateButton = screen.getByDisplayValue('generateCode');

      fireEvent.change(descriptionInput, { target: { value: 'New test description' } });
      fireEvent.click(generateButton);
    });

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/generate_code', {
        codeDescription: 'New test description',
      });
      expect(window.alert).toHaveBeenCalledWith('codeGenerated: NEWCODE123');
    });
  });

  it('shows error for empty code description', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: []
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<LostFound />);

    await waitFor(() => {
      const generateButton = screen.getByDisplayValue('generateCode');
      fireEvent.click(generateButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('descriptionRequired');
    });
  });

  it('handles API error gracefully', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<LostFound />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/sign_in');
    });
  });

  it('displays QR code for each user code', async () => {
    const mockUserData = {
      data: {
        status: 'success',
        codes: [
          { code: 'CODE1', codeDescription: 'Description 1' }
        ]
      }
    };
    mockedAxios.post.mockResolvedValue(mockUserData);

    render(<LostFound />);

    await waitFor(() => {
      // Check if QR code container is present
      const qrCodeElement = screen.getByText(/lost_found\/CODE1/);
      expect(qrCodeElement).toBeInTheDocument();
    });
  });
});
