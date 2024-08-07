"use client"

import React, { useEffect, useState } from "react"
import Study from "./VideoInfo"
import { Code, Pre, Table, Th, Tr } from "@/nextra"
import cn from "clsx"
import VideoInfo from "./VideoInfo"
import BVHInfo from "./BVHInfo"
import axios from "axios"

export default function Page() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTeams() {
    const res = await axios.get("/api/submission")
    if (res.data.success) {
      setTeams(res.data.submissions)
    } else {
      console.error(res.error)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <div>
      <h2 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100 mt-10 border-b pb-1 text-3xl border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400">
        Team Submission
      </h2>
      <p className="mt-6 leading-7 first:mt-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <div
        className={cn(
          "-mx-6 mb-4 mt-6 overflow-x-auto overscroll-x-contain px-6 pb-4 ",
          "mask-gradient"
        )}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b py-4 text-left dark:border-neutral-700">
              <th className="py-2 font-semibold">ID</th>
              <th className="py-2 font-semibold">Team name</th>
              <th className="py-2 pl-6 font-semibold">BVH</th>
              <th className="py-2 pl-6 font-semibold">Videos</th>
            </tr>
          </thead>
          <tbody className="align-baseline text-gray-900 dark:text-gray-100">
            {teams.map((team, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-neutral-700/50"
              >
                <td className="py-2 pl-6">{index + 1}</td>
                <td className="py-2 pl-6">{team.teamname}</td>
                <td className="py-2 pl-6 h-24">
                  <div className="overflow-y-auto relative first:mt-0 flex flex-col gap-2 max-h-96 max-w-96">
                    {team.bvh &&
                      team.bvh.map((bvh, index) => {
                        return <BVHInfo submission={bvh} key={index} />
                      })}
                  </div>
                </td>
                <td className="py-2 pl-6 h-24">
                  <div className="overflow-y-auto relative first:mt-0 flex flex-col gap-2 max-h-96 max-w-96">
                    {team.videos &&
                      team.videos.map((info, index) => {
                        return <VideoInfo submission={info} key={index} />
                      })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
