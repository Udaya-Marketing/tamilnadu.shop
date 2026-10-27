import LaptopCatalog from "@/components/LaptopCatalog";

interface AllCategoriesPageProps {
  searchParams: Promise<{ query?: string; category?: string }>;
}

export default async function AllCategoriesPage({ searchParams }: AllCategoriesPageProps) {
  const { query, category } = await searchParams;

  return (
    <LaptopCatalog
      title="All Categories"
      initialSearchQuery={query || ""}
      initialCategory={category || "all"}
    />
  );
}
