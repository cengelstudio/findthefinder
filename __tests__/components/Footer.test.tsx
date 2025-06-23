import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock next-translate
jest.mock('next-translate/useTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
    lang: 'en',
  }),
}));

describe('Footer Component', () => {
  it('renders footer component', () => {
    render(<Footer />);

    // Check if footer element exists
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays footer logo', () => {
    render(<Footer />);

    expect(screen.getByAltText('Find The Finder Logo')).toBeInTheDocument();
  });

  it('displays footer description', () => {
    render(<Footer />);

    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('navigation')).toBeInTheDocument();
    expect(screen.getByText('faq')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
    expect(screen.getByText('warning')).toBeInTheDocument();
    expect(screen.getByText('lostAndFound')).toBeInTheDocument();
  });

  it('renders account links', () => {
    render(<Footer />);

    expect(screen.getByText('account')).toBeInTheDocument();
    expect(screen.getByText('signIn')).toBeInTheDocument();
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });

  it('renders support links', () => {
    render(<Footer />);

    expect(screen.getByText('support')).toBeInTheDocument();
    expect(screen.getAllByText('legacy')).toHaveLength(2);
    expect(screen.getAllByText('K.V.K.K.')).toHaveLength(2);
  });

  it('renders social media links', () => {
    render(<Footer />);

    const socialLinks = screen.getAllByRole('link', { name: /Facebook|Twitter|Instagram/ });
    expect(socialLinks).toHaveLength(3);

    // Check for SVG icons
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });

  it('renders footer copyright', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 FindTheFinder/)).toBeInTheDocument();
    expect(screen.getByText('allRightsReserved')).toBeInTheDocument();
  });

  it('renders legal links with correct attributes', () => {
    render(<Footer />);

    const legalLinks = screen.getAllByRole('link', { name: 'legacy' });
    expect(legalLinks[0]).toHaveAttribute('href', '/en_legalNotice.pdf');
    expect(legalLinks[0]).toHaveAttribute('target', '_blank');
    expect(legalLinks[0]).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders KVKK links with correct attributes', () => {
    render(<Footer />);

    const kvkkLinks = screen.getAllByRole('link', { name: 'K.V.K.K.' });
    expect(kvkkLinks[0]).toHaveAttribute('href', '/aydinlatma.pdf');
    expect(kvkkLinks[0]).toHaveAttribute('target', '_blank');
    expect(kvkkLinks[0]).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders internal navigation links with correct hrefs', () => {
    render(<Footer />);

    const faqLink = screen.getByText('faq').closest('a');
    const contactLink = screen.getByText('contact').closest('a');
    const warningLink = screen.getByText('warning').closest('a');
    const lostFoundLink = screen.getByText('lostAndFound').closest('a');
    const signInLink = screen.getByText('signIn').closest('a');
    const signUpLink = screen.getByText('signUp').closest('a');

    expect(faqLink).toHaveAttribute('href', '/#faq');
    expect(contactLink).toHaveAttribute('href', '/#contact');
    expect(warningLink).toHaveAttribute('href', '/warning');
    expect(lostFoundLink).toHaveAttribute('href', '/lost_found');
    expect(signInLink).toHaveAttribute('href', '/sign_in');
    expect(signUpLink).toHaveAttribute('href', '/sign_up');
  });
});
