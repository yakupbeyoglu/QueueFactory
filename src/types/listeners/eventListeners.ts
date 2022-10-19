import { Job } from "bullmq";

export interface workerListeners {
    completed?: (job: Job, returnvalue: any) => any;
    failed?: (job: Job, error: Error) => any;
    progress?: (jobId: string, data: number | object) => any
}
