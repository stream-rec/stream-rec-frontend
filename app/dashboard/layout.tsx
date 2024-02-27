import {cookies} from "next/headers";
import {DashboardLayout} from "@/app/dashboard/components/dashboard";

export default function Layout({children}: { children: React.ReactNode }) {

  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
  const accounts = [
    {
      label: "stream-rec",
      email: "stream-rec",
      icon: "",
    },
  ]
  return (
      <DashboardLayout accounts={accounts} defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4}>
        {children}
      </DashboardLayout>
  );
}