import {useTranslations} from "next-intl";
import {StreamerForm} from "@/app/[locale]/dashboard/streamers/components/streamer-form";
import React from "react";
import {StreamerSchema} from "@/lib/data/streams/definitions";
import {useHuyaTranslations} from "@/app/[locale]/dashboard/translations/huya-translations";
import {useDouyinQualityTranslations, useDouyinTranslations} from "@/app/[locale]/dashboard/translations/douyin-translations";


type StreamerFormWrapperProps = {
  templateData: StreamerSchema[],
  defaultStreamerValues: StreamerSchema,
  onSubmit: (data: StreamerSchema) => Promise<StreamerSchema>
}

export function StreamerFormWrapper({templateData, defaultStreamerValues, onSubmit}: StreamerFormWrapperProps) {

  const toastT = useTranslations("Toast")
  const streamerT = useTranslations("StreamerData")
  const streamerF = useTranslations("StreamerForm")
  const baseT = useTranslations("BaseDownloadConfigs")

  // huya translations
  const huyaT = useHuyaTranslations()

  // douyin translations
  const douyinT = useDouyinTranslations()
  const douyinQualityOptions = useDouyinQualityTranslations()

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
        huyaStrings: huyaT,
        douyinStrings: douyinT,
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