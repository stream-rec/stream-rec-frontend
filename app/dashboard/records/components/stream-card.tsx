import {StreamData} from "@/app/lib/data/streams/definitions";
import {Card, CardHeader} from "@/components/new-york/ui/card";

type StreamCardProps = {
  data: StreamData
}

export function StreamCard(data: StreamCardProps) {

  return (
      <>

        <Card>

          <CardHeader>
            {data.data.id}
          </CardHeader>

        </Card>
      </>
  )
}