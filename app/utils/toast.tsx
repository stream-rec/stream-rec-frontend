import {toast} from "sonner";
import React from "react";

const toastTypes = ["success", "error", "warning", "info", "code"] as const

export function toastData(title: any, data: any, toastType: typeof toastTypes[number] = "success") {

  let description: string | React.JSX.Element = "";
  if (toastType === "code") {
    toast(title, {
      description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
    })
    return
  }

  if (toastType === "error") {
    toast.error(data)
  } else if (toastType === "warning") {
    toast.warning(data)
  } else if (toastType === "info") {
    toast.info(description)
  } else if (toastType === "success") {
    toast.success(data)
  }
}
