import z from 'zod';

export const SchemaRegistrationForm = z
  .object({
    username: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    links: z.array(z.object({ value: z.url() })).min(1, 'Add one link'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
    when(payload) {
      return SchemaRegistrationForm.pick({
        password: true,
        confirmPassword: true,
      }).safeParse(payload.value).success;
    },
  });
