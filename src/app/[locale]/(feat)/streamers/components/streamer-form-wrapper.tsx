import {useTranslations} from "next-intl";
import {StreamerForm} from "@/src/app/[locale]/(feat)/streamers/components/streamer-form";
import React from "react";
import {StreamerSchema} from "@/src/lib/data/streams/definitions";
import {useHuyaTranslations} from "@/src/app/hooks/translations/huya-translations";
import {useDouyinQualityTranslations, useDouyinTranslations} from "@/src/app/hooks/translations/douyin-translations";
import {useDouyuQualityTranslations, useDouyuTranslations} from "@/src/app/hooks/translations/douyu-translations";
import {useTwitchQualityTranslations, useTwitchTranslations} from "@/src/app/hooks/translations/twitch-translations";
import {usePandaTvQualityTranslations, usePandaTvTranslations} from "@/src/app/hooks/translations/pandatv-translations";
import {useWeiboTranslations} from "@/src/app/hooks/translations/weibo-translations";
import RichText from "@/src/components/i18n/RichText";


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

  // douyu translations
  const douyuT = useDouyuTranslations()
  const douyuQualityOptions = useDouyuQualityTranslations()

  // twitch translations
  const twitchT = useTwitchTranslations()
  const twitchQualityOptions = useTwitchQualityTranslations()

  // pandalive translations
  const pandaT = usePandaTvTranslations()
  const pandaQualityOptions = usePandaTvQualityTranslations()

  // weibo translations
  const weiboT = useWeiboTranslations()

  // action callbacks translations
  const actionsT = useTranslations("CallbacksConfigs")
  const rcloneT = useTranslations("Rclone")
  const commandT = useTranslations("Command")
  const removeT = useTranslations("RemoveAction")
  const moveT = useTranslations("MoveAction")
  const copyT = useTranslations("CopyAction")


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
          startTime: streamerT("startTime"),
          endTime: streamerT("endTime"),
        },
        streamerForm: {
          nameDescription: streamerF("nameDescription"),
          urlDescription: <RichText>{(tags) => streamerF.rich('urlDescription', tags)}</RichText>,
          enabledRecording: streamerF("enabledRecording"),
          enabledRecordingDescription: streamerF("enabledRecordingDescription"),
          templateDefault: streamerF("templateDefault"),
          templateDescription: <RichText>{(tags) => streamerF.rich('templateDescription', tags)}</RichText>,
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
        douyuStrings: douyuT,
        douyuQualityOptions: douyuQualityOptions,
        twitchStrings: twitchT,
        twitchQualityOptions: twitchQualityOptions,
        pandaStrings: pandaT,
        pandaQualityOptions: pandaQualityOptions,
        weiboStrings: weiboT,
        baseDownloadStrings: {
          danmu: baseT("danmu"),
          danmuDescription: baseT("danmuDescription"),
          cookies: baseT("cookieString"),
          cookiesDescription: baseT("cookiesDescription"),
          maxBitrate: baseT("maxBitrate"),
          maxBitrateDescription: baseT("maxBitrateDescription"),
          outputFolder: baseT("outputFolder"),
          outputFolderDescription: <RichText>{(tags) => baseT.rich('outputFolderDescription', tags)}</RichText>,
          outputFilename: baseT("outputFilename"),
          outputFilenameDescription: <RichText>{(tags) => baseT.rich('outputFilenameDescription', tags)}</RichText>,
          outputFileFormat: baseT("outputFormat"),
          outputFileFormatDescription: <RichText>{(tags) => baseT.rich('outputFormatDescription', tags)}</RichText>,
          outputFolderPlaceholderDescription: <RichText>{(tags) => baseT.rich('outputFolderPlaceholderDescription', tags)}</RichText>,
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
              remotePathDescription: <RichText>{(tags) => rcloneT.rich('remoteDescription', tags)}</RichText>,
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
            },
            copyStrings: {
              title: copyT("title"),
              destination: copyT("destination"),
              destinationDefault: copyT("destinationDefault"),
              destinationDescription: copyT("destinationDescription")
            },
          }
        }
      }
    }/>
  </>
}