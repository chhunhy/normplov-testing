"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerDemoProps = {
  selectedDate: string | null | undefined;
  onDateChange: (date: Date | undefined) => void;
};

export function DatePickerDemo({ selectedDate, onDateChange }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate && typeof selectedDate === "string" && isValid(parseISO(selectedDate))
      ? parseISO(selectedDate)
      : undefined
  );

  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);
    onDateChange(selected); // Pass the selected date back to the parent component
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-12 mt-1 text-left font-normal bg-white border-slate-200 text-textprimary placeholder-gray-400 text-md justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date && isValid(date) ? format(date, "PPP") : <span className="text-slate-400">ថ្ងៃ ខែ ឆ្នាំ កំណើត</span>}
          <span className="">
            <CalendarDays className="h-8 w-8" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-slate-700">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />
      </PopoverContent>
    </Popover>
  );
}
