import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/index';
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
  return function MockHeader() {
    return <div data-testid="header-component" />;
  };
});

// Mock Footer component
jest.mock('../../components/Footer/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer-component" />;
  };
});

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders home page with all sections', () => {
    render(<Home />);

    // Check if main components are rendered
    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('renders main title', () => {
    render(<Home />);

    expect(screen.getByText('"FIND THE FINDER"')).toBeInTheDocument();
  });

  it('renders all perk sections', () => {
    render(<Home />);

    // Check for perk titles
    expect(screen.getByText('buySticker.title')).toBeInTheDocument();
    expect(screen.getByText('activeSticker.title')).toBeInTheDocument();
    expect(screen.getByText('contactTheFinder.title')).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    render(<Home />);

    expect(screen.getByText('faq.title')).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<Home />);

    expect(screen.getByText('contact.title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.message')).toBeInTheDocument();
  });

  it('handles form input changes', async () => {
    render(<Home />);

    const nameInput = screen.getByPlaceholderText('contact.name');
    const emailInput = screen.getByPlaceholderText('contact.email');
    const phoneInput = screen.getByPlaceholderText('contact.phone');
    const messageInput = screen.getByPlaceholderText('contact.message');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(messageInput).toHaveValue('Test message');
  });

  it('submits contact form successfully', async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    // Mock window.alert
    window.alert = jest.fn();

    render(<Home />);

    const nameInput = screen.getByPlaceholderText('contact.name');
    const emailInput = screen.getByPlaceholderText('contact.email');
    const messageInput = screen.getByPlaceholderText('contact.message');
    const submitButton = screen.getByDisplayValue('contact.send');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/send_message', {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        message: 'Test message',
      });
    });
  });

  it('shows validation error for empty form', async () => {
    // Mock window.alert
    window.alert = jest.fn();

    render(<Home />);

    const submitButton = screen.getByDisplayValue('contact.send');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Formda numara hariç boş alan bırakılamaz!');
    });
  });

    it('renders all images with correct alt text', () => {
    render(<Home />);

    // Check for images
    expect(screen.getByAltText('Suitcase')).toBeInTheDocument();
    expect(screen.getByAltText('Award')).toBeInTheDocument();
    expect(screen.getAllByAltText('Example image')).toHaveLength(3);
  });

  it('renders FAQ items', () => {
    render(<Home />);

    // Check for FAQ questions (should render 8 items as 2 and 3 are excluded)
    expect(screen.getByText('faq.q1.q')).toBeInTheDocument();
    expect(screen.getByText('faq.q4.q')).toBeInTheDocument();
    expect(screen.getByText('faq.q10.q')).toBeInTheDocument();
  });
});
