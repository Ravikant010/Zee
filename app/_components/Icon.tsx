"use client"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
export default function Icon({Icon, size=32, classname}:{
    Icon: LucideIcon,
    size?: number
    classname?:string
}){
    const {theme} = useTheme()
    console.log(theme)
return <Icon size={ size} className={cn("", {[classname as string]: classname ? classname: ""})}/>
}