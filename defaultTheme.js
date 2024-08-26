import { globalColors } from '@/globalColors';
import { createTheme, TableCell, Typography } from '@mui/material';
import { styled } from '@mui/system';

/** 컬러 팔레트, 기본 컴포넌트 세팅
 - 프로젝트 전체 배경색 : skyblue
 - primary : hotpink 
 - secondary : vanilla
        - light : 300
        - main : 400
        - dark : 500
 - contrastText: primary와 secondary의 서로 반대 컬러['300']
 */
export let theme = createTheme({
  palette: {
    primary: {
      main: globalColors.hotpink['400'],
      light: globalColors.hotpink['300'],
      dark: globalColors.hotpink['500'],
      contrastText: globalColors.vanilla['300'],
    },
    secondary: {
      main: globalColors.vanilla['400'],
      light: globalColors.vanilla['300'],
      dark: globalColors.vanilla['500'],
      constrastText: globalColors.hotpink['300'],
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: ${globalColors.skyblue['300']}; 
        }
      `,
    },
    // 타이포그래피
    MuiTypography: {
      defaultProps: {
        fontFamily: 'ChoseonGu',
      },
    },
    // 버튼
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
        color: 'primary',
        disableRipple: true,
      },
      styleOverride: {
        root: {
          fontSize: '2rem',
          marginTop: '10px',
        },
      },
    },
    // 테이블 컨테이너
    MuiTableContainer: {
      styleOverrides: {
        root: {},
      },
    },
    // 테이블
    MuiTable: {
      defaultProps: {},
    },
    // 테이블 헤드
    MuiTableHead: {
      defaultProps: {
        color: globalColors.vanilla['300'],
      },
      styleOverrides: {
        root: {
          backgroundColor: globalColors.hotpink['400'],
        },
      },
    },
    // 테이블 셀
    MuiTableCell: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          fontSize: 12,
          whiteSpace: 'nowrap',
          padding: 2,
          verticalAlign: 'middle',
        },
        head: {
          color: 'white',
        },
      },
    },
  },
});

// 홈 안내 타이포
export const InforTypo = styled(Typography)(() => ({
  fontSize: 48,
  fontWeight: 'bold',
  color: globalColors.white,
  fontFamily: 'CWDangamAsac-Bold',
  textShadow: globalColors.shadow_text,
  textAlign: 'center',
  '@media (max-width:1200px)': {
    fontSize: 32,
    lineHeight: 1.2,
  },
  '@media (max-width:900px)': {
    fontSize: 24,
    lineHeight: 1.2,
  },
  '@media (max-width:600px)': {
    fontSize: 18,
    lineHeight: 1.2,
  },
  '@media (max-width:450px)': {
    fontSize: 15,
    lineHeight: 1.2,
  },
}));

// 공통 서브 타이틀
export const SubTitle = styled(Typography)(() => ({
  fontSize: 32,
  fontFamily: 'NEXON Lv1 Gothic OTF',
  fontWeight: 'bold',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  marginBottom: 2,
  '@media (max-width:900px)': {
    fontSize: 24,
    lineHeight: 1.2,
  },
}));

// 공용 디스크립션
export const DescriptionTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  fontWeight: 'bold',
}));

// 공용 넥슨 고딕 타이포
export const NGTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
}));

// 공용 금액 타이포그래피
export const PriceTypo = styled(Typography)(() => ({
  fontFamily: 'ONE-Mobile-Title',
}));

// 네비게이션바 타이포그래피
export const NavTypo = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 500,
}));

// 네비게이션바 로고 타이포그래피
export const LogoTypo = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 'bold',
  fontStyle: 'italic',
}));

// 주문하기 모달 타이포그래피 : 모바일
export const MobModalTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
  '@media (max-width:500px)': {
    fontSize: '13px',
  },
}));

// 스티키 테이블 헤드
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'sticky',
  top: 0,
  zIndex: 100,
}));
