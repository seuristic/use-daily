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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LoaderIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { createTask, TaskForm, TaskSchema } from '../api/task'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useAppStore } from '@/stores/use-app-store'
import { TaskTag } from '@/types/api'

export const TaskDialog = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectOpen, setSelectOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [tag, setTag] = React.useState('')

  const { apps } = useAppStore()

  const tagsMap = React.useMemo(() => {
    return apps.task_tags.reduce(
      (map, tag) => {
        map[tag.id] = tag
        return map
      },
      {} as { [id: string]: TaskTag }
    )
  }, [apps])

  const form = useForm<TaskForm>({
    resolver: zodResolver(TaskSchema),
    defaultValues: { title: '', description: '', tags: [] }
  })

  const { watch, setValue } = form
  const selectedTags = watch('tags')

  const addTag = (tag: string) => {
    setValue('tags', [...selectedTags, tag])
    setTag('')
  }

  const removeTag = (tag: string) => {
    setValue(
      'tags',
      selectedTags.filter((t) => t !== tag)
    )
  }

  const onSubmit = async (data: TaskForm) => {
    setIsSubmitting(true)

    try {
      const task = await createTask({ data })

      console.log('CREATED TASK', task)

      form.reset()
      setDialogOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent
        onEscapeKeyDown={(e) => selectOpen && e.preventDefault()}
        className="sm:max-w-md"
      >
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
                  <FormLabel htmlFor={field.name}>Title</FormLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Add a task title"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Description</FormLabel>
                  <Textarea
                    id={field.name}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Tags</FormLabel>
                  <div className="flex h-32 flex-col gap-y-4 rounded-lg border p-2">
                    {selectedTags.length > 0 ? (
                      <div className="flex-1 overflow-y-auto">
                        <div className="flex h-full flex-wrap items-start gap-2">
                          {selectedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={'outline'}
                              className="flex h-fit items-center gap-1 p-1 hover:cursor-pointer hover:bg-secondary"
                              onClick={() => removeTag(tag)}
                            >
                              <span className="px-1">
                                {tagsMap[tag]['name']}
                              </span>
                              <span className="p-0.5">
                                <XIcon size={12} />
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full flex-1 items-center justify-center text-sm text-muted-foreground">
                        No tags selected
                      </div>
                    )}
                    <Select
                      value={tag}
                      onValueChange={addTag}
                      open={selectOpen}
                      onOpenChange={setSelectOpen}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder="Select tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tags</SelectLabel>
                          {apps.task_tags.length > 0 ? (
                            apps.task_tags.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id}
                                disabled={selectedTags.includes(item.id)}
                              >
                                {item.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="no-tags">
                              No tags
                            </SelectItem>
                          )}
                        </SelectGroup>
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
