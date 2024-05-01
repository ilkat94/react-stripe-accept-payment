import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
interface Transaction {
  id: string;
  amount: number;
  status: string;
  billing_details: {
    address: {
      country: string;
    };
  };
}

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch('http://localhost:8000/api/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      const data = await response.json();
      setTransactions(data);
    };

    getTransactions();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {transaction.id}
              </th>
              <td className="px-6 py-4">
                {(transaction.amount / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4">
                {transaction.billing_details.address.country}
              </td>
              <td className="px-6 py-4">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
