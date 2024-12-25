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
import { Textarea } from '@/components/ui/textarea'
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
            Create a new task by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="title" className="sr-only">
            Link
          </Label>
          <Input id="title" type="text" name="title" placeholder="Title" />
        </div>
        <div>
          <Label htmlFor="description" className="sr-only">
            Description
          </Label>
          <Textarea
            className="max-h-64"
            id="description"
            placeholder="Description"
          />
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
          {/* <Dialog */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
