import type { Meta, StoryObj } from '@storybook/react'

import PublicLayout from './PublicLayout'

const meta: Meta<typeof PublicLayout> = {
  component: PublicLayout,
}

export default meta

type Story = StoryObj<typeof PublicLayout>

export const Primary: Story = {}
