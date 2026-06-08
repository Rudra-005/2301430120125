import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { NotificationType } from '@/types/notification';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

interface NotificationFiltersProps {
  searchValue?: string;
  selectedCategory?: NotificationType;
  topN?: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category?: NotificationType) => void;
  onTopNChange?: (value: number) => void;
  debounceMs?: number;
}

const categoryOptions: Array<NotificationType | 'All'> = ['All', 'Event', 'Result', 'Placement'];

export default function NotificationFilters({
  searchValue = '',
  selectedCategory,
  topN,
  onSearchChange,
  onCategoryChange,
  onTopNChange,
  debounceMs = 300,
}: NotificationFiltersProps) {
  const [query, setQuery] = useState(searchValue);
  const debouncedQuery = useDebouncedValue(query, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchValue);
  }, [searchValue]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as NotificationType | 'All';
    onCategoryChange(value === 'All' ? undefined : value);
  };

  return (
    <Box
      component="section"
      aria-label="Notification filters"
      sx={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: {
          xs: '1fr',
          md: onTopNChange ? '2fr 1fr 160px' : '1fr 220px',
        },
        alignItems: 'end',
      }}
    >
      <TextField
        fullWidth
        label="Search notifications"
        placeholder="Search by title"
        value={query}
        onChange={event => setQuery(event.target.value)}
        inputProps={{ 'aria-label': 'Search notifications by title' }}
      />
      <FormControl fullWidth>
        <InputLabel id="notification-category-label">Category</InputLabel>
        <Select
          labelId="notification-category-label"
          value={selectedCategory ?? 'All'}
          label="Category"
          onChange={handleCategoryChange}
          inputProps={{ 'aria-label': 'Filter notifications by category' }}
        >
          {categoryOptions.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {typeof onTopNChange === 'function' && (
        <TextField
          fullWidth
          label="Top notifications"
          type="number"
          value={topN ?? 5}
          inputProps={{ min: 1, max: 20, 'aria-label': 'Top notifications count' }}
          onChange={event => onTopNChange(Number(event.target.value))}
        />
      )}
    </Box>
  );
}
