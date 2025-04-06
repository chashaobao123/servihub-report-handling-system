"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterTogglesProps {
  resolveFilters: string[];
  typeFilters: string[];
  reasonFilters: string[];
  selectedResolveFilters: string[];
  selectedTypeFilters: string[];
  selectedReasonFilters: string[];
  toggleResolveFilter: (value: string) => void;
  toggleTypeFilter: (value: string) => void;
  toggleReasonFilter: (value: string) => void;
}

export function FilterToggles({
  resolveFilters,
  typeFilters,
  reasonFilters,
  selectedResolveFilters,
  selectedTypeFilters,
  selectedReasonFilters,
  toggleResolveFilter,
  toggleTypeFilter,
  toggleReasonFilter
}: FilterTogglesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Status</h3>
        <div className="space-y-2">
          {resolveFilters.map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <Checkbox
                checked={selectedResolveFilters.includes(filter)}
                onCheckedChange={() => toggleResolveFilter(filter)}
              />
              {filter}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Type</h3>
        <div className="space-y-2">
          {typeFilters.map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <Checkbox
                checked={selectedTypeFilters.includes(filter)}
                onCheckedChange={() => toggleTypeFilter(filter)}
              />
              {filter}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Reason</h3>
        <div className="space-y-2">
          {reasonFilters.map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <Checkbox
                checked={selectedReasonFilters.includes(filter)}
                onCheckedChange={() => toggleReasonFilter(filter)}
              />
              {filter}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
