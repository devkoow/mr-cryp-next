import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KakaoAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const getAuthToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');
      const authCancel = urlParams.get('error');
      if (authCode) {
        try {
          const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            {
              grant_type: 'authorization_code',
              client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
              redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
              code: authCode,
              client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET_KEY,
            },
            {
              headers: {
                'Content-type':
                  'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          );
          const accessToken = response.data.access_token;
          localStorage.setItem('socialType', 'Kakao');
          localStorage.setItem('accessToken', accessToken);
          console.log('카카오 로그인');
          getUserData();
          navigate('/home');
        } catch (error) {
          console.error('카카오 로그인 오류: ', error.message);
        }
      }
      if (authCancel) {
        console.log('약관 동의 중 취소');
        window.alert('시작화면으로 돌아갑니다');
        navigate('/');
      }
    };

    const getUserData = async () => {
      try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });
        const data = response.data;
        const id = data.id;
        const imgUrl = data.kakao_account.profile.profile_image_url;
        const nickname = data.properties.nickname;
        localStorage.setItem('userId', id);
        localStorage.setItem('imgUrl', imgUrl);
        localStorage.setItem('nickname', nickname);
        console.log('카카오 유저 데이터 저장');
      } catch (error) {
        console.error('유저 데이터 다운로드 오류', error);
      }
    };
    getAuthToken();
  });

  return <></>;
}
