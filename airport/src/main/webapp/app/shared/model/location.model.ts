export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  state?: string;
}

export class Location implements ILocation {
  constructor(public id?: number, public streetAddress?: string, public postalCode?: string, public city?: string, public state?: string) {}
}
