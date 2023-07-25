import { Label } from "@/components/ui/Label";
import {
  SelectGroup,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import React from "react";

interface LimitSelectorProps {
  handleLimitChange: (value: string) => void;
  value: string;
}
const LimitSelector: React.FC<LimitSelectorProps> = ({
  handleLimitChange,
  value,
}) => {
  return (
    <SelectGroup className="flex items-center gap-2">
      <Label htmlFor="limit">Limit</Label>
      <Select
        onValueChange={handleLimitChange}
        value={value}
        name="limit"
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Record per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </SelectGroup>
  );
};

export default LimitSelector;
