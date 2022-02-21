import { CronJob } from 'cron';
import EventService from "./event.service";

export class EventCronjob {

    cronJob: CronJob;

    constructor(io: any) {
        this.cronJob = new CronJob('* * * * *', async () => {
            try {
                const events =  await EventService.getEventsFromStartDate()
                console.log(events);
                io.emit('events', events);
            } catch (e) {
                console.error(e);
            }
        });

        // Start job
        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }

}
