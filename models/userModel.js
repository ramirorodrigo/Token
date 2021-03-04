import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
//import RolesModel from "./rolesModel.js";
class UserModel {
  constructor() {
    //var roles = new RolesModel();
    this.Schema = mongoose.Schema;
    this.UserSchema = new this.Schema({
      foto: String,
      name: String,
      email: String,
      password: String,
      //roles: [roles.getSchema()],
    });
    //Ingresamos a llamar a la funcion model
    //this.mymodel = mongoose.model("users", this.UserSchema);
    if (modelenum["users"] == null) {
      this.mymodel = mongoose.model("users", this.UserSchema);
      modelenum["users"] = this.mymodel;
    } else {
      this.mymodel = modelenum["users"];
    }
  }
  /* 
  C. create
  */
  createUser(name, lastname, email, password, registerdate, age) {
    var user = {
      name,
      lastname,
      email,
      password,
      registerdate,
      age,
      roles: [],
    };
    var newuser = new this.mymodel(user);
    // aqui viene la validacion
    var error = newuser.validateSync();
    return new Promise((resolve, reject) => {
      if (error) {
        resolve(error);
        return;
      }
      newuser.save().then((docs) => {
        console.log("Usuario registrado");
        resolve(docs);
      });
    });
  }
  
}
export default UserModel;
