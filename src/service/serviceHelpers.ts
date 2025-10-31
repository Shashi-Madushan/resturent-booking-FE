import type { QueryParams } from '../types/types';

export function sanitizeParams(params?: Record<string, unknown>): QueryParams | undefined {
  if (!params) {
    return undefined;
  }

  const sanitized: Partial<QueryParams> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return;
      }
      sanitized[key] = value.join(',');
      return;
    }

    if (value instanceof Date) {
      sanitized[key] = value.toISOString();
      return;
    }

    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      sanitized[key] = value;
      return;
    }

    sanitized[key] = JSON.stringify(value);
  });

  return Object.keys(sanitized).length ? (sanitized as QueryParams) : undefined;
}
