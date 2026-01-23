import { useState, useEffect } from "react";
import { Search, Filter, X, Users, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  PageContainer,
  PageContent,
  LoadingSpinner,
  ErrorMessage,
} from "../../components/layout";
import { adminService } from "../../services/adminService";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { getInitials } from "../../utils/userInfoHelpers";
import { DEPARTMENTS, CAMPUSES } from "../../constants/authConstants";
import { ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

export default function AdminStudentsPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(0);
  const [limit] = useState(50);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const currentYear = new Date().getFullYear();
  const batches = Array.from({ length: 7 }, (_, i) => currentYear - i);

  useEffect(() => {
    fetchStudents();
  }, [page, searchTerm, departmentFilter, campusFilter, batchFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        limit,
        offset: page * limit,
      };

      if (searchTerm) params.search = searchTerm;
      if (departmentFilter !== "all") params.department = departmentFilter;
      if (campusFilter !== "all") params.campus = campusFilter;
      if (batchFilter !== "all") params.batch = batchFilter;

      const response = await adminService.getAllStudents(params);

      setStudents(response.students);
      setTotal(response.pagination.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("all");
    setCampusFilter("all");
    setBatchFilter("all");
    setPage(0);
  };

  const handleStudentClick = (e, id) => {
    e.stopPropagation();
    navigate(ROUTES.USER_PROFILE.replace(":userId", id));
  };

  const hasActiveFilters =
    searchTerm ||
    departmentFilter !== "all" ||
    campusFilter !== "all" ||
    batchFilter !== "all";

  if (loading && students.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <PageContainer>
      <PageContent maxWidth="6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Student Directory</h1>
            <p className="text-muted-foreground mt-1">
              Admin view - Total students: {total}
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{total}</h3>
                </div>
                <Users className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {students.filter((s) => s.isEmailVerified).length}
                  </h3>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unverified</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {students.filter((s) => !s.isEmailVerified).length}
                  </h3>
                </div>
                <XCircle className="w-8 h-8 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Page</p>
                  <h3 className="text-2xl font-bold mt-1">{page + 1}</h3>
                </div>
                <Filter className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {error && <ErrorMessage className="mb-6">{error}</ErrorMessage>}

        {/* Filters Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Department Filter */}
                <Select
                  value={departmentFilter}
                  onValueChange={(val) => {
                    setDepartmentFilter(val);
                    setPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Campus Filter */}
                <Select
                  value={campusFilter}
                  onValueChange={(val) => {
                    setCampusFilter(val);
                    setPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Campuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campuses</SelectItem>
                    {CAMPUSES.map((campus) => (
                      <SelectItem key={campus} value={campus}>
                        {campus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Batch Filter */}
                <Select
                  value={batchFilter}
                  onValueChange={(val) => {
                    setBatchFilter(val);
                    setPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Batches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {batches.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No students found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Campus</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={student.profilePicture} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(student.firstName, student.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            onClick={(e) => handleStudentClick(e, student.id)}
                            className="cursor-pointer"
                          >
                            <p className="font-medium">{student.fullName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {student.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{student.department}</Badge>
                      </TableCell>
                      <TableCell>{student.campus}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.isEmailVerified ? "default" : "destructive"
                          }
                        >
                          {student.isEmailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(student.joinedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {!loading && students.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {page * limit + 1} to{" "}
              {Math.min((page + 1) * limit, total)} of {total} students
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={(page + 1) * limit >= total}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
}
