export class Observable<T> {
    constructor(firstValue: T = null, private publishOnSubscription = false) {
        this.currentValue = firstValue;
    }

    private currentValue: T;
    private observers: Observer[] = [];

    public subscribe(onNext: (data: T) => any): Observer {
        const observer = {
            onNext,
            unsubscribe() {}
        } as Observer

        if (this.publishOnSubscription) {
            observer.onNext(this.currentValue);
        }

        this.observers.push(observer);

        return observer;
    }

    public unSubscribe(observer: Observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    public next(data: T) {
        this.observers.forEach(o => o.onNext(data));
    }

}

export interface Observer {
    onNext(data): void;
}