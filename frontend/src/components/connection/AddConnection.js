import React from 'react';

export const AddConnection = () => {

  return (
    <div>
    <div>
      <label>Name</label>
      <input type={"text"} />
    </div>
    <div>
      <label>Description</label>
      <textarea type={"text"} />
    </div>
    <div>
      <label>Type</label>
      <select>
        <option value="actual value 1">Display Text 1</option>
        <option value="actual value 2">Display Text 2</option>
        <option value="actual value 3">Display Text 3</option>
      </select>
    </div>
    <div>
      <label>User</label>
      <input type={"text"} />
      <label>Password</label>
      <input type={"text"} />
    </div>
    <div>
      <label>URL</label>
      <input type={"text"} />
    </div>
    <button>Save</button>

  </div>
  )
}
  export default AddConnection;