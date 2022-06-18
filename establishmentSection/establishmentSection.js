let template = document.createElement('template');
template.innerHTML = `
    <style>
        .establishmentSection {
            display: flex;
            flex-direction: column;
            padding: 5px;
        }

        .section-header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: rgba(0, 96, 168, 0.6);
            color: white;
            font-size: 20px;
            padding: 8px;
        }

        .section-info{
            display: flex;
            flex-direction: row;
        }

        .section-name{
            
        }

        .section-occupancy-ratio {
            margin-left: 5px;
        }

        .section-rooms-container{
            display: table;
            position: relative;
            border-radius: 10px;
            width: 100%;
            border-collapse: collapse;
        }


        .add-room-view{
            position: absolute;
            display: none;
            z-index: 1000;
            height: 100%;
            width: 100%;
            background-color: rgba(255,255,255,0.6);
            align-items: center;
            justify-content: center;
            pointer-events: none;
            top: 0px;
            left: 0px;
        }

        .tr{
            position: relative;
            display: table-row;
            text-align: center;
            height: 40px;
            align-content: center;
        }

        .td{
            position: relative;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            height: inherit;
        }

    </style>
    <div class="establishmentSection">
        <div class="section-header">
            <div class="section-info">
                <div class="section-name">Section name</div>
                <div class="section-occupancy-ratio">2/3</div>
            </div>
            <div class="section-edit-icon">Edit Icon</div>
        </div>
        <div class="section-rooms-container">
            <form class="tr">
                <span class="td">Room ID</span>
                <span class="td">Room Occupant</span>
                <span class="td"></span>
            </form>
        </div>
    </div>
`

class EstablishmentSection extends HTMLElement {
    constructor() {
        super();
        let dragEnterTarget = undefined;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const roomsContainer = this.shadowRoot.querySelector('.section-rooms-container');
        const addRoomView = this.shadowRoot.querySelector('.add-room-view');

        roomsContainer.addEventListener('dragover', (ev)=>{
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move";
            // console.log('dragged over');
        });

        roomsContainer.addEventListener('dragenter', (ev)=>{
            ev.preventDefault();
            if(dragEnterTarget === undefined){
                console.log('Just entered the boundary');
                addRoomView.style.display="flex";
            }
            dragEnterTarget = ev.target;
            console.log('drag enter', ev.target);
        });

        roomsContainer.addEventListener('dragleave', (ev)=>{
            ev.preventDefault();
            if(dragEnterTarget === ev.target){
                dragEnterTarget = undefined;
                console.log('just left the boundary');
                addRoomView.style.display="none";
            }
            console.log('drag leave', ev.target);
        });

        roomsContainer.addEventListener('drop', (ev)=>{
            ev.preventDefault();
            console.log('dropped');
            dragEnterTarget = undefined;
            addRoomView.style.display = "none";
            let element = document.getElementById(ev.dataTransfer.getData("text/plain"));
            ev.currentTarget.appendChild(element);
            ev.dataTransfer.clearData();
        });

        console.log(roomsContainer);
        
    }
}

window.customElements.define('establishment-section', EstablishmentSection);