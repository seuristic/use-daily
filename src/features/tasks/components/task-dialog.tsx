import { Badge } from '@/components/ui/badge'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { XIcon } from 'lucide-react'
import React from 'react'

export const TaskDialog = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Create a new task by filling out the form below
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Add a task title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="max-h-64"
            id="description"
            placeholder="Write down the task description here"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
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
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="flex w-full justify-end gap-2">
            <Button type="button" variant="secondary">
              Submit
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
