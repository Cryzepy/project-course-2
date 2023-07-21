import $ from "jquery"
import setUser from "../utils/api/user.js"

const UserList = (props) => {

	return (<>
            <hr className="hr1" />
               <div className="input">
                  <input type="text" id="username" />
                  <input type="text" id="password" />
                  <button className="btn btn-primary" id="btn-add-user" onClick={function(e){
                    const payload = {
                      username: $("#username").val(),
                      password: $("#password").val()
                    }
                    setUser.create(payload,{ setUsers: props.setUsers },function(){
                      $("#username").val("")
                      $("#password").val("")
                    })
                  }}>add user</button>
               </div>
    
               <div className="list-users-container">
                 { !props.users.length && <span className="table">tidak ada data</span> }
                 { props.users.length >= 1 && (
                   <table className="table">
                    <thead>
                      <tr>  
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
    
                    {
                      props.users.map((user,index) => {
                        return (
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{user.username}</td>
                              <td>{user.password}</td>
                              <td>
                                 <select id="role">
                                    <option value="admin" selected={user.role === "admin" ? true : false}>admin</option>
                                    <option value="user" selected={user.role === "user" ? true : false}>user</option>
                                 </select>
                              </td>
                              <td>
                                 <button className="btn btn-danger" onClick={function(){
                                  setUser.delete(user.username,{setUsers: props.setUsers})
                                 }}>delete</button>
                              </td>
                            </tr>
                        )
                      })
                    }
    
                  </tbody>
              </table>
             )
           }
           </div>
           </>)
}

export default UserList