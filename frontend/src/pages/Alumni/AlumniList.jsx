// pages/Alumni/AlumniList.jsx
import { useState, useMemo } from "react";
import { Container, Box, Grid, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";
import { AlumniDecorativeBackground } from "../../components/alumni/AlumniDecorativeBackground";
import { AlumniPageHeader } from "../../components/alumni/AlumniPageHeader";
import { AlumniSearchFilters } from "../../components/alumni/AlumniSearchFilters";
import { AlumniResultsCounter } from "../../components/alumni/AlumniResultsCounter";
import { AlumniCard } from "../../components/alumni/AlumniCard";
import { AlumniEmptyState } from "../../components/alumni/AlumniEmptyState";
import { AlumniDetailModal } from "../../components/alumni/AlumniDetailModal";
import { ALUMNI_MOCK_DATA } from "../../constants/alumniMockData";

export default function AlumniList() {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("name");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Extract unique departments and years from data
  const departments = [...new Set(ALUMNI_MOCK_DATA.map((a) => a.department))];
  const years = [...new Set(ALUMNI_MOCK_DATA.map((a) => a.graduationYear))]
    .sort()
    .reverse();

  const filteredAlumni = ALUMNI_MOCK_DATA;

  // Filter logic
  // const filteredAlumni = useMemo(() => {
  //   return ALUMNI_MOCK_DATA.filter((alumni) => {
  //     // Search filter based on selected attribute
  //     const searchLower = searchQuery.toLowerCase().trim();
  //     let matchesSearch = true;

  //     if (searchLower) {
  //       switch (searchAttribute) {
  //         case "name":
  //           matchesSearch = alumni.name.toLowerCase().includes(searchLower);
  //           break;
  //         case "company":
  //           // Search in both current and previous companies
  //           const currentCompanyMatch = alumni.company
  //             .toLowerCase()
  //             .includes(searchLower);
  //           const previousCompanyMatch = alumni.previousCompanies.some((pc) =>
  //             pc.companyName.toLowerCase().includes(searchLower)
  //           );
  //           matchesSearch = currentCompanyMatch || previousCompanyMatch;
  //           break;
  //         case "position":
  //           matchesSearch = alumni.currentPosition
  //             .toLowerCase()
  //             .includes(searchLower);
  //           break;
  //         case "expertise":
  //           matchesSearch = alumni.expertise.some((skill) =>
  //             skill.toLowerCase().includes(searchLower)
  //           );
  //           break;
  //         default:
  //           matchesSearch = true;
  //       }
  //     }

  //     // Department filter
  //     const matchesDepartment =
  //       departmentFilter === "all" || alumni.department === departmentFilter;

  //     // Year filter
  //     const matchesYear =
  //       yearFilter === "all" || alumni.graduationYear === yearFilter;

  //     return matchesSearch && matchesDepartment && matchesYear;
  //   });
  // }, [searchQuery, searchAttribute, departmentFilter, yearFilter]);

  // Handle alumni card click
  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedAlumni(null), 200); // Clear after animation
  };

  return (
    <Box sx={styles.pageContainer}>
      {/* <AlumniDecorativeBackground /> */}

      <Container sx={{ py: { xs: 3, md: 5 }, position: "relative", zIndex: 1 }}>
        <AlumniPageHeader />

        <AlumniSearchFilters
          searchQuery={searchQuery}
          searchAttribute={searchAttribute}
          departmentFilter={departmentFilter}
          yearFilter={yearFilter}
          departments={departments}
          years={years}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchAttributeChange={(e) => setSearchAttribute(e.target.value)}
          onDepartmentChange={(e) => setDepartmentFilter(e.target.value)}
          onYearChange={(e) => setYearFilter(e.target.value)}
        />

        <AlumniResultsCounter count={filteredAlumni.length} />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {filteredAlumni.map((alumni) => (
            <Grid item xs={12} sm={6} md={4} key={alumni.id}>
              <AlumniCard alumni={alumni} onClick={handleAlumniClick} />
            </Grid>
          ))}
        </Grid>

        {filteredAlumni.length === 0 && <AlumniEmptyState />}
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
