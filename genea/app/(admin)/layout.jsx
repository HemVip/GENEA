import { Callout } from "@/nextra"
import { ArrowLeftIcon, ArrowRightIcon } from "@/nextra/icons"
import { File } from "@/nextra/sidebar"
import { useSession } from "next-auth/react"
// import { Sidebar } from "@/nextra/sidebar"
import React from "react"
import AdminSidebar from "./AdminSidebar"

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex max-w-[90rem]">
      <AdminSidebar />
      <div id="reach-skip-nav"></div>
      <article className="w-full break-words nextra-content flex min-h-[calc(100vh-var(--nextra-navbar-height))] min-w-0 justify-center pb-8 pr-[calc(env(safe-area-inset-right)-1.5rem)]">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
          {children}
        </main>
      </article>
    </div>
  )
}
