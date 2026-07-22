import Config from "../config/config";
import { Client , ID ,Databases , Storage , Query  } from "appwrite";

export class Service {
  client = new Client() ;
  databases ; 
  bucket ; 

  constructor(){
    this.client
      .setEndpoint(Config.appwriteUrl)
      .setProject(Config.appwriteProjectId) ; 
    this.databases = new Databases(this.client) ; 
    this.bucket = new Storage(this.client)
  }

  async createPost({title , slug , content , featuredImage , status , userID }) {
    try{
      return await this.databases.createDocument({
        databaseId: Config.appwriteDatabaseId , 
        collectionId: Config.appwriteCollectionId , 
        documentId: slug,
        data : {
          title ,
          content , 
          featuredImage , 
          status , 
          userID , 
        }
      })
    }
    catch(error){
      throw error
    }
  }
  async updatePost(slug , {title ,  content , featuredImage , status }) {
    try{
      return await this.databases.updateDocument({
        databaseId: Config.appwriteDatabaseId , 
        collectionId: Config.appwriteCollectionId , 
        documentId: slug,
        data : {
          title ,
          content , 
          featuredImage , 
          status , 
        }
      })
    }
    catch(error){
      throw error
    }
  }
  
  async deletePost (slug){
    try{
      await this.databases.deleteDocument({
        databaseId: Config.appwriteDatabaseId , 
        collectionId: Config.appwriteCollectionId , 
        documentId: slug,
      })
      return true 
    }
    catch(error){
      throw error
    }
  }
  
  async getPost(slug){
    try{
      return await this.databases.deleteDocument({
        databaseId: Config.appwriteDatabaseId , 
        collectionId: Config.appwriteCollectionId , 
        documentId: slug,
      })
    }
    catch(error){
      throw error
    }
  }
  
  async getPosts(queries = [Query.equal("Status" , "active")]){
    try {
      return await this.databases.listDocuments({
        databaseId: Config.appwriteDatabaseId , 
        collectionId: Config.appwriteCollectionId , 
        queries , 
      });
    } catch (error) {
      throw error 
    }
  }

  // file upload service 
  async uploadFile(file){
    try {
      return await this.storage.createFile({
        bucketId: appwriteurBucketId ,
        fileId: ID.unique,
        file : file , 
      })
    } catch (error) {
      throw error
    }
  }

  async deleteFile(fileId){
    try {
      await this.storage.deleteFile({
        bucketId: appwriteurBucketId ,
        fileId: fileId , 
      })
    } catch (error) {
      throw error
    }
  }
  
  getFilePreview(fileId){
    return this.storage.getFilePreview({
      bucketId: appwriteurBucketId ,
      fileId: fileId , 
    })
  }
  
}



const service = new Service() ; 

export default service