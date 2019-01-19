import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription, TeardownLogic } from 'rxjs/Subscription';
import { IScheduler, Scheduler } from 'rxjs/Scheduler';
import { List } from './List';
import { IEnumerable } from './IEnumerable';
import { EnumerableIterator } from './EnumerableIterator';

export class ObservableCollection<T> extends Observable<T> implements IEnumerable<T>  {


    static Create<T>(array: Array<T>): ObservableCollection<T> {
        return new ObservableCollection<T>(<any>[array]);
    }

    static dispatch(state: any) {

        const { array, index, count, subscriber } = state;

        if (index >= count) {
            subscriber.complete();
            return;
        }

        subscriber.next(array[index]);

        if (subscriber.closed) {
            return;
        }

        state.index = index + 1;

        (<any>this).schedule(state);
    }

    // value used if Array has one value and _isScalar
    private values: T[];


    constructor(private array: any[], private scheduler?: IScheduler) {
        super();
        // console.log(array);
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.values = <T[]>array[0];
        } else {
            this._isScalar = true;
            this.values = array;
        }
    }

    get Count(): number {
        return this.values.length;
    }
    get Values(): T[] {
        return this.values;
    }
    get Items(): T[] {
        return this.values;
    }
    set Items(value: T[]) {
        this.values = value;
    }

    public Add(item: T): void {
        if (this.values) {
            this.values.push(item);
        }
    }
    public AddRange(items: T[]): void {
        if (items) {
            for (let item of items) {
                this.Add(item);
            }
        }
    }
    public Remove(item: T): boolean {
        let index = this.values.indexOf(item);
        if (index > -1) {
            this.values.splice(index, 1);
        } else {
            return false;
        }

    }
    

    [Symbol.iterator]() {
        return new EnumerableIterator(this);
    }

    _subscribe(subscriber: Subscriber<T>): TeardownLogic {
        let index = 0;
        const array = this.array;
        const count = array.length;
        const scheduler = this.scheduler;

        if (scheduler) {
            return scheduler.schedule(ObservableCollection.dispatch, 0, {
                array, index, count, subscriber
            });
        } else {
            //console.log(this.values);
            for (let i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[0]);
            }
            subscriber.complete();
        }
    }
}