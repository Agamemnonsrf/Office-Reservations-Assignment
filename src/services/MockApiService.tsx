import { LoginException } from "../interfaces/api-interface";
import { UserI } from "../interfaces/db-intertface";
import { dbService } from "./IndexDbService";
import { userService } from "./UserService";

export const MockApiService = {


    getItems: async () => {
        await setTimeout(() => {}, 1000);
        if(true) {
          throw new Error("Error");
        }else{
          return {  name: "Item" };
        }
    },
  
    getItem: async (id: string) => {
      await setTimeout(() => {}, 1000);
      if(true) {
        throw new Error("Error");
      }else{
        return { id, name: "Item" };
      }
    },

    login: async (id : number) => {
        //await new Promise(resolve => setTimeout(resolve, 1000));
        return dbService.getUser(id)
          .then(user => {
            // Handle user data here
            localStorage.setItem("loged-in-user", JSON.stringify(user));
            userService.user = user as UserI;
            return user;
          })
          .catch(error => {
            localStorage.removeItem("loged-in-user");
            userService.user = null;
            throw new UnknownApiError({ code: 500, message: "Unknown error" });
          });
    }
    
};

class UnknownApiError extends Error {
    code: number;
    constructor(message : LoginException) {
      super(message.message);
      this.code = message.code;
    }
  }