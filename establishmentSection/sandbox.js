const dragDiv1 = document.querySelector('#drag-div1');
const dragDiv2 = document.querySelector('#drag-div2');
const dragDiv3 = document.querySelector('#drag-div3');
const dragDivs = [dragDiv1, dragDiv2, dragDiv3];
const roomRow = document.querySelector('#s1-r1');
const testArea = document.querySelector('.testing-area');
const inner1 = document.querySelector('.inner1');
const inner2 = document.querySelector('.inner2');
const inner3 = document.querySelector('.inner3');
dropAreas = [testArea, inner1, inner2, inner3];

dragDivs.forEach((div)=>{
    div.addEventListener('dragstart', (ev)=>{
        ev.dataTransfer.setData("text/plain", ev.target.id);
        console.log(ev.target.id);
        ev.dataTransfer.dropEffect = "move";
    });
});

dragDivs.forEach((div)=>{
    div.addEventListener('dragenter', (ev)=>{
        ev.preventDefault();
    });
});

dragDivs.forEach((div)=>{
    div.addEventListener('dragleave', (ev)=>{
        ev.preventDefault();
    });
});

let message = '';
dropAreas.forEach(area =>{
    area.addEventListener('dragenter', (ev)=>{
        if(area == testArea){
            message = 'ENTER test area';
        }else if(area == inner1){
            message = 'ENTER inner one';
        }else if(area == inner2){
            message = 'ENTER inner two';
        }else if(area == inner3){
            message = 'ENTER inner three'
        }
        console.log(message, ev);
    });

    area.addEventListener('dragleave', (ev)=>{
        if(area == testArea){
            message = 'LEAVE test area';
        }else if(area == inner1){
            message = 'LEAVE inner one';
        }else if(area == inner2){
            message = 'LEAVE inner two';
        }else if(area == inner3){
            message = 'LEAVE inner three'
        }
        console.log(message, ev);
    });
});


