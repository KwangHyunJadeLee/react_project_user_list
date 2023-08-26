import React, { useState } from "react";
import AddUser from "./component/AddUser";
import UserList from "./component/UserList";
function App() {
  const [usersList, setUsersList] = useState([]);

  const addUser = (uName, uAge) => {
    setUsersList((prevList) => {
      return [...prevList, { name: uName, age: uAge, id: Math.random().toString() }];
    });
  };

  return (
    <React.Fragment>
      <AddUser onAddUser={addUser} />
      {usersList && <UserList items={usersList} />}
    </React.Fragment>
  );
}

export default App;
