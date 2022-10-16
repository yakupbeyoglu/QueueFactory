import { Path } from "typescript";

/*
    queue Handler is storing function or string that will use 
    by the Queue workers.

    It can return the handler function and type of the handler.
    The handler can be only string, Path and Function !

*/
export class jobHandler<T extends string | Path | Function> {
    private handler: T;

    constructor(handler: T) {
        this.handler = handler;
    }

    // return created handler to use call function
    getHandler() {
        return this.handler;
    }

    // return type of the hanlder
    getType() {
        return typeof this.handler;
    }
}
