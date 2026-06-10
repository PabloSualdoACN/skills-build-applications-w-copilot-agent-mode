export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${apiBase}/${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as T;
}

export function normalizeResponseArray<T>(data: any, keys: string[]): T[] {
  for (const key of keys) {
    if (Array.isArray(data[key])) {
      return data[key] as T[];
    }
  }

  if (Array.isArray(data)) {
    return data as T[];
  }

  return [];
}
