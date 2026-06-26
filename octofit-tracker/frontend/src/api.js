export const toCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const fetchCollection = async (apiUrl, signal) => {
  const response = await fetch(apiUrl, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return toCollection(await response.json());
};