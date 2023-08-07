import { KAKAO_AUTH_URL } from "./OAuth";
import classes from "./button.module.css";

function KakaoLoginButton (){
    const handleKakoLogin = () => {
        window.location.href = KAKAO_AUTH_URL
    }
    return (
        <button className = {classes.buttonstyle}><img src="../../images/Login/kakao_login_large_narrow.png" alt="kakaobtnimg" onClick = {handleKakoLogin}/></button>
    )
} 

export default KakaoLoginButton;
