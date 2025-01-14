import * as React from 'react'
import { LoaderIcon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EllipsisVerticalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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
import { SidebarGroupAction, useSidebar } from '@/components/ui/sidebar'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

type OpenedStateType = 'edit' | 'delete' | undefined

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
  const [dialogType, setDialogType] = React.useState<OpenedStateType>()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const { refetch } = useAppStore()

  const form = useForm<TaskTagForm>({
    resolver: zodResolver(TaskTagSchema),
    defaultValues: { name: data.name }
  })

  const onEdit = async (data: TaskTagForm) => {
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

  const onDelete = async () => {
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

  if (dialogType === 'delete') {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <CustomDropdownMenu dialogType="delete" setDialogType={setDialogType} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tag</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tag{' '}
              <strong className="text-primary">{data.name}</strong> and remove
              from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={onDelete}
                disabled={isDeleting}
                variant="destructive"
                type="submit"
              >
                <LoaderIcon
                  size={16}
                  className={`animate-spin ${isDeleting ? 'block' : 'hidden'}`}
                />
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CustomDropdownMenu dialogType="edit" setDialogType={setDialogType} />

      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onEdit)} className="space-y-4">
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
                <DialogClose asChild>
                  <Button variant="outline">Discard</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  <LoaderIcon
                    size={16}
                    className={`animate-spin ${isSubmitting ? 'block' : 'hidden'}`}
                  />
                  Update
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const CustomDropdownMenu = ({
  dialogType,
  setDialogType
}: {
  dialogType: 'edit' | 'delete' | undefined
  setDialogType: React.Dispatch<
    React.SetStateAction<'edit' | 'delete' | undefined>
  >
}) => {
  const { isMobile } = useSidebar()

  const CustomDropdownTrigger =
    dialogType === 'edit' ? DialogTrigger : AlertDialogTrigger

  return (
    <DropdownMenu modal={isMobile}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <EllipsisVerticalIcon />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <CustomDropdownTrigger onClick={() => setDialogType('edit')} asChild>
          <DropdownMenuItem>
            <span>Edit</span>
          </DropdownMenuItem>
        </CustomDropdownTrigger>
        <CustomDropdownTrigger onClick={() => setDialogType('delete')} asChild>
          <DropdownMenuItem>
            <span>Delete</span>
          </DropdownMenuItem>
        </CustomDropdownTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
