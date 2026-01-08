import React from 'react'

function UpdateUser() {
  return (
    <>
    
        <div className="max-w-md mx-auto p-6 border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>

      <form  className="space-y-4">
        {/* User ID */}
        <input
          type="number"
          placeholder="Enter User ID"
        
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Select what to update */}
        <select
       
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select what to update</option>
          <option value="name">Name</option>
          <option value="password">Password</option>
        </select>

        {/* Conditional Inputs */}
       
          <input
            type="text"
            placeholder="Enter new name"
          
            className="w-full border px-3 py-2 rounded"
            required
          />

   
          <input
            type="password"
            placeholder="Enter new password"
          
            className="w-full border px-3 py-2 rounded"
            required
          />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer"
        >
          Update User
        </button>
      </form>
    </div>
    </>
  )
}

export default UpdateUser
