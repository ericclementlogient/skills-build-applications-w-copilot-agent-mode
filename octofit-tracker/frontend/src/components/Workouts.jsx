import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    fetchCollection('workouts')
      .then((records) => {
        if (isActive) {
          setWorkouts(records)
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
    return <p className="status-message">Loading workouts...</p>
  }

  if (error) {
    return <p className="status-message text-danger">Unable to load workouts: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-4 col-md-6" key={workout._id ?? workout.name}>
            <article className="data-card h-100">
              <h3>{workout.name}</h3>
              <p>{workout.category}</p>
              <dl>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty}</dd>
              </dl>
              <div className="chip-row">
                {(workout.targetMuscles ?? []).map((muscle) => (
                  <span className="chip" key={muscle}>{muscle}</span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts