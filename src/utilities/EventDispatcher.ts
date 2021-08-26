// source: https://stackoverflow.com/questions/51681107/create-custom-event-within-class-in-typescript/51681315

export type Handler<E> = (event: E) => void;

export class EventDispatcher<E> {
    private handlers: Handler<E>[] = [];
    fire(event: E) {
        for (let h of this.handlers)
            h(event);
    }
    register(handler: Handler<E>) {
        this.handlers.push(handler);
    }
    unregister(handler: Handler<E>) {
        if (this.handlers.indexOf(handler) == -1)
        {
            console.log("Cannot unregister this handler because it is not register.");
        }
        
        this.handlers.remove(handler);
    }
}