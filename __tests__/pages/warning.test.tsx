import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Warning from '../../pages/warning';

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

describe('Warning Page', () => {
  it('renders warning page correctly', () => {
    render(<Warning />);

    expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('displays warning title in header', () => {
    render(<Warning />);

    expect(screen.getByTestId('header-component')).toHaveTextContent('title');
  });

  it('displays warning description', () => {
    render(<Warning />);

    expect(screen.getByText('description1')).toBeInTheDocument();
    expect(screen.getByText('description2')).toBeInTheDocument();
  });
});
