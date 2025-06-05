const users = [
  {
    id: 1,
    name: "Alice",
    isActive: true,
    plan: "premium",
    createdAt: "2022-03-15T09:00:00Z",
    devices: [
      { type: "desktop", os: "Windows" },
      { type: "mobile", os: "iOS" },
    ],
    invoices: [
      { id: 101, amount: 49.99, paid: true },
      { id: 102, amount: 49.99, paid: false },
    ],
  },
  {
    id: 2,
    name: "Bob",
    isActive: false,
    plan: "free",
    createdAt: "2023-02-01T10:30:00Z",
    devices: [{ type: "mobile", os: "Android" }],
    invoices: [],
  },
  {
    id: 3,
    name: "Charlie",
    isActive: true,
    plan: "premium",
    createdAt: "2021-11-20T12:00:00Z",
    devices: [
      { type: "tablet", os: "Android" },
      { type: "desktop", os: "macOS" },
    ],
    invoices: [{ id: 201, amount: 99.99, paid: true }],
  },
  {
    id: 4,
    name: "Diana",
    isActive: true,
    plan: "premium",
    createdAt: "2022-08-05T16:45:00Z",
    devices: [
      { type: "mobile", os: "Android" },
      { type: "desktop", os: "Linux" },
      { type: "tablet", os: "Windows" },
    ],
    invoices: [
      { id: 301, amount: 49.99, paid: false },
      { id: 302, amount: 49.99, paid: false },
    ],
  },
];

/*
🔹 Problem: Filter out active premium users who:
Have at least 2 devices
Have 1 or more unpaid invoices
One of their devices is mobile
The account was created before Jan 1, 2023
*/
const result = users.filter((user) => {
  const isAtleast2Devices = user.devices.length > 2;
  const oneOrMoreUnpaidInvoice =
    user.invoices.reduce((acc, invoice) => acc + invoice.paid?1:0,0) >= 1;
  const includeMobile = user.devices.find((device) => device.type === "mobile");

  if (isAtleast2Devices && oneOrMoreUnpaidInvoice && includeMobile) return user;
});

console.log(result);