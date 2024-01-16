export class Event {
    constructor(description, date = new Date()) {
        this.description = description;
        this.date = date;
    }
}
