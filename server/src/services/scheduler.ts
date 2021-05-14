import schedule from "node-schedule";

type Jobs = {
  [id: string]: schedule.Job;
};
class Scheduler {
  private static instance: Scheduler;
  private jobs: Jobs = {};
  static getInstance() {
    if (!this.instance) this.instance = new Scheduler();
    return this.instance;
  }

  runSchedule = (id: string, job: CallableFunction) => {
    if (this.jobs[id]) {
      console.info(`job exists and running ${id}`);
      return;
    }
    //run job every 30 min
    console.info("run schedule");
    const j = schedule.scheduleJob("*/30 * * * *", () => {
      console.info(`execute job ${id}`);
      job(!this.jobs[id]);
    });

    j.invoke();
    this.jobs[id] = j;
  };
  isRunning = (id: string) => !!this.jobs[id];
}
const instance = Scheduler.getInstance();

export { instance as Scheduler };
