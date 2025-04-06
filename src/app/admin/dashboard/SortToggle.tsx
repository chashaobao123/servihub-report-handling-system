import React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SortToggle( {
    sortToggleList,
    sortToggle,
    setSortToggle,
  }: {
    sortToggleList: string[];
    sortToggle: string;
    setSortToggle: (val: string) => void;
  }) {
  return (
    <Select>
      <h3 className="font-semibold mb-2">Sort by...</h3>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortToggleList.map((toggle) => (<SelectItem key={toggle} value={toggle}>{toggle}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
