"use client";

import * as React from "react";
import {Label} from "@/src/components/new-york/ui/label";
import {TimePickerInput} from "@/src/components/new-york/ui/timer-picker-input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePickerDemo({date, setDate}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            HH
          </Label>
          <TimePickerInput
              picker="hours"
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            MM
          </Label>
          <TimePickerInput
              picker="minutes"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="seconds" className="text-xs">
            SS
          </Label>
          <TimePickerInput
              picker="seconds"
              date={date}
              setDate={setDate}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
          />
        </div>
      </div>
  );
}
