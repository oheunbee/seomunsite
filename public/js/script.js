Kakao.init('addc27a1d3c735ad9ea960785ec3d5f7');
Kakao.isInitialized();


function KakaoLogin() {
   Kakao.Auth.login ({
    success: function (response) {
        Kakao.API.request ({
            url : '/v2/user/me',
            success : function (response){
                console.log(response);
                document.getElementById('user').innerText = response.Kakao_account.profile.nickname;
                document.getElementById('login').style.display = 'none';
                document.getElementById('logout').style.display = 'none';
                alert( response.Kakao_account.profile.nickname + '님 로그인 되었습니다.')
            }        
        })
    }
   })
};

function KakaoLogout() {
    if (!Kakao.Auth.getAccessToken()) {
        Kakao.API.request ({
            url : '/v1/user/unlink',
            success : function (response){
                console.log(response);
                document.getElementById('user').style.display = 'none';
                document.getElementById('login').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                alert('로그아웃 되었습니다.')
            }        
        })
        Kakao.Auth.setAccessToken(undefined)
      }
  
}