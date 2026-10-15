
const API_BASE_URL = 'http://127.0.0.1:8001/api'

export interface HealthResponse {
  status: string
  message: string
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health/`)

  if (!response.ok) {
    throw new Error(`Health check failed: HTTP ${response.status}`)
  }

  return response.json() as Promise<HealthResponse>
}

export interface CreateInterviewRequest {
  job_role: string
  experience_level: 'entry' | 'mid' | 'senior' | 'lead'
  interview_type: 'technical' | 'behavioral' | 'mixed'
}

export interface InterviewSession extends CreateInterviewRequest {
  id: number
  created_at: string
}

export async function createInterview(
  data: CreateInterviewRequest,
): Promise<InterviewSession> {
  const response = await fetch(`${API_BASE_URL}/interviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Failed to create interview: HTTP ${response.status} - ${errorBody}`,
    )
  }

  return response.json() as Promise<InterviewSession>
}
