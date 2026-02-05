import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { Department } from "../../types/department.types";
import { DepartmentService } from "../../services/DepartmentService";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";

export default function DepartmentForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);    
    DepartmentService.create({title})
      .then((res) => {
        console.log(res);
        navigate('/departments');
      })
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));
  }

  // useEffect(() => {
  //   DepartmentService.create({title: ''})
  //     .then(setData)
  //     .catch(setError) // Shorthand for (e) => setError(e)
  //     .finally(() => setLoading(false));
  // }, []);

  // 1. Handle Loading State
  // if (loading) {
  //   return <div>Loading departments...</div>;
  // }

  // 2. Handle Error State
  // if (error) {
  //   return <div style={{ color: 'red' }}>Error: {error}</div>;
  // }

  // if (!data) return <div>Department not found</div>;

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Department Detail" />
      <div className="space-y-6">
        <ComponentCard title="Department Detail">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Label htmlFor="title">Add Title</Label>
              <Input type="text" id="title" placeholder="Admin, Sale, ..." value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            </div>
            <Button size="sm">
              <input type="submit" value='Create' />
            </Button>
          </form>
        </ComponentCard>
      </div>
    </>
  );
}
