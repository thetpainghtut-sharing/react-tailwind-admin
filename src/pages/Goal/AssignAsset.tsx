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
import { GoalService } from "../../services/GoalService";

export default function AssignAsset() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  const [assetId, setAsset] = useState('');
  const [employeeId, setEmployee] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);    
    GoalService.assign({assetId,employeeId})
      .then((res) => {
        console.log(res);
        navigate('/assign');
      })
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    GoalService.getAllAssets('assigned')
      .then(setAssets)
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));

    GoalService.getAllEmployees()
      .then(setEmployees)
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));
  }, []);

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
      <PageBreadcrumb pageTitle="Assign Asset" />
      <div className="space-y-6">
        <ComponentCard title="Assign Asset">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Label htmlFor="title">Select Asset</Label>
              <select
                  id="department"
                  value={assetId}
                  onChange={(e) => setAsset(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm appearance-none focus:border-brand-300 focus:ring focus:ring-brand-500/20 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select Asset:</option>
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.title}
                    </option>
                  ))}
                </select>
            </div>

            <div className="mb-5">
              <Label htmlFor="title">Select Employee</Label>
              <select
                  id="employee"
                  value={employeeId}
                  onChange={(e) => setEmployee(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm appearance-none focus:border-brand-300 focus:ring focus:ring-brand-500/20 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select Employee:</option>
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
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
