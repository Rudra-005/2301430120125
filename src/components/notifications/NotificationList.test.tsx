import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NotificationList from './NotificationList';

const notifications = [
  {
    id: '1',
    title: 'Placement Drive',
    description: 'Placement registration is open.',
    category: 'Placement',
    createdAt: '2026-06-08T09:00:00Z',
    viewed: true,
  },
];

describe('NotificationList', () => {
  it('renders a list of notification cards', () => {
    render(
      <MemoryRouter>
        <NotificationList notifications={notifications} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Placement Drive')).toBeInTheDocument();
    expect(screen.getByText('Placement')).toBeInTheDocument();
  });

  it('shows empty state when there are no notifications', () => {
    render(
      <MemoryRouter>
        <NotificationList notifications={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /no notifications/i })).toBeInTheDocument();
  });

  it('shows error state with retry button', () => {
    const retry = vi.fn();

    render(
      <NotificationList
        notifications={[]}
        isError
        error={new Error('Network failure')}
        onRetry={retry}
      />,
    );

    expect(screen.getByText(/unable to load notifications/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(retry).toHaveBeenCalled();
  });
});
