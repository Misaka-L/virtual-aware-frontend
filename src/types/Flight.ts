export default interface Flight {
  id: string;
  callsign: string;
  instanceId: string;
  worldId: string;
  typeCode: string;
  registration: string;
  altitude: number;
  groundspeed: number;
  heading: number;
  latitude: number;
  longitude: number;
}
