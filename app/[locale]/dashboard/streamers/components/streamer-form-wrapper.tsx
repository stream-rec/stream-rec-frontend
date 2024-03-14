import {useTranslations} from "next-intl";
import {StreamerForm} from "@/app/[locale]/dashboard/streamers/components/streamer-form";
import React, {useMemo} from "react";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {DouyinQuality} from "@/app/[locale]/dashboard/settings/platform/tabs/douyin-tab";


type StreamerFormWrapperProps = {
  templateData: StreamerSchema[],
  defaultStreamerValues: StreamerSchema,
  onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

const douyinQualityKeys = ['origin', 'uhd', 'hd', 'sd', 'ld', 'md', 'ao'] as const

export function StreamerFormWrapper({templateData, defaultStreamerValues, onSubmit}: StreamerFormWrapperProps) {

  const toastT = useTranslations("Toast")
  const streamerT = useTranslations("StreamerData")
  const streamerF = useTranslations("StreamerForm")
  const baseT = useTranslations("BaseDownloadConfigs")

  // huya translations
  const huyaS = useTranslations("Huya")

  // douyin translations
  const douyinS = useTranslations("Douyin")
  const douyinQualityStrings = useTranslations("DouyinQualities")
  const douyinQualityOptions: DouyinQuality[] = useMemo(() => douyinQualityKeys.map((key) => ({
    quality: douyinQualityStrings(`${key}.id`),
    description: douyinQualityStrings(`${key}.name`)
  })), [douyinQualityStrings])

  // action callbacks translations
  const actionsT = useTranslations("CallbacksConfigs")
  const rcloneT = useTranslations("Rclone")
  const commandT = useTranslations("Command")
  const removeT = useTranslations("RemoveAction")
  const moveT = useTranslations("MoveAction")


  return <>

    <StreamerForm defaultValues={defaultStreamerValues} templateUsers={templateData} onSubmit={onSubmit} strings={
      {
        toast: {
          submitErrorMessage: toastT("submitErrorMessage"),
          submitMessage: toastT("submitMessage"),
        },
        streamerData: {
          name: streamerT("name"),
          url: streamerT("url"),
          template: streamerT("template"),
        },
        streamerForm: {
          nameDescription: streamerF("nameDescription"),
          urlDescription: streamerF.rich("urlDescription"),
          enabledRecording: streamerF("enabledRecording"),
          enabledRecordingDescription: streamerF("enabledRecordingDescription"),
          templateDefault: streamerF("templateDefault"),
          templateDescription: streamerF.rich("templateDescription"),
          templateSearch: streamerF("templateSearch"),
          noTemplate: streamerF("noTemplate"),
          doNotUseTemplate: streamerF("doNotUseTemplate"),
          asTemplate: streamerF("asTemplate"),
          asTemplateDescription: streamerF("asTemplateDescription"),
          streamerOnlyOptions: streamerF("streamerOnlyOptions"),
          alert: streamerF("alert"),
          alertOverrideDescription: streamerF("alertOverrideDescription"),
          platformSpecificOptions: streamerF("platformSpecificOptions"),
          defaultDownloadOptions: streamerF("defaultDownloadOptions"),
          callbackOptions: streamerF("callbackOptions"),
          save: streamerF("save"),
        },
        huyaStrings: {
          platform: huyaS("platform"),
          cdn: huyaS("cdn"),
          cdnDescription: huyaS("cdnDescription"),
          cdnDefault: huyaS("cdnDefault"),
          bitrate: huyaS("bitrate"),
          bitrateDescription: huyaS("bitrateDescription"),
          part: huyaS("part"),
          partDescription: huyaS.rich("partDescription"),
          cookieString: huyaS("cookieString"),
          cookieDescription: huyaS.rich("cookieDescription"),
        },
        douyinStrings: {
          platform: douyinS("platform"),
          quality: douyinS("quality"),
          qualityDescription: douyinS("qualityDescription"),
          qualityDefault: douyinS("qualityDefault"),
          part: douyinS("part"),
          partDescription: douyinS.rich("partDescription"),
          cookies: douyinS("cookieString"),
          cookiesDescription: douyinS.rich("cookiesDescription"),
        },
        douyinQualityOptions: douyinQualityOptions,
        baseDownloadStrings: {
          danmu: baseT("danmu"),
          danmuDescription: baseT("danmuDescription"),
          cookies: baseT("cookieString"),
          cookiesDescription: baseT("cookiesDescription"),
          maxBitrate: baseT("maxBitrate"),
          maxBitrateDescription: baseT("maxBitrateDescription"),
          outputFolder: baseT("outputFolder"),
          outputFolderDescription: baseT.rich("outputFolderDescription"),
          outputFilename: baseT("outputFilename"),
          outputFilenameDescription: baseT.rich("outputFilenameDescription"),
          outputFileFormat: baseT("outputFormat"),
          outputFileFormatDescription: baseT.rich("outputFormatDescription"),
        },
        actionTabStrings: {
          alert: actionsT("alert"),
          alertDescription: actionsT("alertDescription"),
          onPartedDownload: actionsT("onPartedDownload"),
          onPartedDownloadDescription: actionsT.rich("onPartedDownloadDescription", {
            important: (chunks) => <><br/><strong>{chunks}</strong></>

          }),
          onStreamEnded: actionsT("onStreamEnded"),
          onStreamEndedDescription: actionsT.rich("onStreamEndedDescription", {
            important: (chunks) => <><br/><strong>{chunks}</strong></>
          }),
          newAction: actionsT("newAction"),
          actionStrings: {
            title: actionsT("newAction"),
            description: actionsT("newActionDescription"),
            actionType: actionsT("actionType"),
            actionTypeDescription: actionsT("actionTypeDescription"),
            actionSelectPlaceholder: actionsT("actionSelectPlaceholder"),
            state: actionsT("actionState"),
            stateDescription: actionsT("actionStateDescription"),
            cancel: actionsT("cancel"),
            save: actionsT("save"),

            commandStrings: {
              title: commandT("title"),
              program: commandT("program"),
              programDescription: commandT("programDescription"),
              arguments: commandT("arguments"),
              argumentsDescription: commandT("argumentsDescription"),
              addArgument: commandT("addArgument"),
              removeArgument: commandT("removeArgument"),
            },
            rcloneStrings: {
              title: rcloneT("title"),
              operation: rcloneT("operation"),
              operationDescription: rcloneT("operationDescription"),
              remotePath: rcloneT("remote"),
              remotePathDescription: rcloneT("remoteDescription"),
              arguments: rcloneT("args"),
              argumentsDescription: rcloneT("argsDescription"),
            },
            removeStrings: {
              title: removeT("title")
            },
            moveStrings: {
              title: moveT("title"),
              destination: moveT("destination"),
              destinationDefault: moveT("destinationDefault"),
              destinationDescription: moveT("destinationDescription")
            }
          }
        }
      }
    }/>
  </>
}