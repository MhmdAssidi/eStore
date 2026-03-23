import {signal,Signal} from "@angular/core";
export class StoreItem<T> {
private readonly _state=signal<T>(null as unknown as T);

//sets the initial state
protected constructor(initialState:T) {
this._state.set(initialState);
}
//sets the new value
protected setValue(newValue:T):void {
this._state.set(newValue);  
}

protected getValue():T {
    return this._state();   
}

//readonly version of the signal itself
protected get state():Signal<T> {
    return this._state.asReadonly();    
}
}