import { render, screen } from '@testing-library/react';
import FAQ from '../../pages/faq';

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

describe('FAQ Page', () => {
  it('renders FAQ page with all components', () => {
    render(<FAQ />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('displays FAQ title', () => {
    render(<FAQ />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('displays FAQ description', () => {
    render(<FAQ />);

    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('displays coming soon message', () => {
    render(<FAQ />);

    expect(screen.getByText('comingSoon')).toBeInTheDocument();
  });
});
