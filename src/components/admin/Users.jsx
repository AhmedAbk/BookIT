import React, { useEffect, useState } from 'react';

function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedUserPhone, setEditedUserPhone] = useState('');
  const [editedUserEmail, setEditedUserEmail] = useState('');
  const [editedUserPass, setEditedUserPass] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allusers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error('Error deleting user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEdit = (userId, userName, userPhone, userEmail, userPass) => {
    setEditingUserId(userId);
    setEditedUserName(userName);
    setEditedUserPhone(userPhone);
    setEditedUserEmail(userEmail);
    setEditedUserPass(userPass);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedUserName,
          phone: editedUserPhone,
          email: editedUserEmail,
          pass: editedUserPass,
        }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingUserId
              ? {
                  ...user,
                  name: editedUserName,
                  phone: editedUserPhone,
                  email: editedUserEmail,
                  pass: editedUserPass,
                }
              : user
          )
        );

        setEditingUserId(null);
        setEditedUserName('');
        setEditedUserPhone('');
        setEditedUserEmail('');
        setEditedUserPass('');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingUserId === user.id ? (
              <div>
                <input
                  type="text"
                  placeholder="User Name"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editedUserPhone}
                  onChange={(e) => setEditedUserPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={editedUserEmail}
                  onChange={(e) => setEditedUserEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={editedUserPass}
                  onChange={(e) => setEditedUserPass(e.target.value)}
                />
                <button className="btn btn-success ml-2" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="btn btn-danger ml-2" onClick={() => setEditingUserId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <strong>{user.name}</strong>
                <br />
                <span>{user.phone}</span>
                <br />
                <span>{user.email}</span>
                <br />
                <span>{user.pass}</span>
              </div>
            )}
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
              {editingUserId !== user.id && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(user.id, user.name, user.phone, user.email, user.pass)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllUsers;
