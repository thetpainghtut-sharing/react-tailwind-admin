import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { DepartmentService } from "../services/DepartmentService";
import { Department } from "../types/department.types";
import { useParams } from "react-router";

export default function BlankDetail() {
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
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <h2>Department Detail</h2>
      <ul>
          <li>Title: <strong>{data.title}</strong></li>
          <li>Since: {data.createdAgo && <span> - {data.createdAgo}</span>}</li>
      </ul>
    </div>
  );
}
