import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Grid, Box, Skeleton, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SubTitle, DescriptionTypo, NGTypo } from '@/defaultTheme';

function VideoCard() {
  const theme = useTheme();
  const {
    isPending,
    data: videos = [],
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await axios.get('/api/youtube', {
        params: { keyword: '코인 추천' },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isPending) {
    return (
      <Grid container spacing={2}>
        {Array.from(new Array(3)).map((_, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ width: 300, mt: 3 }}>
              <Skeleton variant="rectangular" width={210} height={130} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        유튜브 영상 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      {videos.map(video => (
        <Grid item xs={12} sm={6} key={video.id}>
          <Box sx={{ width: '100%', mt: 3 }}>
            <Box
              component="img"
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 230,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                console.log(video.id.videoId);
                window.open(
                  `https://www.youtube.com/watch?v=${video.id}`,
                  '_blank',
                );
              }}
            />
            <Box sx={{ pr: 2 }}>
              <NGTypo gutterBottom variant="body2" fontWeight={'bold'}>
                {video.snippet.title.replace(/"/g, '').replace(/'/g, '')}
              </NGTypo>
              <NGTypo
                display="block"
                variant="caption"
                fontWeight={'bold'}
                sx={{ color: theme.palette.primary.main }}
              >
                {video.snippet.channelTitle}
              </NGTypo>
              <NGTypo variant="caption" fontWeight={'bold'}>
                {video.snippet.publishTime.slice(0, 10)}{' '}
                {video.snippet.publishTime.slice(11, 16)}
              </NGTypo>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Videos() {
  return (
    <Box sx={{ mb: 10, mr: 4 }}>
      <SubTitle>TREND 🔥</SubTitle>
      <DescriptionTypo>
        코인에 대한 실시간 트렌드를 확인해보세요!
      </DescriptionTypo>
      <VideoCard />
    </Box>
  );
}
