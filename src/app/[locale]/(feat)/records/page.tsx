import RecordTableWrapper from "@/src/app/[locale]/(feat)/records/components/records-table-wrapper"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { streamSearchParamsSchema, StreamsSearchParams } from "@/src/lib/data/streams/definitions"
import { ContentLayout } from "@/src/components/dashboard/content-layout"
import { use } from "react"
import { SearchParams } from "@/src/types/table"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "Metadata" })
	return {
		title: t("title"),
	}
}

interface RecordsPageProps {
	searchParams: Promise<SearchParams>
}

export default async function RecordsPage(props: RecordsPageProps) {
	const searchParams = (await props.searchParams) || {
		page: 1,
		per_page: 10,
	}

	const search = streamSearchParamsSchema.parse(searchParams)

	const t = await getTranslations("RecordsPage")

	return (
		<>
			<ContentLayout title={t("title")}>
				<RecordTableWrapper search={search} />
			</ContentLayout>
		</>
	)
}
