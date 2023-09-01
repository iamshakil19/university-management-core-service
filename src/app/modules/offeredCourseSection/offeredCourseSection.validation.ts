import { z } from 'zod';

const createOfferCourseSectionZodSchema = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offered course id is required',
    }),
    maxCapacity: z.number({
      required_error: 'Max capacity is required',
    }),
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const UpdateOfferCourseSectionZodSchema = z.object({
  body: z.object({
    maxCapacity: z.number().optional(),
    title: z.string().optional(),
  }),
});

export const OfferedCourseSectionValidation = {
  createOfferCourseSectionZodSchema,
  UpdateOfferCourseSectionZodSchema,
};
