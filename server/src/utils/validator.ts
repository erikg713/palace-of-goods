export const validateFields = (fields: string[], reqBody: any): { valid: boolean; missing: string[] } => {
  const missingFields = fields.filter((field) => !reqBody[field]);

  return {
    valid: missingFields.length === 0,
    missing: missingFields,
  };
};
