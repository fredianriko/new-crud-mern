import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // let friendList = [];
  const [listOfFriends, setListOfFriends] = useState([]);
  // function add friend
  const addFriend = () => {
    Axios.post("http://localhost:3001/addFriend", {
      name: name,
      age: age,
    })
      .then(() => {
        alert("it worked");
      })
      .catch(() => {
        alert("something wrong with my code");
      });
  };

  // function to get all friends
  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        // console.log(response.data);

        setListOfFriends(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function to update friend
  const updateFriend = (id, currName, currAge) => {
    let newAge = prompt("enter new age");
    let newName = prompt("enter new name");
    if (newName === "" || newName === null) {
      newName = currName;
    }
    if (newAge === "" || newAge === null) {
      newAge = currAge;
    }
    Axios.put("http://localhost:3001/update", { newAge: newAge, newName: newName, id: id }).then(() => {
      setListOfFriends(
        listOfFriends.map((val) => {
          return val._id == id ? { _id: id, name: newName, age: newAge } : val;
        })
      );
    });
  };

  //function to delete friend
  const deleteFriend = (id) => {
    Axios.delete("http://localhost:3001/delete", { data: { id: id } });
  };

  return (
    <div className="App">
      <div className="inputs">
        {/* name input */}
        <input
          type="text"
          placeholder="Friend Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        {/* age input */}
        <input
          type="number"
          placeholder="Friend Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button className="input-button" onClick={addFriend}>
          Add Friend
        </button>
      </div>
      <div className="table-label">
        <label className="name-label">Name</label>
        <label className="age-label">Age</label>
      </div>

      {listOfFriends.map((val) => {
        return (
          <>
            <div className="table-container">
              <div className="friend-table">
                <div className="name">{val.name}</div>
                <div className="age">{val.age}</div>
              </div>
              <button
                className="update-button"
                onClick={() => {
                  updateFriend(val._id, val.name, val.age);
                }}
              >
                update
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                delete
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default App;
