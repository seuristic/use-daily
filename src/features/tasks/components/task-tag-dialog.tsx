import React from 'react'
import { LoaderIcon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EllipsisVerticalIcon } from 'lucide-react'

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
import { useAppStore } from '@/stores/use-app-store'
import { SidebarGroupAction } from '@/components/ui/sidebar'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import {
  TaskTagForm,
  TaskTagSchema,
  createTaskTag,
  editTaskTag,
  deleteTaskTag
} from '../api/task-tag'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

/* COMPONENT: Create */
export const CreateTaskTagDialog = () => {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { apps, setApps } = useAppStore()

  const form = useForm<TaskTagForm>({
    resolver: zodResolver(TaskTagSchema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (data: TaskTagForm) => {
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

/* COMPONENT: Edit & Delete */
export type ModifyTaskTagDialogProps = {
  id: string
  data: TaskTagForm
}

export const ModifyTaskTagDialog = ({ id, data }: ModifyTaskTagDialogProps) => {
  const [open, setOpen] = React.useState(false)
  const [openedDialog, setOpenedDialog] = React.useState<'edit' | 'delete'>()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const { refetch } = useAppStore()

  const form = useForm<TaskTagForm>({
    resolver: zodResolver(TaskTagSchema),
    defaultValues: { name: data.name }
  })

  const onEditSubmit = async (data: TaskTagForm) => {
    setIsSubmitting(true)

    try {
      await editTaskTag({ id, data })

      refetch()

      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onDeleteSubmit = async () => {
    setIsDeleting(true)

    try {
      await deleteTaskTag({ id })

      refetch()

      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction onClick={(e) => e.stopPropagation()} showOnHover>
            <EllipsisVerticalIcon />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DialogTrigger onClick={() => setOpenedDialog('edit')} asChild>
            <DropdownMenuItem>
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger onClick={() => setOpenedDialog('delete')} asChild>
            <DropdownMenuItem>
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-md">
        {openedDialog === 'edit' ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>Edit Tag</DialogTitle>
                <DialogDescription>Update an existing tag</DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="Write tag name" />
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
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Delete Tag</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete:{' '}
                <strong className="text-primary">{data.name}</strong> tag?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <div className="flex w-full justify-end gap-2">
                <Button
                  variant={'destructive'}
                  type={'submit'}
                  disabled={isDeleting}
                  onClick={onDeleteSubmit}
                >
                  <LoaderIcon
                    size={16}
                    className={`animate-spin ${isDeleting ? 'block' : 'hidden'}`}
                  />
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
