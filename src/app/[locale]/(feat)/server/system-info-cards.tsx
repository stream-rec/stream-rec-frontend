import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/new-york/ui/card";
import {Table, TableBody, TableCell, TableRow} from "@/src/components/new-york/ui/table";
import {Code, Coffee, GitCommit, Monitor} from "lucide-react";
import {ServerConfig} from "@/src/lib/data/server/definitions";
import {ServerInfoStrings} from "@/src/app/hooks/translations/use-server-info-translations";


export type SystemInfoProps = {
  systemInfo: ServerConfig
  strings: ServerInfoStrings
}

export default function SystemInfo({systemInfo, strings}: SystemInfoProps) {

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
                  <TableCell>{systemInfo.osName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.osVersion}</TableCell>
                  <TableCell>{systemInfo.osVersion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.osArch}</TableCell>
                  <TableCell>{systemInfo.osArch}</TableCell>
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
                  <TableCell>{systemInfo.javaVersion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.javaVendor}</TableCell>
                  <TableCell>{systemInfo.javaVendor}</TableCell>
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
                  <TableCell>{systemInfo.versionName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.versionCode}</TableCell>
                  <TableCell>{systemInfo.versionCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{strings.docker}</TableCell>
                  <TableCell>{String(systemInfo.docker)}</TableCell>
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
                  <TableCell className="font-mono text-sm">{systemInfo.commitHash}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
}