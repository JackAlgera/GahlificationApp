import { AxiosError, AxiosResponse } from "axios";
import authService from "./AuthService";
import { Reminder } from "../_models/applicationModels";

const axios = require('axios').default;

class BackendAPIService {
  public getAllReminders = (
    responseCallback: (response: Array<Reminder>) => void,
    errorCallback: () => void
  ) => {
    axios
      .get(`reminders`, { headers: authService.getAuthHeader() })
      .then((response: AxiosResponse) => {
        responseCallback(response.data)
      })
      .catch((error: AxiosError) => {
        errorCallback();
      });
  };
}

export default new BackendAPIService();
