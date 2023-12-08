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

export interface AthleteZones {
  heart_rate: {
    custom_zones: boolean
    zones: Zone[]
  }
  power: {
    zones: Zone[]
  }
}

interface Zone {
  min: number
  max: number
}

export interface Stream {
  type: 'distance' | 'watts'
  data: number[]
  series_type: 'distance'
  original_size: number
  resolution: 'low' | 'medium' | 'high'
}

export type StreamSet = Stream[]

export type ActivitiesSummary = ActivitySummary[]

export interface ActivitySummary {
  resource_state: number
  athlete: {
    id: number
    resource_state: number
  }
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: 'Ride' | string
  sport_type: 'Ride' | string
  workout_type: number
  id: number
  start_date: string //'2022-10-29T11:42:47Z'
  start_date_local: string //'2022-10-29T13:42:47Z'
  timezone: string //'(GMT+01:00) Europe/Paris'
  utc_offset: number
  location_city: string | null
  location_state: string | null
  location_country: string
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: {
    id: string
    summary_polyline: string
    resource_state: number
  }
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  visibility: 'everyone' | string
  flagged: boolean
  gear_id: string
  start_latlng: [number, number]
  end_latlng: [number, number]
  average_speed: number
  max_speed: number
  average_cadence: number
  average_temp: number
  average_watts: number
  max_watts: number
  weighted_average_watts: number
  kilojoules: number
  device_watts: boolean
  has_heartrate: boolean
  heartrate_opt_out: boolean
  display_hide_heartrate_option: boolean
  elev_high: number
  elev_low: number
  upload_id: number
  upload_id_str: string
  external_id: string
  from_accepted_tag: boolean
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
}
