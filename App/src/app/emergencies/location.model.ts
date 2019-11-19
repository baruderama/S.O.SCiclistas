export interface Coordinates {
    lat: number;
    lng: number;
  }

export interface EmergencyLocation extends Coordinates {
    address: string;
    staticMapImageUrl: string;
  }
