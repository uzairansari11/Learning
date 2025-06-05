import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async ({ page = 1, limit = 5 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export default function PaginatedUsers() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", page], // Key includes page
    queryFn: () => fetchUsers({ page, limit }),
    keepPreviousData: true, // Optional: keeps previous data on screen while loading new
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users - Page {page}</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={data.length < limit}
        >
          Next
        </button>
      </div>

      {isFetching && <p>Background Updating...</p>}
    </div>
  );
}
