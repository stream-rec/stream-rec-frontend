import { ContentLayout } from "@/src/components/dashboard/content-layout";
import { useTranslations } from "next-intl";
import PlaygroundForm from "./playground-form";

export default function PlaygroundPage() {
  const t = useTranslations("PlaygroundPage");

  return (
    <ContentLayout title={t("title")}>
      <div className="flex flex-col">
        <PlaygroundForm submitText={t("submit")} urlPlaceholder={t("enterUrl")} />
      </div>
    </ContentLayout>
  );
}
