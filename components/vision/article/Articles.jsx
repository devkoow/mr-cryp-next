import axios from 'axios';
import PendingSkeleton from '../PendingSkeleton';
import ArticlesUI from './ArticlesUI';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert } from '@mui/material';

export default function Articles({ initialArticles }) {
  const [open, setOpen] = useState(false);
  const {
    data: articles = initialArticles,
    error,
    isPending,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('/api/articles', {
        params: { keyword: '비트코인' },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <PendingSkeleton />;

  if (error) {
    return (
      <Alert severity="error">
        네이버 기사 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  const handleOpen = async link => {
    try {
      await navigator.clipboard.writeText(link);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ArticlesUI
      articles={articles}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  );
}
