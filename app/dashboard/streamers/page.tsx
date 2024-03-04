import React, {Suspense} from "react";
import {Button} from "@/components/new-york/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import Link from "next/link";

import StreamerListSkeleton from "@/app/dashboard/streamers/components/streamer-skeleton";
import StreamerList from "@/app/dashboard/streamers/components/streamer-list";

export default function Page() {
  return <div className="flex-1 flex-col space-y-8 p-8 md:flex">

    <div className="flex flex-col md:flex-row space-x-0 md:items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Streamers</h2>
        <p className="text-muted-foreground">
          List of streamers and their status.
        </p>
      </div>
      <Link href={"/dashboard/streamers/new"}>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4"/>
          Add streamer
        </Button>
      </Link>
    </div>

    <Suspense fallback={<StreamerListSkeleton/>}>
      <StreamerList/>
    </Suspense>
  </div>
}