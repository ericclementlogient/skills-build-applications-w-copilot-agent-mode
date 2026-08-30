import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    fetchCollection('users')
      .then((records) => {
        if (isActive) {
          setUsers(records)
          setError('')
        }
      })
      .catch((fetchError) => {
        if (isActive) {
          setError(fetchError.message)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return <p className="status-message">Loading users...</p>
  }

  if (error) {
    return <p className="status-message text-danger">Unable to load users: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.username}>
                <td>{user.displayName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.team}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users