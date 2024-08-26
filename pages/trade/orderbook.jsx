import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsOrderbook } from 'use-upbit-api';
import MarketCodeSelector from '@/components/Trade/MarketCodeSelector';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { globalColors } from '@/globalColors';
import { DescriptionTypo, NGTypo, PriceTypo, SubTitle } from '@/defaultTheme';

const OrderTable = memo(function OrderTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 1000, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsOrderbook(
    ...targetMarketCode,
    null,
    webSocketOptions,
  );

  const connectButtonHandler = event => {
    if (isConnected && socket) {
      socket.close();
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={4}>
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
        <Button onClick={connectButtonHandler}>
          <DescriptionTypo>연결종료</DescriptionTypo>
        </Button>
      </Box>
      {socketData ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 500,
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              paddingLeft: 1,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <NGTypo>마켓 티커 </NGTypo>
              <NGTypo fontWeight={'bold'}> : {socketData.code}</NGTypo>
            </Box>
            <NGTypo>총 매도 물량 : {socketData.total_ask_size}</NGTypo>
            <NGTypo>총 매수 물량 : {socketData.total_bid_size}</NGTypo>
          </Box>
          <Table display="flex">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <DescriptionTypo>매도 물량</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo>가격</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo>매수 물량</DescriptionTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`ask_${index}`}>
                    <TableCell sx={{ backgroundColor: 'skyblue' }}>
                      <PriceTypo fontSize={12} align="right">
                        {element.ask_size}
                      </PriceTypo>
                    </TableCell>
                    <TableCell>
                      <PriceTypo align="center" fontSize={12}>
                        {element.ask_price.toLocaleString()}
                      </PriceTypo>
                    </TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
              {[...socketData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <PriceTypo align="center" fontSize={12}>
                      {element.bid_price.toLocaleString()}
                    </PriceTypo>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.hotpink['500'] }}
                  >
                    <PriceTypo fontSize={12}>{element.bid_size}</PriceTypo>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LinearProgress color="primary" />
      )}
    </>
  );
});

function OrderBook() {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [curMarketCode, setCurMarketCode] = useState(
    marketCodes && marketCodes.length > 0 ? marketCodes[0].market : '',
  );
  const [targetMarketCode, setTargetMarketCode] = useState([
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ]);

  useEffect(() => {
    if (marketCodes) {
      const target = marketCodes.filter(code => code.market === curMarketCode);
      setTargetMarketCode(target);
    }
  }, [curMarketCode, marketCodes]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: 10 }}
    >
      <SubTitle>실시간 오더북</SubTitle>
      <MarketCodeSelector
        curMarketCode={curMarketCode}
        setCurMarketCode={setCurMarketCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <OrderTable targetMarketCode={targetMarketCode} />
    </Box>
  );
}

export default memo(OrderBook);
