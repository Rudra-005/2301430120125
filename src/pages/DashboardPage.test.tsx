import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DashboardPage from './DashboardPage';
import * as notificationsHook from '@/hooks/useNotifications';

const stubResponse = {
  notifications: [],
  selectedCategory: undefined,
  setSelectedCategory: vi.fn(),
  searchQuery: '',
  setSearchQuery: vi.fn(),
  topN: 5,
  setTopN: vi.fn(),
  isLoading: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
  page: 1,
  setPage: vi.fn(),
  unreadCount: 0,
  priorityNotifications: [],
  topNotifications: [],
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.spyOn(notificationsHook, 'useNotifications').mockReturnValue(stubResponse);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the dashboard header and empty state when there are no notifications', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/notification dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/no notifications found/i)).toBeInTheDocument();
  });

  it('renders loading state when notifications are loading', () => {
    vi.spyOn(notificationsHook, 'useNotifications').mockReturnValue({
      ...stubResponse,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading notifications/i)).toBeInTheDocument();
  });
});
