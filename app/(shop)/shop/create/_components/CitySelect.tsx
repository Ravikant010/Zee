"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import dynamic from "next/dynamic"
import Loader from "@/components/loader"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]//@ts-ignore
const city = import('@/assests/city.json').then((module) => module.default);

export function CitySelect({setValue, value}: {
    setValue: React.Dispatch<React.SetStateAction<string>>,
    value: string
}) {
    const [open, setOpen] = React.useState(false);
  
    const [city_, setCity] = React.useState([]);
  
    React.useEffect(() => {
      city.then((cityData) => {
        setCity([...cityData]  as any);
      });
    }, []);
  
    if (city_) {
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("py-6 rounded-lg text-base focus-visible:ring-purple-400 min-w-32 max-w-auto")}
            >
                
                {value ? value : "Select City..."}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 h-52 overflow-y-scroll ml-10">
            <Command>
              <CommandInput placeholder="Search City..." />
              <CommandEmpty>No City found.</CommandEmpty>
              <CommandGroup className="overflow-y-scroll">
                {city_.map((city_city, index) => (
                  <CommandItem
                    key={index}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city_city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city_city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }
  return <Loader />
}



