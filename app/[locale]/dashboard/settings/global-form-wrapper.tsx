import {fetchConfig, updateConfig} from "@/lib/data/config/apis";
import {GlobalForm, GlobalFormStrings} from "@/app/[locale]/dashboard/settings/global-form";
import {getTranslations} from "next-intl/server";


export default async function GlobalFormWrapper() {

  const appConfig = await fetchConfig()

  const t = await getTranslations("GlobalSettings")

  const toast = await getTranslations("Toast")


  return (
      <>
        <GlobalForm appConfig={appConfig} update={updateConfig} globalStrings={{
          submitMessage: toast("submitMessage"),
          submitErrorMessage: toast("submitErrorMessage"),
          engine: t("engine"),
          engineDescription: t("engineDescription"),
          danmu: t("danmu"),
          danmuDescription: t.rich("danmuDescription"),
          deleteFiles: t("deleteFiles"),
          deleteFilesDescription: t.rich("deleteFilesDescription"),
          outputFolder: t("outputFolder"),
          outputFolderDescription: t.rich("outputFolderDescription"),
          outputFilename: t("outputFilename"),
          outputFilenameDescription: t.rich("outputFilenameDescription"),
          outputFormat: t("outputFormat"),
          outputFormatDescription: t.rich("outputFormatDescription"),
          minPart: t("minPart"),
          minPartDescription: t("minPartDescription"),
          minPartDefault: t("minPartDefault"),
          maxPart: t("maxPart"),
          maxPartDescription: t("maxPartDescription"),
          maxPartDefault: t("maxPartDefault"),
          maxPartDuration: t("maxPartDuration"),
          maxPartDurationDescription: t.rich("maxPartDurationDescription"),
          maxPartDurationDefault: t("maxPartDurationDefault"),
          maxConcurrentDownload: t("maxConcurrentDownload"),
          maxConcurrentDownloadDescription: t.rich("maxConcurrentDownloadDescription"),
          maxConcurrentUpload: t("maxConcurrentUpload"),
          maxConcurrentUploadDescription: t.rich("maxConcurrentUploadDescription"),
          downloadRetryDelay: t("downloadRetryDelay"),
          downloadRetryDelayDescription: t("downloadRetryDelayDescription"),
          maxDownloadRetries: t("maxDownloadRetries"),
          maxDownloadRetriesDescription: t("maxDownloadRetriesDescription"),
          save: t("save"),
        } as GlobalFormStrings}/>
      </>
  )

}