Kakao.init('addc27a1d3c735ad9ea960785ec3d5f7');
Kakao.isInitialized();

function KakaoLogin() {
   Kakao.Auth.login ({
    success: function (response) {
        Kakao.API.request ({
            url : '/v2/user/me',
            success : function (response){
                console.log(response);
                // document.getElementById('user').innerText = response.Kakao_account.profile.nickname;
            }        
        })
    }
   })
}

function KakaoLogout() {

}