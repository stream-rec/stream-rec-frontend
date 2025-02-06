import UploadsTableWrapper from "@/src/app/[locale]/(feat)/uploads/components/upload-table-wrapper"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { uploadSearchParamsSchema } from "@/src/lib/data/uploads/definitions"
import { ContentLayout } from "@/src/components/dashboard/content-layout"
import { SearchParams } from "@/src/types/table"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "Metadata" })

	return {
		title: t("title"),
	}
}

interface UploadPageProps {
	searchParams: Promise<SearchParams>
}

export default async function UploadPage(props: UploadPageProps) {
	const searchParams = await props.searchParams

	const search = uploadSearchParamsSchema.parse(searchParams)

	const t = await getTranslations("UploadsPage")

	return (
		<ContentLayout title={t("title")}>
			<UploadsTableWrapper search={search} />
		</ContentLayout>
	)
}
