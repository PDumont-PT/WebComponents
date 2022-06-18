let template1 = document.createElement('template');
template1.innerHTML = `
<style>
    .tr{
        display: table-row;
        position: relative;
        text-align: center;
        height: 40px;
        align-content: center;
        background-color: rgba(0, 96, 168, 0.3);
    }
    .container>div{
        text-align: center;
        flex: 1 0 auto;
    }
    .dummy-div{
        height: 50px;
        background-color: lightblue;
    }

    .round{
        height: 15px;
        width: 15px;
        position: absolute;
        border-radius: 100%;
        background-color: red;
        left: 10%;
        right: auto;
        transition: transform 75ms;
        transition: right 2s;
    }

    .track{
        height: 15px;
        width: 15px;
        position: absolute;
        background-color: rgba(0,0,0,0);
        border: 2px solid black;
        left: 10%;
        margin-left: -4px;
        padding: 2px;
        border-radius: 100%;
    }
</style>

<form class="tr" draggable="true">
    <div class="round"></div>
    <div class="track"></div>
    <div class="id-cell">name</div>
    <div class="occupant-cell">occupant</div>
    <div class="status-cell">
        <label class="switch">
            <input type="checkbox">
        </label>
    </div>
</form>
<div class="dummy-div"></div>
`


class ManageRoomRow extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template1.content.cloneNode(true));
        let ball = this.shadowRoot.querySelector('.round');
        let ballTrack = this.shadowRoot.querySelector('.track');
        console.log(ballTrack);
        this.shadowRoot.querySelector('.container').addEventListener('click', (ev)=>{
            console.log('container clicked');
        });
        this.addEventListener('click', (ev)=>{
            console.log('clicked on the element');
        });
        this.addEventListener('dragstart', (ev)=>{
            ev.dataTransfer.dropEffect = "move";
            console.log('dragging the element');
        });
        this.addEventListener('drag', (ev)=>{
            console.log('dragging the element');
        });
        this.shadowRoot.querySelector('.container').addEventListener('dragstart', (ev)=>{
            console.log('dragging the element');
        });

        let interval = undefined;

        ballTrack.addEventListener('mouseover', (ev)=>{
            let state = true;
            interval = setInterval(()=>{
                if(state){
                    let angle = 2*Math.PI*Math.random();
                    let transX = 4*Math.cos(angle);
                    let transY = 4*Math.sin(angle);
                    // console.log(`set values are: ${transX}x and ${transY}y`);
                    ball.style.transform = `translate(${transX}px, ${transY}px)`
                }else{
                    ball.style.transform = 'translate(0px, 0px)'
                }
                
                state = !state;
            }, 75);
        });

        ballTrack.addEventListener('click', ()=>{
            clearInterval(interval);
            ball.style.transform = 'translate(0px, 0px)';
            setTimeout(()=>{
                ball.style.right = '0';
                ball.style.left = 'auto';
            }, 75);
        });

    }

    
}

window.customElements.define('manage-room-row', ManageRoomRow);




