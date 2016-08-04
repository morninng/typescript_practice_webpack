"use strict";

import {Observable, Subject } from "./../../node_modules/rxjs/Rx";
import  "./../../mode_modules/rxjs/add/operator/startWith";

class Rxjs_Egghead_sample{

	constructor(){};

    interval_test = function(){

        let clock$ = Observable.interval(1000);
        clock$.subscribe(
            (value)=>{
                console.log(value);
            },
            ()=>{
            },
            ()=>{
            }
        )
    }

    interval_date = function(){

        let clock$ = Observable.interval(1000)
        .map(()=>{return new Date()});

        clock$.subscribe(
            (value)=>{
                console.log(value);
            },
            (error)=>{
                console.log(error);
            },
            ()=>{
                console.log("completed")
            }
        )
    }
/*
    return_test = function(){

        let source = Observable.StartWithSignature(1,2,3);
        
        source.subscribe(
            (value)=>{
                console.log(value);
            },
            ()=>{
            },
            ()=>{
            }
        )
    }
*/

}


export default Rxjs_Egghead_sample;