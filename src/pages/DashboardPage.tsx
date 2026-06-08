import { Box, Grid, Pagination, Typography } from '@mui/material';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationList from '@/components/notifications/NotificationList';
import { useNotifications } from '@/hooks/useNotifications';
import Loader from '@/components/common/Loader';
import EmptyState from '@/components/common/EmptyState';

export default function DashboardPage() {
  const {
    notifications,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    topN,
    setTopN,
    page,
    setPage,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
  } = useNotifications();

  if (isLoading) {
    return <Loader message="Loading notifications..." />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load notifications"
        description={error?.message ?? 'There was a problem fetching the notification dashboard.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Notification Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Search announcements, filter by category, and review the latest campus notifications.
      </Typography>

      <NotificationFilters
        searchValue={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        topN={topN}
        onTopNChange={setTopN}
      />

      <Box sx={{ mt: 4 }}>
        <NotificationList
          notifications={notifications}
          isLoading={isLoading}
          isError={isError}
          error={error as Error | null}
          onRetry={refetch}
        />
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Box>
        )}
      </Box>

      {notifications.length === 0 && !isLoading && !isError ? (
        <Box sx={{ mt: 4 }}>
          <EmptyState title="No notifications found" description="Try adjusting the search or category filters." />
        </Box>
      ) : null}
    </Box>
  );
}
