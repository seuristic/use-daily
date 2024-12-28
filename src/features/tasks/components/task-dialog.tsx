import { Badge } from '@/components/ui/badge'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LoaderIcon, XIcon } from 'lucide-react'
import React from 'react'
import {
  createTask,
  CreateTaskForm,
  CreateTaskSchema
} from '../api/create-task'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

export const TaskDialog = () => {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<CreateTaskForm>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: { title: '', description: '', tags: [] }
  })

  const onSubmit = async (data: CreateTaskForm) => {
    setIsSubmitting(true)

    try {
      const task = await createTask({ data })

      console.log('CREATED TASK', task)

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
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Create a new task by filling out the form below
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder="Add a task title" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...field}
                    className="max-h-64"
                    placeholder="Write down the task description here"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="space-y-2 rounded-md border border-dashed p-2">
                    <div className="flex flex-wrap gap-2">
                      {Array(10)
                        .fill(0)
                        .map((_, index) => (
                          <Badge
                            key={index}
                            variant={'secondary'}
                            className="inline-flex items-center gap-1 p-1"
                          >
                            <span className="px-1">Tag {index + 1}</span>
                            <span className="rounded-full bg-gray-700 p-0.5">
                              <XIcon size={12} />
                            </span>
                          </Badge>
                        ))}
                    </div>
                    <div className="flex h-[50px] w-full items-center justify-center text-sm text-muted-foreground">
                      No tags selected
                    </div>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="w-full" value="light">
                          Light
                        </SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
