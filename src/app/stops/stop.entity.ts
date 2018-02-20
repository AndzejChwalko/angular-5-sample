export class Stop {
    id: number;
    title: string;
    longitude: number;
    latitude: number;
    timings: Object[];

    constructor(id: number, title: string, longitude: number, latitude: number, timings?:Object[]){
        this.id = id;
        this.title = title;
        this.longitude = longitude;
        this.latitude = latitude;
        this.timings = timings;
    }
}
