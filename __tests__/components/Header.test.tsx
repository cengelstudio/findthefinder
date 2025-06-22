import { render, screen } from '@testing-library/react';
import Header from '../../components/Header/Header';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
    };
  },
}));

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

describe('Header Component', () => {
  it('renders header component', () => {
    render(<Header />);

    // Add your test assertions here
    // Example: expect(screen.getByRole('banner')).toBeInTheDocument()
  });

  it('displays logo', () => {
    render(<Header />);

    // Add logo test
    // Example: expect(screen.getByAltText('logo')).toBeInTheDocument()
  });
});
