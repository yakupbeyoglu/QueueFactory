import { queueHandler } from "../types/jobHandler";
import { redisConfig } from "../types/redisConfig";
import { baseQueue } from "./baseQueue";

export class processQueue extends baseQueue {
    protected redisConfigs: redisConfig;
    protected handler: queueHandler<string>;

    constructor(handler: string) {
        super();
        this.handler = new queueHandler(handler);
        console.log("I AM process queue", this.handler.getType());
    }


}
