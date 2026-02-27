import { cn } from "@/lib/utils";
import { Period } from "@/hooks/useToolData";

const periods: { value: Period; label: string }[] = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

interface DurationFilterProps {
  value: Period;
  onChange: (period: Period) => void;
  className?: string;
}

export function DurationFilter({ value, onChange, className }: DurationFilterProps) {
  return (
    <div className={cn("flex gap-1 bg-secondary/50 rounded-lg p-1", className)}>
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
            value === p.value
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
