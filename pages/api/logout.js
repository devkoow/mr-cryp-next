import axios from 'axios';

/** 카카오 로그아웃 
- 액세스 토큰 전달
*/
const logoutKakao = async () => {
  try {
    await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );

    localStorage.removeItem('accessToken');
    localStorage.removeItem('socialType');
    localStorage.removeItem('userId');
    localStorage.removeItem('imgUrl');
    localStorage.removeItem('nickname');
    localStorage.removeItem('activePage');
    localStorage.removeItem('expires_in');
    console.log('카카오 로그아웃');
  } catch (error) {
    console.error('카카오 로그아웃 오류 : ', error);
  }
};

export default logoutKakao;
