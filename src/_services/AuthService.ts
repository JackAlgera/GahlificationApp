import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import { Config } from "../_utils/Config";
import { AsyncStorage } from 'react-native';

const axios = require('axios').default;

class AuthService {
  private login() : string {
    return axios
      .post('authenticate', { username: Config.database_username, password: Config.database_password })
      .then((response: AxiosResponse) => {
        if (response.data.token) {
          AsyncStorage.setItem('token', response.data.token);
        }

        return response.data.token;
      })
      .catch(() => {
        console.log("Incorrect login details");
      })
  }

  private getCurrentToken() : string | null {
    return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnYWhsb3UiLCJleHAiOjE2NTU2NDk2MjIsImlhdCI6MTY1NTA0NDgyMn0.JOfxJnNm83X9kPHe75YrNiWxeYjDFlwpwKkGfdChA2hqcYj4OCh-3-wdPsv-ot08QHKz3FuIGMaTfXwf-xd4yA';

    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        return this.login();
      }

      const decodedToken : any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return this.login();
      }

      return token;
    });
  }

  public getAuthHeader() {
    const token = this.getCurrentToken();

    if (token) {
      return { 'Authorization': `Bearer ${token}` }
    } else {
      return {}
    }
  }
}

export default new AuthService();
