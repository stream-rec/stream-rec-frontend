import UploadsTableWrapper from "@/app/dashboard/uploads/components/upload-table-wrapper";

export default function UploadsPage() {
  return (<>
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Uploads table</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your uploaded data.
              </p>
            </div>
          </div>
          <UploadsTableWrapper/>
        </div>
      </>
  )
}