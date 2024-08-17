import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const datas = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error while fetching data');
      }
      const result = await response.json();
      datas.value = result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        error.value = new Error('Unknown error');
      }
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return {
    datas,
    loading,
    error,
    refetch: fetchData,
  };
}
