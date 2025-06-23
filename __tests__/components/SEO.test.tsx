import { render } from '@testing-library/react';
import SEO from '../../components/SEO/SEO';

// Mock next/head
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-head">{children}</div>;
  };
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    asPath: '/',
    locale: 'en',
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

describe('SEO Component', () => {
  it('renders SEO component', () => {
    const { container } = render(<SEO />);

    expect(container.querySelector('[data-testid="mock-head"]')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    const { container } = render(<SEO title="Custom Title" />);

    const headElement = container.querySelector('[data-testid="mock-head"]');
    expect(headElement).toBeInTheDocument();
  });

  it('renders with custom description', () => {
    const { container } = render(<SEO description="Custom description" />);

    const headElement = container.querySelector('[data-testid="mock-head"]');
    expect(headElement).toBeInTheDocument();
  });

  it('renders with custom keywords', () => {
    const { container } = render(<SEO keywords="test,keywords" />);

    const headElement = container.querySelector('[data-testid="mock-head"]');
    expect(headElement).toBeInTheDocument();
  });

  it('renders with all props', () => {
    const { container } = render(
      <SEO
        title="Test Title"
        description="Test description"
        keywords="test,seo,keywords"
      />
    );

    const headElement = container.querySelector('[data-testid="mock-head"]');
    expect(headElement).toBeInTheDocument();
  });
});
