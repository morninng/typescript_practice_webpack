"use strict";

import {Observable, BehaviorSubject, Observer, AjaxRequest  } from "./../../node_modules/rxjs/Rx";
import {fs} from './../../node_modules/file-system/file-system';



//import {$} from "jquery";

class Rxjs_Operator_Test{

	constructor(){};


	Range_test1 = function() {

        const source = Observable.range(4, 9);
        source.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }


//http://reactivex.io/documentation/operators/flatmap.html
	FlatMap_test1 = function() {

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



	Take_test1 = function() {

        const source = Observable.from([1,2,3,4,5])
                        .take(2)
        source.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }

	Empty_test1 = function() {

        const source = Observable.empty()
                    
        source.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }

	concat_test1 = function() {

        const source_1 = Observable.empty();
        const source_2 = Observable.from([1,2,3,4,5])
        const source_3 = Observable.from([9,8,7,6])
                    
        const source_4 = source_2.concat(source_1, source_3);
        source_4.subscribe(
            (x)=>{console.log(x)}
            ,
            null,
            ()=>{console.log("completed")}
        );
    }

    keydown_filter = function (){

        const keydown_src = Observable.fromEvent(document, 'keydown')
                                .filter( (e : KeyboardEvent)=>{
                                    console.log(e.keyCode);
                                    if(e.keyCode == 37 || e.keyCode == 38  || e.keyCode == 39  || e.keyCode == 40 ){
                                        return true;
                                    }
                                    throw Error("incorrect key passed");
                                })
        keydown_src.subscribe(
            (e : KeyboardEvent)=>{
                console.log(e.keyCode);
                console.log("success");
            },
            (error) => {
                console.log(error.message);
            },
            ()=>{
                console.log("completed");
            }
        )
    }


    foreach_key = function (){

        let keydown_sub = Observable.fromEvent(document, "keydown");

        let allowed_key_arr = [37,38,39,40];
        allowed_key_arr.forEach( (in_keycode)=>{
            let source = Observable.empty();
            const key_sub = keydown_sub.filter((e : KeyboardEvent)=>{
                if(e.keyCode == in_keycode){
                    console.log("key exist");
                    return true;
                }
                console.log(e.keyCode, "is filtered");
                return false;
            })
            source = source.concat(key_sub);

            source.subscribe(
                (e : KeyboardEvent)=>{
                    console.log(e.keyCode);
                },
                (error)=>{
                    console.log(error.message);
                },
                ()=>{
                    console.log("completed");
                }
            )
        })
    }


    subsequent_key = function (){

        let subsequent_key_arr = [37,40,39,38];

        let keydown_sub = Observable.fromEvent(document, "keydown");


        let source = Observable.empty();
        subsequent_key_arr.forEach( (in_keycode)=>{
            const key_sub = keydown_sub
                .filter((e : KeyboardEvent)=>{
                if(e.keyCode == in_keycode){
                    return true;
                }
                console.log(e.keyCode, "is filtered");
                return false;
            }).take(1)

            source = source.concat(key_sub);
        })

        source.subscribe(
            (e : KeyboardEvent)=>{
                console.log("on next" , e.keyCode);
            },
            (error)=>{
                console.log(error.message);
            },
            ()=>{
                console.log("completed");
            }
        )
    }


    subsequent_key_timeout = function(){

        let subsequent_key_arr = [37,40,39,38];
        let keydown_sub = Observable.fromEvent(document, "keydown");

        let source = Observable.empty();
        subsequent_key_arr.forEach( (in_keycode, index)=>{
            let key_sub = keydown_sub.filter((e : KeyboardEvent)=>{
                if(e.keyCode == in_keycode){
                    return true;
                }
                console.log(e.keyCode, "is filtered");
                return false;
            }).take(1);
            if(index > 0){
                key_sub = key_sub.timeout(500);
            }
            source = source.concat(key_sub);
        })

        source.subscribe(
            (e : KeyboardEvent)=>{
                console.log("on next" , e.keyCode);
            },
            (error)=>{
                console.log(error.message);
            },
            ()=>{
                console.log("completed");
            }
        )
    }

    ajax_call_create = function(){

        const get_ajax_observable = function(req_url){
            return Observable.create((observer)=>{

			    let xhr = new XMLHttpRequest();
                xhr.open("GET", req_url, true);
                xhr.onload = function(){
                    if(xhr.status == 200){
                        observer.next(xhr.response);
                        observer.complete()
                    }else{
                        observer.onError(new Error(xhr.statusText));
                    }
                }
                xhr.send();

            })
        }

        const test = get_ajax_observable("https://saxp.zedo.com/jsc/fns.json?n=3511&c=176&s=1&d=36&w=430&h=25&cs=1&r=1")
            .subscribe(
                (val)=>{
                    console.log(val)
                },
                ()=>{
                    console.log("error");
                },
                ()=>{
                    console.log("complete");
                }
            )
    }
    
    // https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/ajax.md
    // http://gregbabiars.com/as-much-rxjs-as-you-need/

    dom_get = function(){

        Observable.ajax.get("https://saxp.zedo.com/jsc/fns.json?n=3511&c=176&s=1&d=36&w=430&h=25&cs=1&r=1")
            .subscribe(
                (data)=>{console.log(data)},
                ()=>{
                    console.log("error");
                },
                ()=>{
                    console.log("complete");
                }
            )
    }



    scan_array = function(){

        const avg = Observable.from([1,2,3,4,5])
        .scan( (prev, cur) => {
            return {
            sum: prev.sum + cur,
            count: prev.count + 1
            };
        }, { sum: 0, count: 0 }).
        do((obj) => {console.log(obj)})
        .map(function(obj) {
            return obj.sum / obj.count;
        });

        const subscription = avg.subscribe( function (x) {
        console.log('average', x);
        });
    }


    scan_interval = function(){

        const avg = Observable.interval(1000)
        .scan( (prev, cur) => {
            return {
            sum: prev.sum + cur,
            count: prev.count + 1
            };
        }, { sum: 0, count: 0 }).
        do((obj) => {console.log(obj)})
        .map(function(obj) {
            return obj.sum / obj.count;
        });

        const subscription = avg.subscribe( function (x) {
        console.log('average', x);
        });
    }



/*
    read_file_nodecallback = function(){

        const readdir =  Observable.fromCallback(fs.readdir);
        let src = readdir('/home/morninng/Angular2/typescript_practice/package.json', 'utf8');
        src.subscribe()

    }
*/







}


export default Rxjs_Operator_Test;