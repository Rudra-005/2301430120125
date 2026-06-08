import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotificationCard from './NotificationCard';

const notification = {
  id: 'notification-1',
  title: 'Campus Event Update',
  description: 'The auditorium schedule has changed.',
  category: 'Event',
  createdAt: '2026-06-08T10:30:00Z',
  viewed: false,
};

describe('NotificationCard', () => {
  it('renders title, description, category, and date', () => {
    render(
      <MemoryRouter>
        <NotificationCard notification={notification} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /view notification details/i })).toBeInTheDocument();
    expect(screen.getByText('Campus Event Update')).toBeInTheDocument();
    expect(screen.getByText('The auditorium schedule has changed.')).toBeInTheDocument();
    expect(screen.getByText('Event')).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
