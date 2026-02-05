import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { Department } from "../../types/department.types";
import { DepartmentService } from "../../services/DepartmentService";
import { useParams } from "react-router";

export default function DepartmentDetail() {
  const { id } = useParams<{ id: string }>(); // 1. Get ID from URL
  const [data, setData] = useState<Department| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    DepartmentService.getById(Number(id))
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

  if (!data) return <div>Department not found</div>;

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Department Detail" />
      <div className="space-y-6">
        <ComponentCard title="Department Detail">
          
              {data.title}
            
        </ComponentCard>
      </div>
    </>
  );
}
