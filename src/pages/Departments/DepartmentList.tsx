import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { useEffect, useState } from "react";
import { Department } from "../../types/department.types";
import { DepartmentService } from "../../services/DepartmentService";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";

export default function DepartmentList() {
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getAll()
      .then(setData)
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));
  }, []);

  // 1. Handle Loading State
  if (loading) {
    return <div>Loading departments...</div>;
  }

  // 2. Handle Error State
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  // 3. Handle Empty State (Optional but recommended)
  if (data.length === 0) {
    return <div>No departments found.</div>;
  }

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Departments" />
      <div className="space-y-6">
        <ComponentCard title="Department List" desc="This is a list of department!">
          <Button size="sm" onClick={() => navigate(`/departmentform`)}>Create</Button>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      No
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {data.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {department.id}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {department.title}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Button size="sm" onClick={() => navigate(`/departments/${department.id}`)}>Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
