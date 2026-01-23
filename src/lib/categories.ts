export const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "General", value: "General" },
  { label: "Desktop", value: "Desktop" },
  { label: "Laptop", value: "Laptop" },
  { label: "Monitor", value: "Monitor" },
  { label: "Power Supply", value: "Power Supply" },
  { label: "Phone", value: "Phone" },
  { label: "Watch", value: "Watch" },
  { label: "Mouse", value: "Mouse" },
  { label: "Tablet", value: "Tablet" },
  { label: "Router", value: "Router" },
];

export const productCategoryOptions = categoryOptions.filter(
  (option) => option.value !== "all"
);
