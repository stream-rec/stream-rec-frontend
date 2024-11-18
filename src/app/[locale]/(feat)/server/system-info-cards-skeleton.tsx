import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/new-york/ui/card";
import {Table, TableBody, TableCell, TableRow} from "@/src/components/new-york/ui/table";
import {Code, Coffee, GitCommit, Monitor} from "lucide-react";

import {ServerInfoStrings} from "@/src/app/hooks/translations/use-server-info-translations";
import {Skeleton} from "@/src/components/new-york/ui/skeleton";


type SystemInfoSkeletonProps = {
  strings: ServerInfoStrings
}

export default function SystemInfoSkeleton({strings}: SystemInfoSkeletonProps) {

  function generateSkeleton() {
    return <Skeleton className="h-4 w-12 md:w-40 lg:w-20 xl:w-26 2xl:w-32"/>
  }

  return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5"/>
              {strings.operatingSystem}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{strings.osName}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.osVersion}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.osArch}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5"/>
              {strings.javaEnvironment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{strings.javaVersion}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.javaVendor}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5"/>
              {strings.applicationVersion}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{strings.versionName}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.versionCode}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.docker}</TableCell>
                  <TableCell>{generateSkeleton()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="h-5 w-5"/>
              {strings.gitInformation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{strings.commitHash}</TableCell>
                  <TableCell className="font-mono text-sm">{generateSkeleton()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
}