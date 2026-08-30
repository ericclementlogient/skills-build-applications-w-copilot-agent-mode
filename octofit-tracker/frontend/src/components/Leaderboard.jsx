import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    fetchCollection('leaderboard')
      .then((records) => {
        if (isActive) {
          setLeaderboard(records)
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
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status-message text-danger">Unable to load leaderboard: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id ?? entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h3>{entry.username}</h3>
              <p>{entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard