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
  Button,
} from "@mui/material";
import { Search } from "lucide-react";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniSearchFilters = ({
  searchQuery,
  searchAttribute,
  departmentFilter,
  campusFilter,
  yearFilter,
  departments,
  campuses,
  years,
  onSearchChange,
  onSearchAttributeChange,
  onDepartmentChange,
  onCampusChange,
  onYearChange,
  onSearch,
  loading,
}) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  const searchAttributes = [
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "position", label: "Position" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "expertise", label: "Expertise" },
  ];

  // Handle Enter key press in search field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Box sx={styles.filtersContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {/* Search Field with Button */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 35%" },
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder={`Search by ${searchAttribute}...`}
            variant="outlined"
            value={searchQuery}
            onChange={onSearchChange}
            onKeyPress={handleKeyPress}
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
            flex: { xs: "1 1 100%", md: "0 1 65%" },
            justifyContent: { md: "flex-end" },
          }}
        >
          {/* Department Filter */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "25%", md: "27%" } }}>
            <FormControl fullWidth sx={styles.filterSelect}>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={onDepartmentChange}
              >
                <MenuItem value="all">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Campus Filter */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "25%", md: "23%" } }}>
            <FormControl fullWidth sx={styles.filterSelect}>
              <InputLabel>Campus</InputLabel>
              <Select
                value={campusFilter}
                label="Campus"
                onChange={onCampusChange}
              >
                <MenuItem value="all">All Campuses</MenuItem>
                {campuses.map((campus) => (
                  <MenuItem key={campus} value={campus}>
                    {campus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Year Filter */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "25%", md: "20%" } }}>
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
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "25%", md: "20%" } }}>
            <Button
              variant="contained"
              onClick={onSearch}
              disabled={loading}
              sx={{
                mt: 0.5,
                minWidth: { xs: "80px", md: "100px" },
                background: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
                textTransform: "none",
                fontWeight: 600,
                boxShadow: theme.shadows[2],
              }}
            >
              {loading ? "..." : "Search"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
