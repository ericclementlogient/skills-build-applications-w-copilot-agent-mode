import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    fetchCollection('teams')
      .then((records) => {
        if (isActive) {
          setTeams(records)
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
    return <p className="status-message">Loading teams...</p>
  }

  if (error) {
    return <p className="status-message text-danger">Unable to load teams: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="data-card h-100">
              <h3>{team.name}</h3>
              <p>{team.city}</p>
              <dl>
                <dt>Mascot</dt>
                <dd>{team.mascot}</dd>
                <dt>Members</dt>
                <dd>{team.memberCount}</dd>
              </dl>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams