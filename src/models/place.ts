import { Location } from '../types';

export class Place {
  constructor(
    public id: number,
    public title: string,
    public imageUri: string,
    public address: string,
    public location: Location,
  ) {}
}
