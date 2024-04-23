export const StatusCode = Object.freeze({
  OK: [200, 201] as const,
  Error: 400,
} as const);
