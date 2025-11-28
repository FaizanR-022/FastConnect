import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  useTheme,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";
import { AlumniPageHeader } from "../../components/alumni/AlumniPageHeader";
import { AlumniSearchFilters } from "../../components/alumni/AlumniSearchFilters";
import { AlumniResultsCounter } from "../../components/alumni/AlumniResultsCounter";
import { AlumniCard } from "../../components/alumni/AlumniCard";
import { AlumniEmptyState } from "../../components/alumni/AlumniEmptyState";
import { AlumniDetailModal } from "../../components/alumni/AlumniDetailModal";
import { alumniService } from "../../services/alumniService";
import { CAMPUSES, DEPARTMENTS, YEARS } from "../../constants/authConstants";

export default function AlumniList() {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  // Data states
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 12,
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("name");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Modal state
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch alumni function
  const fetchAlumni = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const queryParams = {
        page,
        limit: pagination.limit,
        searchAttribute,
        searchQuery: searchQuery.trim() || undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
        campus: campusFilter !== "all" ? campusFilter : undefined,
        graduationYear: yearFilter !== "all" ? yearFilter : undefined,
        sortBy: "graduationYear",
        sortOrder: "desc",
      };

      // Remove undefined values
      Object.keys(queryParams).forEach(
        (key) => queryParams[key] === undefined && delete queryParams[key]
      );

      const data = await alumniService.getAllAlumni(queryParams);

      setAlumni(data.alumni);
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
        total: data.pagination.total,
        limit: data.pagination.limit,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch alumni data");
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAlumni();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    fetchAlumni(1); // Reset to page 1 when searching
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    fetchAlumni(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle alumni card click
  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedAlumni(null), 200);
  };

  // Transform backend alumni data to match AlumniCard expected format
  const transformAlumniForCard = (alumniData) => {
    return alumniData.map((alum) => ({
      id: alum.publicId,
      name: alum.name,
      email: "", // Not provided by backend for listing
      phone: null,
      graduationYear: alum.graduationYear.toString(),
      department: alum.department,
      campus: alum.campus,
      currentPosition: alum.currentPosition,
      company: alum.currentCompany,
      location: `${alum.currentCity}, ${alum.currentCountry}`,
      expertise: alum.skills || [],
      previousCompanies: alum.previousCompanies.map((exp) => ({
        companyName: exp.company,
        role: exp.position,
        duration: {
          from: exp.from,
          to: exp.to,
        },
      })),
      avatar: alum.firstName?.[0] + alum.lastName?.[0] || "AL",
    }));
  };

  const transformedAlumni = transformAlumniForCard(alumni);

  return (
    <Box sx={styles.pageContainer}>
      <Container sx={{ py: { xs: 3, md: 5 }, position: "relative", zIndex: 1 }}>
        <AlumniPageHeader />

        <AlumniSearchFilters
          searchQuery={searchQuery}
          searchAttribute={searchAttribute}
          departmentFilter={departmentFilter}
          campusFilter={campusFilter}
          yearFilter={yearFilter}
          departments={DEPARTMENTS}
          campuses={CAMPUSES}
          years={YEARS}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchAttributeChange={(e) => setSearchAttribute(e.target.value)}
          onDepartmentChange={(e) => setDepartmentFilter(e.target.value)}
          onCampusChange={(e) => setCampusFilter(e.target.value)}
          onYearChange={(e) => setYearFilter(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <AlumniResultsCounter count={pagination.total} />

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {transformedAlumni.map((alumniItem) => (
                <Grid item xs={12} sm={6} md={4} key={alumniItem.id}>
                  <AlumniCard alumni={alumniItem} onClick={handleAlumniClick} />
                </Grid>
              ))}
            </Grid>

            {transformedAlumni.length === 0 && !loading && <AlumniEmptyState />}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                  mb: 2,
                }}
              >
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Alumni Detail Modal */}
      <AlumniDetailModal
        alumni={selectedAlumni}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </Box>
  );
}
