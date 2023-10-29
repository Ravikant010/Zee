import "@/app/globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import React, {ReactNode} from "react"
import TopNav from "./_components/TopNav"
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
// const ReactQueryDevtoolsProduction = React.lazy(() =>
//   import('@tanstack/react-query-devtools/build/modern/production.js').then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// )
export default function RootLayout({ children }: {children: ReactNode}) {

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>
           
     
            <TopNav />
           
            {children}
          
            </ClerkProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
