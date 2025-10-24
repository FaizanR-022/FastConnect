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
  searchAttribute,
  departmentFilter,
  yearFilter,
  departments,
  years,
  onSearchChange,
  onSearchAttributeChange,
  onDepartmentChange,
  onYearChange,
}) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  const searchAttributes = [
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "position", label: "Position" },
    { value: "expertise", label: "Expertise" },
  ];

  return (
    <Box sx={styles.filtersContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {/* Search Field  */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
          {/* <TextField
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
          /> */}

          <TextField
            fullWidth
            placeholder={`Search by ${searchAttribute}...`}
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
              endAdornment: (
                <InputAdornment position="end">
                  <Select
                    value={searchAttribute}
                    onChange={onSearchAttributeChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                      fontSize: "0.875rem",
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      "& .MuiSelect-select": {
                        paddingRight: "24px !important",
                        paddingTop: 0,
                        paddingBottom: 0,
                      },
                      "& .MuiSvgIcon-root": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {searchAttributes.map((attr) => (
                      <MenuItem key={attr.value} value={attr.value}>
                        {attr.label}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Filters Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "row" },
            gap: { xs: 1.5, md: 2 },
            flex: { xs: "1 1 100%", md: "0 1 50%" },
            justifyContent: { md: "flex-end" },
          }}
        >
          {/* Spacing */}
          <Box sx={{ flex: 1, minWidth: { xs: "0%", sm: "0%", md: "20%" } }} />
          {/* Department Filter */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "50%", md: "40%" } }}>
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
          </Box>

          {/* Year Filter */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "50%", md: "40%" } }}>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
