import { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
}
