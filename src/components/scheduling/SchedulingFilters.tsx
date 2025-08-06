import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SchedulingFilters = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [recruiter, setRecruiter] = useState<string>("");

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setStatus("");
    setType("");
    setRecruiter("");
  };

  const hasActiveFilters = dateFrom || dateTo || status || type || recruiter;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Date From */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[150px] justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
              !dateFrom && "text-white/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Data inicial"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFrom}
            onSelect={setDateFrom}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Date To */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[150px] justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
              !dateTo && "text-white/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTo ? format(dateTo, "dd/MM/yyyy") : "Data final"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateTo}
            onSelect={setDateTo}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="confirmado">Confirmado</SelectItem>
          <SelectItem value="pendente">Pendente</SelectItem>
          <SelectItem value="reagendado">Reagendado</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
          <SelectItem value="realizado">Realizado</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-[160px] bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entrevista-rh">Entrevista RH</SelectItem>
          <SelectItem value="entrevista-tecnica">Entrevista Técnica</SelectItem>
          <SelectItem value="entrevista-final">Entrevista Final</SelectItem>
          <SelectItem value="apresentacao">Apresentação</SelectItem>
          <SelectItem value="reuniao">Reunião</SelectItem>
        </SelectContent>
      </Select>

      {/* Recruiter Filter */}
      <Select value={recruiter} onValueChange={setRecruiter}>
        <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Recrutador" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="joao-santos">João Santos</SelectItem>
          <SelectItem value="maria-costa">Maria Costa</SelectItem>
          <SelectItem value="ana-paula">Ana Paula</SelectItem>
          <SelectItem value="carlos-silva">Carlos Silva</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      )}

      {/* Filter Icon */}
      <Button
        variant="ghost"
        size="sm"
        className="text-white/70 hover:text-white hover:bg-white/10"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SchedulingFilters;