import {forwardRef} from "react";
import {ActionSchema, ActionType, BaseActionSchema, baseActionSchema} from "@/src/lib/data/actions/definitions";
import {useForm} from "react-hook-form";
import {Form} from "@/src/components/new-york/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";


type DeleteActionFormProps = {
  defaultValues: BaseActionSchema
  onSubmit: (data: ActionSchema) => void
}


export const DeleteActionForm = forwardRef<HTMLFormElement, DeleteActionFormProps>(({defaultValues, onSubmit}, ref) => {

  const form = useForm({
    resolver: zodResolver(baseActionSchema),
    defaultValues: defaultValues
  })

  const handleSubmit = (data: any) => {
    onSubmit(data)
  }

  return <>

    <Form {...form}>
      <form ref={ref} onSubmit={event => {
        event.preventDefault()
        form.setValue("type", ActionType.Remove)
        form.handleSubmit(handleSubmit)()
        event.stopPropagation()
      }}>
      </form>
    </Form>
  </>

})

DeleteActionForm.displayName = "DeleteActionForm"