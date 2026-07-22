import Config from "../config/config";

import { Client, Account , ID} from "appwrite";

export class Authservice {
  client = new Client() ; 
  account ; 

  constructor(){
    this.client
      .setEndpoint(Config.appwriteUrl)
      .setProject(Config.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async CreateAccount({ email, password , name}){
    try{
      const userAccount = await this.account.create({userId : ID.unique() , email , password , name}) ;  
      if(userAccount){
        // call another method to login directly
        return this.Login({email , password})  ; 
      }
      else{
        return userAccount ; 
      }
    }catch(error){
      throw error ; 
    }
  }

  async Login ({email,password}){
    try{
      return await this.account.createEmailPasswordSession({email , password}) ;
    }
    catch(error){
      throw error ;
    }
  }


  async Logout (){
    try{
        return await this.account.deleteSession({
          sessionId : "current" , 
        })
    }
    catch(error){
      throw error
    }
  }

  async getCurrentUser(){
    try{
      return await this.account.get()
    }
    catch(error){
      return null ; 
    }
  }

}

const authService = new Authservice() ; 


export default authService 