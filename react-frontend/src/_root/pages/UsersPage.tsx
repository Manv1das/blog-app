import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Account {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch accounts from the backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to fetch accounts");
        }

        const data: Account[] = await response.json();
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading accounts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center mx-auto py-8">
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Fooorum Users</h2>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {accounts.length > 0 ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-4 py-2 text-gray-600">First Name</th>
                    <th className="text-left px-4 py-2 text-gray-600">Last Name</th>
                    <th className="text-left px-4 py-2 text-gray-600">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 text-gray-300">{account.firstname}</td>
                      <td className="px-4 py-2 text-gray-300">{account.lastname}</td>
                      <td className="px-4 py-2 text-gray-300">{account.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;
