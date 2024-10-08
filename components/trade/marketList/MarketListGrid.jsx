import axios from 'axios';
import MarketListTable from './MarketListTable';
import { memo, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

/** 
 * 실시간 마켓 코드 정보
  @description marketCodes: [{market, korean_name, english_name}]
  @description krwCodes: KRW로 시작하는 마켓 코드들
  @description tickers: KRW 마켓 코드들의 실시간 호가 정보
*/
function MarketListGrid({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const marketCodeMap = {};
  marketCodes.forEach(item => {
    marketCodeMap[item.market] = item.korean_name;
  });

  useEffect(() => {
    if (marketCodes) {
      const filtered = marketCodes
        .filter(code => code.market.includes('KRW'))
        .map(code => code.market);
      const fetchTickers = async () => {
        try {
          const codesString = filtered.join(',');
          const response = await axios.get(`/api/tickers?codes=${codesString}`);
          const data = await response.data;
          setTickers(data);
        } catch (error) {
          console.error('마켓 리스트 다운로드 오류: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTickers();
      const interval = setInterval(fetchTickers, 3000);
      return () => clearInterval(interval);
    }
  }, [marketCodes]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <MarketListTable tickers={tickers} marketCodeMap={marketCodeMap} />;
}
export default memo(MarketListGrid);
