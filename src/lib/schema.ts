import { z } from 'zod'

export const timestampSchema = z
  .number()
  .int()
  .nonnegative()
  .refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid timestamp'
  })

export const datetimeSchema = z.string().refine(
  (val) => {
    const date = new Date(val)
    return !isNaN(date.getTime()) && val.endsWith('Z')
  },
  {
    message: 'Invalid UTC datetime string'
  }
)
