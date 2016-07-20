"use strict";

import {Observable, BehaviorSubject } from "./../../node_modules/rxjs/Rx";



//import {$} from "jquery";

class Rxjs_LigPractice{

	constructor(){};

	lig_practice_1_drag(): any{

		const box_element = document.getElementById("box");
		const mouseup_event = Observable.fromEvent(box_element, 'mouseup');
		const mousemove_event = Observable.fromEvent(box_element, 'mousemove');
		const mousedown_event = Observable.fromEvent(box_element, 'mousedown');

		const source = mousedown_event.flatMap( (event : MouseEvent) => {
			
			let start_pageX = event.pageX;
			let start_pageY = event.pageY;
			let start_left = box_element.offsetLeft;
			let start_top = box_element.offsetTop;
			console.log("start x" , start_pageX , 'start y' , start_pageY);
			console.log("start box left" , start_left , 'start box top' , start_top);
			box_element.className = "hovering";

			return mousemove_event.map((e : MouseEvent)=>{
				console.log("mouse x" , e.pageX , "mouse y" , e.pageY)
				return {
					left: start_left + (e.pageX - start_pageX),
					top: start_top + (e.pageY - start_pageY)
				};
			}).takeUntil(mouseup_event);
		});

		mouseup_event.subscribe(
			()=>{
				box_element.className = null;
			}
		);



		source.subscribe((pos)=>{
			console.log("pos X" , pos.left , "pos y" , pos.top);
			console.log("left", box_element.style.left , "top", box_element.style.top  )
			box_element.style.left = String(pos.left) + "px";
			box_element.style.top = String(pos.top) + "px";
			console.log("---------------");
		})
		
	}


	lig_practice_2_databind(): any{

/*
how to retrieve element under some element
http://stackoverflow.com/questions/7815374/get-element-inside-element-by-class-and-id-javascript
*/ 
		const text_input_element
		      = document.getElementById("text_container").getElementsByTagName("input")[0];
		const rx_txt_sub = new BehaviorSubject(text_input_element.value);

		const size_input_element
		      = document.getElementById("size_container").getElementsByTagName("input")[0];
		const rx_size_sub = new BehaviorSubject(size_input_element.value);

		const color_input_element
		      = document.getElementById("color_container").getElementsByTagName("input")[0];
		const rx_color_sub = new BehaviorSubject(size_input_element.value);



		const text_textbind = document.getElementById("text_bind");

		rx_txt_sub.subscribe((val)=>{
			text_textbind.innerText = val;
		})
		rx_size_sub.subscribe((val)=>{
			text_textbind.style.fontSize = val + "px";
		})
		rx_color_sub.subscribe((val)=>{
			text_textbind.style.color = val;
		})

		const bind = function(eType, elem, subject){
			Observable.fromEvent(elem, eType).subscribe( (e : KeyboardEvent)=>{
				subject.next(e.target.value);
			})
		}
		bind('keyup',text_input_element, rx_txt_sub);
		bind('change',size_input_element, rx_size_sub);
		bind('change',color_input_element, rx_color_sub);

	}



}


export default Rxjs_LigPractice;