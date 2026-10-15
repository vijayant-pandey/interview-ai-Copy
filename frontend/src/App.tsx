
import { useEffect, useState } from 'react'
import { createInterview, getHealth } from './api/client'
import type {
  CreateInterviewRequest,
  HealthResponse,
} from './api/client'
import './App.css'

function App() {
  const [showSetup, setShowSetup] = useState(false)
  const [role, setRole] = useState('Python Developer')
  const [experience, setExperience] = useState('Mid-level')
  const [interviewType, setInterviewType] = useState('Technical')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [createdInterviewId, setCreatedInterviewId] = useState<number | null>(null)


  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [healthError, setHealthError] = useState('')

  useEffect(() => {
    getHealth()
      .then((data) => {
        setHealth(data)
        setHealthError('')
      })
      .catch(() => {
        setHealth(null)
        setHealthError('Backend connection failed')
      })
  }, [])


async function handleSubmitInterview(
  event: React.FormEvent<HTMLFormElement>,
) {
  event.preventDefault()
  setIsSubmitting(true)
  setSubmitError('')
  setCreatedInterviewId(null)

  const experienceMap = {
    'Entry-level': 'entry',
    'Mid-level': 'mid',
    Senior: 'senior',
    'Lead / Architect': 'lead',
  } as const

  const interviewTypeMap = {
    Technical: 'technical',
    Behavioral: 'behavioral',
    Mixed: 'mixed',
  } as const

  const payload: CreateInterviewRequest = {
    job_role: role.trim(),
    experience_level:
      experienceMap[experience as keyof typeof experienceMap],
    interview_type:
      interviewTypeMap[interviewType as keyof typeof interviewTypeMap],
  }

  try {
    const interview = await createInterview(payload)
    setCreatedInterviewId(interview.id)
  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : 'Failed to save interview setup.',
    )
  } finally {
    setIsSubmitting(false)
  }
}

  function startInterview() {
    setShowSetup(true)
  }

  return (
    <main className="interview-app">
      <header>
        <h1>InterviewAI</h1>
        <p>Your AI-powered interview preparation assistant</p>

        <p role="status" aria-live="polite">
          {health
            ? `Backend connected: ${health.message}`
            : healthError || 'Checking backend connection...'}
        </p>
      </header>

      {!showSetup ? (
        <section>
          <h2>Welcome to InterviewAI</h2>
          <p>
            Practice interviews, improve your answers, and
            prepare confidently with AI.
          </p>

          <button type="button" onClick={startInterview}>
            Start Mock Interview
          </button>
        </section>
      ) : (
        <section>
          <h2>Set Up Your Mock Interview</h2>
          <p>Customize your interview before you begin.</p>

          <form onSubmit={handleSubmitInterview}>

            {submitError && (
              <p role="alert">
                Error: {submitError}
              </p>
            )}

            
            {createdInterviewId !== null && (
              <div role="status">
                <h3>Interview Setup Saved Successfully!</h3>
                <p>Interview ID: {createdInterviewId}</p>
                <p>Job Role: {role}</p>
                <p>Experience Level: {experience}</p>
                <p>Interview Type: {interviewType}</p>
              </div>
            )}



            <label htmlFor="role">Job role</label>
            <input
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            />

            <label htmlFor="experience">Experience level</label>
            <select
              id="experience"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
            >
              <option>Entry-level</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Lead / Architect</option>
            </select>

            <label htmlFor="interviewType">Interview type</label>
            <select
              id="interviewType"
              value={interviewType}
              onChange={(event) => setInterviewType(event.target.value)}
            >
              <option>Technical</option>
              <option>Behavioral</option>
              <option>Mixed</option>
            </select>

            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Interview Setup'}
            </button>

            <button
              type="button"
              onClick={() => setShowSetup(false)}
            >
              Back
            </button>
          </form>
        </section>
      )}
    </main>
  )
}

export default App
