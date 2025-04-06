// ReportList.tsx
"use client";

import { ReportCard } from "./ReportCard";
import { useState } from "react";
import { FilterToggles } from "./FilterToggle";
import type { SerializedReport } from "./types";
import { SortToggle } from "./SortToggle";

const sortOptions = [
    "Date Submitted",
    "Date Resolved",
    "Target ID",
    "Submitted By",
    "Resolved By",
  ] 

export default function ReportList({ reports }: { reports: SerializedReport[] }) {
  const [sortToggle, setSortToggle] = useState<typeof sortOptions[number]>("Date Submitted");

  const [resolveFilter, setResolveFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [reasonFilter, setReasonFilter ] = useState<string[]>([]);

  const filteredReports = reports.filter((report) => {
    const resolveMatch =
      resolveFilter.length === 0 ||
      (resolveFilter.includes("resolved") && !!report.resolved_by) ||
      (resolveFilter.includes("unresolved") && !report.resolved_by);

    const typeMatch =
      typeFilter.length === 0 || typeFilter.includes(report.type);

    const reasonMatch = 
      reasonFilter.length === 0 || reasonFilter.includes(report.reason);

    return resolveMatch && typeMatch && reasonMatch;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortToggle) {
      case "Date Submitted":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "Date Resolved":
        return (
          new Date(b.resolved_at || 0).getTime() -
          new Date(a.resolved_at || 0).getTime()
        );
      case "Target ID":
        return parseInt(a.target_id) - parseInt(b.target_id);
      case "Submitted By":
        return (a.submitter?.name || "").localeCompare(b.submitter?.name || "");
      case "Resolved By":
        return (a.resolver?.name || "").localeCompare(b.resolver?.name || "");
      default:
        return 0;
    }
  });

    return(
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      <aside className="sticky top-6 self-start space-y-6">
        <SortToggle
          sortToggleList={sortOptions}
          sortToggle={sortToggle}
          setSortToggle={setSortToggle}
        />  
        <FilterToggles
          resolveFilters={["resolved", "unresolved"]}
          typeFilters={["review", "user", "business", "service", "other"]}
          reasonFilters={["spam", "harrassment", "misleading", "inappropriate", "other"]}
          selectedResolveFilters={resolveFilter}
          selectedTypeFilters={typeFilter}
          selectedReasonFilters={reasonFilter}
          toggleResolveFilter={(val) =>
            setResolveFilter((prev) =>
              prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
            )
          }
          toggleTypeFilter={(val) =>
            setTypeFilter((prev) =>
              prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
            )
          }
          toggleReasonFilter={(val) =>
            setReasonFilter((prev) =>
              prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
            )
          }
        />
      </aside>

      <section>
        <div className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold">{sortedReports.length}</span> result
          {sortedReports.length !== 1 && "s"}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>
    </div>
  );
}
