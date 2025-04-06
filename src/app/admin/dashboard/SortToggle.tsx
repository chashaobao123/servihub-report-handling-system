import React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@radix-ui/react-switch";
import { Button } from "@/components/ui/button";
import { GoArrowDown, GoArrowUp } from "react-icons/go";


export function SortToggle( {
    sortToggleList,
    sortToggle,
    setSortToggle,
    isDescending,
    setIsDescending,
  }: {
    sortToggleList: string[];
    sortToggle: string;
    setSortToggle: (val: string) => void;
    isDescending: boolean;
    setIsDescending: (val: boolean) => void;
  }) {
  return (
    <div>
    <h3 className="font-semibold mb-2">Sort by...</h3>
    <div className="flex space-x-2">
        <Select value={sortToggle} onValueChange={setSortToggle}>
        <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            {sortToggleList.map((toggle) => (<SelectItem key={toggle} value={toggle}>{toggle}</SelectItem>))}
            </SelectGroup>
        </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={() => (setIsDescending(!isDescending))}>
            {isDescending ? <GoArrowDown /> : <GoArrowUp />}
        </Button>
    </div>
    </div>
  )
}
