import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
  it('renders FAQ page correctly', () => {
    render(<FAQ />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('displays FAQ content', () => {
    render(<FAQ />);

    expect(screen.getByText('howToUse.title')).toBeInTheDocument();

    // Check for the span that contains all descriptions
    const descriptionsContainer = screen.getByText(/howToUse\.description1/);
    expect(descriptionsContainer).toBeInTheDocument();
    expect(descriptionsContainer).toHaveTextContent('howToUse.description1');
    expect(descriptionsContainer).toHaveTextContent('howToUse.description2');
    expect(descriptionsContainer).toHaveTextContent('howToUse.description3');
    expect(descriptionsContainer).toHaveTextContent('howToUse.description4');
    expect(descriptionsContainer).toHaveTextContent('howToUse.description5');
  });
});
