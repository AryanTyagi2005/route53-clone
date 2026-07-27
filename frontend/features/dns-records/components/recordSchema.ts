import { z } from "zod";

export const createRecordSchema = z.object({
  name: z.string().min(1, "Record name is required"),

  type: z.enum(["A", "AAAA", "CNAME", "TXT", "MX", "NS", "PTR", "SRV", "CAA"]),

  value: z.string().min(1, "Value is required"),

  ttl: z.coerce.number().min(1, "TTL must be greater than 0"),
});

export type CreateRecordFormData = z.infer<typeof createRecordSchema>;
