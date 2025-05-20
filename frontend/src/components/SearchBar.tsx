import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="flex gap-2 ">
      <Input
        placeholder="Buscar por nome..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="secondary" className="w-6" onClick={onSearch}>
        {" "}
        <Search className="w-2 h-2" />
      </Button>
    </div>
  );
}
