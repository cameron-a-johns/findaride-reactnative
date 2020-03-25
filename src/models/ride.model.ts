export interface RideBase {
  owner: string;
  dateCreated: Date;
  date: Date;
  name: string;
}

export interface RideDetail extends RideBase {
  attendees?: string[];
  speed: number;
  startLocation: { lat: string; lon: string };
  style: number;
  duration: number;
  notes?: string;
}
