import { Box, Grid, Pagination, Typography } from '@mui/material';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationList from '@/components/notifications/NotificationList';
import PrioritySection from '@/components/notifications/PrioritySection';
import { useNotifications } from '@/hooks/useNotifications';
import Loader from '@/components/common/Loader';
import EmptyState from '@/components/common/EmptyState';

export default function HomePage() {
  const {
    notifications,
    priorityNotifications,
    topNotifications,
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
  } = useNotifications();

  if (isLoading) {
    return <Loader message="Loading notifications..." />;
  }

  if (isError) {
    return <EmptyState title="Unable to load notifications" description={error instanceof Error ? error.message : 'Please try again later.'} />;
  }

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Campus Notifications
      </Typography>
      <NotificationFilters
        searchValue={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        topN={topN}
        onTopNChange={setTopN}
      />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <PrioritySection notifications={priorityNotifications} topNotifications={topNotifications} />
        </Grid>
        <Grid item xs={12} md={8}>
          <NotificationList notifications={notifications} />
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
        </Grid>
      </Grid>
    </Box>
  );
}
