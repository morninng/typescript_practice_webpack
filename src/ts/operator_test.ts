"use strict";

import {Observable  } from "./../../node_modules/rxjs/Rx";



//import {$} from "jquery";

class Rxjs_Operator_Test{

	constructor(){};


	Range_test1(): any{

        const source = Observable.range(4, 9);
        source.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }


//http://reactivex.io/documentation/operators/flatmap.html
	FlatMap_test1(): any{

        const source = Observable.from([1,2,3])
                        .flatMap((x :number)=>{
                            console.log("-----from " + x + "count" + 2*x);
                            return Observable.range(x,2*x);
                        })
        source.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }

}


export default Rxjs_Operator_Test;