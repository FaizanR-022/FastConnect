// pages/Alumni/AlumniList.jsx
import { useState } from "react";
import { Container, Box, Grid, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";
import { AlumniDecorativeBackground } from "../../components/alumni/AlumniDecorativeBackground";
import { AlumniPageHeader } from "../../components/alumni/AlumniPageHeader";
import { AlumniSearchFilters } from "../../components/alumni/AlumniSearchFilters";
import { AlumniResultsCounter } from "../../components/alumni/AlumniResultsCounter";
import { AlumniCard } from "../../components/alumni/AlumniCard";
import { AlumniEmptyState } from "../../components/alumni/AlumniEmptyState";
import { ALUMNI_MOCK_DATA } from "../../constants/alumniMockData";

export default function AlumniList() {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [searchAttribute, setSearchAttribute] = useState("name");

  // Extract unique departments and years from data
  const departments = [...new Set(ALUMNI_MOCK_DATA.map((a) => a.department))];
  const years = [...new Set(ALUMNI_MOCK_DATA.map((a) => a.graduationYear))]
    .sort()
    .reverse();

  // TODO: Implement filtering logic later
  const filteredAlumni = ALUMNI_MOCK_DATA;

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
  //           matchesSearch = alumni.company.toLowerCase().includes(searchLower);
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

  return (
    <Box sx={styles.pageContainer}>
      {/* <AlumniDecorativeBackground /> */}

      <Container
        // maxWidth="xl"
        sx={{ py: { xs: 3, md: 5 }, position: "relative", zIndex: 1 }}
      >
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
              <AlumniCard alumni={alumni} />
            </Grid>
          ))}
        </Grid>

        {filteredAlumni.length === 0 && <AlumniEmptyState />}
      </Container>
    </Box>
  );
}
