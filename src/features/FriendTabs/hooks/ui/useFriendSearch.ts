import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { friendService } from '../../services';

export function useFriendSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debouncedSetSearchTerm = useRef(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 500)
  ).current;

  const { data: friends, isLoading: isLoading } = useQuery({
    queryKey: ['friend search', debouncedSearchTerm],
    queryFn: () => friendService.getFriendsBySearch(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
    select: data => data.data,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      debouncedSetSearchTerm(term);
    },
    [debouncedSetSearchTerm]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, []);

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  return {
    friends,
    isLoading,
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    clearSearch,
  };
}
