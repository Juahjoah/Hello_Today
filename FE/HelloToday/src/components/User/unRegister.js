import logout from "./PageLogout"
import axios from "axios";

function unRegister() {
    const handleunregister = () => {
        //백에 요청 날리고
        const data = {
            headers: {
              Authorization: accesstoken_,
            },
          };
          try {
            axios.get(
              `${process.env.REACT_APP_BASE_URL}/api/test`,
              data
            );
           
          } catch (error) {
            console.log(error); 
            
          }
      };
      
  return <button onClick={() => handleunregister()}>회원 탈퇴</button>;
}
