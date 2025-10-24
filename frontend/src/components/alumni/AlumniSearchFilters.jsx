// components/Alumni/AlumniSearchFilters.jsx
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Search } from "lucide-react";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniSearchFilters = ({
  searchQuery,
  departmentFilter,
  yearFilter,
  departments,
  years,
  onSearchChange,
  onDepartmentChange,
  onYearChange,
}) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={styles.filtersContainer}>
      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {/* Search Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by name, company, position, or expertise..."
            variant="outlined"
            value={searchQuery}
            onChange={onSearchChange}
            sx={styles.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color={theme.palette.primary.main} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Department Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={styles.filterSelect}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              label="Department"
              onChange={onDepartmentChange}
            >
              <MenuItem value="all">All Departments</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Year Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={styles.filterSelect}>
            <InputLabel>Graduation Year</InputLabel>
            <Select
              value={yearFilter}
              label="Graduation Year"
              onChange={onYearChange}
            >
              <MenuItem value="all">All Years</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
