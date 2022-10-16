import { Job } from "bullmq";

export default async function (job:any) {
console.log("HELLO PROCESS", job.data);
}
