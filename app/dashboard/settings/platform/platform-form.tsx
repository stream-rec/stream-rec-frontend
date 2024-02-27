'use client'
import {Form} from "@/components/new-york/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "@/components/new-york/ui/use-toast";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/new-york/ui/tabs";
import {Button} from "@/components/new-york/ui/button";
import {DouyinTabContent} from "@/app/dashboard/settings/platform/tabs/douyin-tab";
import {HuyaTabContent} from "@/app/dashboard/settings/platform/tabs/huya-tab";


const platformFormSchema = z.object({
  huyaPrimaryCdn: z.string().optional(),
  huyaMaxBitrate: z.number().min(1000).optional().nullable(),
  huyaCookies: z.string().optional(),

  douyinCookies: z.string().regex(/__ac_nonce=.*; __ac_signature=.*;/).optional().nullable(),
  douyinQuality: z.string().optional(),
})

type PlatformFormValues = z.infer<typeof platformFormSchema>

const defaultValues: Partial<PlatformFormValues> = {}

export default function PlatformForm() {
  const form = useForm<PlatformFormValues>({
    resolver: zodResolver(platformFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: PlatformFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
      ),
    })
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  min-h-svh">
          <Tabs defaultValue="huya">
            <TabsList className="ml-auto">
              <TabsTrigger value="huya" className="text-zinc-600 dark:text-zinc-200">Huya</TabsTrigger>
              <TabsTrigger value="douyin" className="text-zinc-600 dark:text-zinc-200">Douyin</TabsTrigger>
            </TabsList>

            <div>
              <TabsContent value="huya">
                <HuyaTabContent control={form.control}/>
              </TabsContent>
              <TabsContent value="douyin">
                <DouyinTabContent control={form.control}/>
              </TabsContent>
            </div>

          </Tabs>

          <Button type="submit">Update</Button>
        </form>
      </Form>
  );
}