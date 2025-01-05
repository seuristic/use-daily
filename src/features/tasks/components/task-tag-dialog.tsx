import React from 'react'
import { LoaderIcon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  createTaskTag,
  CreateTaskTagForm,
  CreateTaskTagSchema
} from '../api/create-task-tag'
import { useAppStore } from '@/stores/use-app-store'
import { SidebarGroupAction } from '@/components/ui/sidebar'

export const TaskTagDialog = () => {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { apps, setApps } = useAppStore()

  const form = useForm<CreateTaskTagForm>({
    resolver: zodResolver(CreateTaskTagSchema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (data: CreateTaskTagForm) => {
    setIsSubmitting(true)

    try {
      const tag = await createTaskTag({ data })

      setApps({ task_tags: [...apps.task_tags, tag] })

      form.reset()
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction title="Add tags">
          <PlusIcon />
          <span className="sr-only">Add tags</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>New Tag</DialogTitle>
              <DialogDescription>Create a new tag</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Add a task tag" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <div className="flex w-full justify-end gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  <LoaderIcon
                    size={16}
                    className={`animate-spin ${isSubmitting ? 'block' : 'hidden'}`}
                  />
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
