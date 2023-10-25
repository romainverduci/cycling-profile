export interface Athlete {
  id: string
  username: string
  resource_state: number
  firstname: string
  lastname: string
  bio: string
  city: string
  state: string
  country: string
  sex: 'M' | 'F'
  premium: boolean
  summit: boolean
  created_at: string
  updated_at: string
  badge_type_id: number
  weight: number
  profile_medium: string
  profile: string
  friend: null
  follower: null
}

export interface AthleteStats {
  biggest_ride_distance: number
  biggest_climb_elevation_gain: number
  recent_ride_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
    achievement_count: number
  }
  all_ride_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  recent_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
    achievement_count: number
  }
  all_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  recent_swim_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
    achievement_count: number
  }
  all_swim_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  ytd_ride_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  ytd_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  ytd_swim_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
}
