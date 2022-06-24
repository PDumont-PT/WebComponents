const template = document.createElement('template');
template.innerHTML = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
    *{
        font-family: 'Varela Round', sans-serif;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    [contenteditable]{
        outline: 0px solid transparent;
    }
    #date-picker-wrapper{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        margin: auto;
    }

    #title{
        font-size: 14px;
        padding: 2px;
        color: rgb(23, 161, 255);
        align-self: flex-start;
        font-weight: bold;
    }

    #calendar-wrapper{
        display: none;
        flex-direction: row;
        justify-content: center;
        width: fit-content;
    }
    #calendar-container{
        position: absolute;
        width: fit-content;
    }

    #calendar-header{
        display: flex;
        flex-direction: row;
        padding: 4px;
        justify-items: center;
    }

    #previous-month-icon{
        cursor: pointer;
    }

    #next-month-icon{
        cursor: pointer;
    }

    #expand-years-icon{
        cursor: pointer;
    }

    #month-text{
        color: #777777;
        font-size: 16px;
    }

    #calendar-body{
        width: fit-content;
    }
    #week-days{
        display: flex;
        flex-direction: row; 
        justify-content: space-evenly;
        align-items: center;
        user-select: none;
    }
    #week-days div{
        text-align: center;
        flex: 1;
    }
    #grid{
        display: grid;
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 40px);
        background-color: #fafafa;
        cursor: pointer;
    }
    .grid-item{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4px 0px 4px 4px;
    }

    .grid-item.start{
        border: 1px dashed rgb(23, 161, 255);
        border-right: none;
        border-radius: 100px 0px 0px 100px;
        margin: 8px 0px 8px 8px;
    }

    .grid-item.between{
        border: 1px dashed rgb(23, 161, 255);
        border-right: none;
        border-left: none;
        margin: 8px 0px 8px 0px;
    }

    .grid-item.end{
        background: rgba(23, 161, 255, 0.2);
        border: 1px dashed rgb(23, 161, 255);
        border-left: none;
        border-radius: 0px 100px 100px 0px;
        margin: 8px 8px 8px 0px;
    }

    .grid-item.today{
        color: rgba(0,96,168,1);
    }
    .grid-item:hover{
        border-radius: 1000px;
        background-color: rgba(0, 96, 168, 0.4);
    }

    #test-div{
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border: 1px solid #777777;
        font-family: 'Varela Round', sans-serif;
        font-size: 12px;
        font-weight: 400;
        width: 150px;
        border-radius: 4px;
    }

    #test-div:hover{
        box-shadow: 0px 0px 2px 1px rgb(23,161,255);
    }

    #test-div:focus-within{
        border: 1px solid rgb(23, 161, 255);
        box-shadow: 0px 0px 2px 1px rgb(23,161,255);
    }

    .text-section-wrapper{
        width: fit-content;
        position: relative;
    }

    .text-section-wrapper:last-of-type{
        flex: 1;
    }

    .text-section-wrapper .text{
        position: absolute;
        min-width: 100%;
        height: 100%;
        left: 0;
        z-index: 10;
        border: none !important;
    }

    .text-section-wrapper .guide{
        width: fit-content;
        z-index: -1;
        border: none;
        color: #777777;
        pointer-events: none;
    }

    .format-strict{
        color: #777777;
        font-size: 20px;
    }

    #calendar-icon{
        cursor: pointer;
    }
</style>
<div id="date-picker-wrapper">
    <div id="title"></div>
    <div id="test-div">
        <div class="text-section-wrapper">
            <span class="text" contenteditable="true"></span>
            <span class="guide">DD</span>
        </div>
        <div class="format-strict">/</div>
        <div class="text-section-wrapper">
            <span class="text" contenteditable="true"></span>
            <span class="guide">MM</span>
        </div>
        <div class="format-strict">/</div>
        <div class="text-section-wrapper">
            <span class="text" contenteditable="true"></span>
            <span class="guide">YYYY</span>
        </div>
        <svg id="calendar-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 11.771Q9.688 11.771 9.458 11.531Q9.229 11.292 9.229 11Q9.229 10.688 9.458 10.448Q9.688 10.208 10 10.208Q10.312 10.208 10.542 10.448Q10.771 10.688 10.771 11Q10.771 11.292 10.542 11.531Q10.312 11.771 10 11.771ZM6.667 11.771Q6.354 11.771 6.125 11.531Q5.896 11.292 5.896 11Q5.896 10.688 6.125 10.448Q6.354 10.208 6.667 10.208Q6.979 10.208 7.208 10.448Q7.438 10.688 7.438 11Q7.438 11.292 7.208 11.531Q6.979 11.771 6.667 11.771ZM13.333 11.771Q13.021 11.771 12.792 11.531Q12.562 11.292 12.562 11Q12.562 10.688 12.792 10.448Q13.021 10.208 13.333 10.208Q13.646 10.208 13.875 10.448Q14.104 10.688 14.104 11Q14.104 11.292 13.875 11.531Q13.646 11.771 13.333 11.771ZM10 15.042Q9.688 15.042 9.458 14.802Q9.229 14.562 9.229 14.271Q9.229 13.958 9.458 13.719Q9.688 13.479 10 13.479Q10.312 13.479 10.542 13.719Q10.771 13.958 10.771 14.271Q10.771 14.562 10.542 14.802Q10.312 15.042 10 15.042ZM6.667 15.042Q6.354 15.042 6.125 14.802Q5.896 14.562 5.896 14.271Q5.896 13.958 6.125 13.719Q6.354 13.479 6.667 13.479Q6.979 13.479 7.208 13.719Q7.438 13.958 7.438 14.271Q7.438 14.562 7.208 14.802Q6.979 15.042 6.667 15.042ZM13.333 15.042Q13.021 15.042 12.792 14.802Q12.562 14.562 12.562 14.271Q12.562 13.958 12.792 13.719Q13.021 13.479 13.333 13.479Q13.646 13.479 13.875 13.719Q14.104 13.958 14.104 14.271Q14.104 14.562 13.875 14.802Q13.646 15.042 13.333 15.042ZM4.5 17.917Q3.833 17.917 3.375 17.458Q2.917 17 2.917 16.333V5.417Q2.917 4.75 3.375 4.292Q3.833 3.833 4.5 3.833H5.5V1.979H6.854V3.833H13.167V1.979H14.5V3.833H15.5Q16.167 3.833 16.625 4.292Q17.083 4.75 17.083 5.417V16.333Q17.083 17 16.625 17.458Q16.167 17.917 15.5 17.917ZM4.5 16.583H15.5Q15.583 16.583 15.667 16.5Q15.75 16.417 15.75 16.333V8.625H4.25V16.333Q4.25 16.417 4.333 16.5Q4.417 16.583 4.5 16.583ZM4.25 7.292H15.75V5.417Q15.75 5.333 15.667 5.25Q15.583 5.167 15.5 5.167H4.5Q4.417 5.167 4.333 5.25Q4.25 5.333 4.25 5.417ZM4.25 7.292V5.417Q4.25 5.312 4.25 5.24Q4.25 5.167 4.25 5.167Q4.25 5.167 4.25 5.24Q4.25 5.312 4.25 5.417V7.292Z"/></svg>
    </div>
    <div id="calendar-wrapper">
        <div id="calendar-container">
            <div id="calendar-header">
                <svg id="previous-month-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12 15 7 10 12 5 13.062 6.062 9.125 10 13.062 13.938Z"/></svg>
                <div id="month-text">Month</div>
                <svg id="next-month-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8 15 6.938 13.938 10.875 10 6.938 6.062 8 5 13 10Z"/></svg>
                <div id="year-text">Year</div>
                <svg id="expand-years-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 13.062 5 8.062 6.062 7 10 10.938 13.938 7 15 8.062Z"/></svg>
            </div>
            <div id="calendar-body">
                <div id="week-days">
                    <div>Su</div>
                    <div>M</div>
                    <div>Tu</div>
                    <div>W</div>
                    <div>Th</div>
                    <div>F</div>
                    <div>Sa</div>
                </div>
                <div id="grid">
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item start"></div>
                    <div class="grid-item between"></div>
                    <div class="grid-item end"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                    <div class="grid-item"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`

class WCDatePicker extends HTMLElement{
    year = undefined;
    month = undefined;
    date = undefined;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        if(this.getAttribute('title') === null){
            this.shadowRoot.getElementById('title').innerHTML = 'Date';
        }else{
            this.shadowRoot.getElementById('title').innerHTML = this.getAttribute('title');
        }
        
    }

    connectedCallback(){
        this.initCalendar();
        const SETFLAG = false;
        const safeTypeDate = this.shadowRoot.querySelector('#test-div');

        const sections = {
            date: {SETFLAG: false, htmlTextElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(1) .text'), htmlGuideElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(1) .guide')},
            month: {SETFLAG: false, htmlTextElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(3) .text'), htmlGuideElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(3) .guide')},
            year: {SETFLAG: false, htmlTextElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(5) .text'), htmlGuideElement: safeTypeDate.querySelector('.text-section-wrapper:nth-of-type(5) .guide')}
        }

        console.log(sections);
        let timer;
        const calendarIcon = this.shadowRoot.getElementById('calendar-icon');
        const format = `DD/MM/YYYY`;
        const sectionsFormat = format.split('/');
        const calendarWrapper = this.shadowRoot.querySelector('#calendar-wrapper');
        const textSectionsElements = safeTypeDate.querySelectorAll('.text');
        const guideSectionsElements = safeTypeDate.querySelectorAll('.guide');

        safeTypeDate.addEventListener('mousedown', (event)=>{
            console.log('mouse down');
            // event.preventDefault();
        });

        textSectionsElements.forEach((section, index) =>{
            section.addEventListener('click', (e)=>{
                console.log(`click on element ${index}`);
                if(section.innerHTML.length != 0){
                    selectAllText(section); 
                }
            });
        });

        textSectionsElements.forEach((section, index) =>{
            section.addEventListener('focus', (e)=>{
                console.log('in new section');
                // SWITCHFLAG is true if we've switched to another section
                let SWITCHFLAG = false;
                // Clearing the timeout that is set to clear all the text. Saves from clearing all when you only switch from one section to another
                if(timer != undefined)clearTimeout(timer);
                // Making sure section of higher priority are filled before focusing on lower priority ones. Always checking section 2 (YYYY) first.
                for(let i = 2; i > index ; i--){
                    if(textSectionsElements[i].innerHTML.length != guideSectionsElements[i].innerHTML.length){
                        textSectionsElements[i].focus();
                        SWITCHFLAG = true;
                        break;
                    }
                }
                // If we're staying on this section, highlight the text, if any.
                if(!SWITCHFLAG && section.innerHTML.length != 0){
                    selectAllText(section); 
                }
            });
        });

        textSectionsElements.forEach((section, index) =>{
            section.addEventListener('blur', (e)=>{
                timer = setTimeout(()=>{
                    if(textSectionsElements[0].innerHTML.length != guideSectionsElements[0].innerHTML.length || textSectionsElements[1].innerHTML.length != guideSectionsElements[1].innerHTML.length || textSectionsElements[2].innerHTML.length != guideSectionsElements[2].innerHTML.length){
                        clearAllSections();
                    }
                }, 1);
                if(section.innerHTML.length != guideSectionsElements[index].innerHTML.length){
                    section.innerHTML = '';
                    updateGuide(index);
                }
            });
        });

        calendarIcon.addEventListener('click', (event)=>{
            // event.stopPropagation();
            focusInputBox();
        })

        safeTypeDate.addEventListener('focusout', (event)=>{
            // console.log('focus out', event);
            calendarWrapper.style.display = 'none';
        });

        safeTypeDate.addEventListener('focusin', (event)=>{
            // console.log('focus in', event);
            calendarWrapper.style.display = 'flex';
        });
        
        textSectionsElements.forEach((section, index) =>{
            section.addEventListener('input', (event)=>{
                console.log('input', event);
                updateGuide(index);
                if(section.innerHTML.length == sectionsFormat[index].length){
                    if(index == 0){
                        if(this.isDateValid(Number(section.innerHTML))){
                            this.date = Number(section.innerHTML);
                        }else{
                            section.innerHTML = '';
                            updateGuide(index);
                        };
                    }else if(index == 1){
                        if(this.isMonthValid(Number(section.innerHTML))){
                            this.month = Number(section.innerHTML) - 1;
                            goToNextSection(this.shadowRoot);
                        }else{
                            section.innerHTML = '';
                            updateGuide(index);
                        };
                    }else if(index == 2){
                        if(this.isYearValid(Number(section.innerHTML))){
                            this.year = Number(section.innerHTML);
                            goToNextSection(this.shadowRoot);
                        }else{
                            section.innerHTML = '';
                            updateGuide(index);
                        };
                    }
                }
            });
        });

        textSectionsElements.forEach((section, index) =>{
            section.addEventListener('keydown', (event)=>{
                console.log('key down', event);
                if(event.code == 'Enter' || event.code == 'ArrowRight' || event.code == 'ArrowLeft' || event.code == 'Backspace' || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
                    if(event.code == 'Enter'){
                        event.preventDefault();
                        section.blur();
                    }else if(event.code == 'ArrowRight'){
                        event.preventDefault();
                        if(index != 2){
                            goToPreviousSection(this.shadowRoot);
                        }
                    }else if(event.code == 'ArrowLeft'){
                        event.preventDefault();
                        if(index != 0){
                            
                            goToNextSection(this.shadowRoot);
                        }
                    }else if(section.innerHTML.length == 0){
                        
                    }else if(section.innerHTML.length == sectionsFormat[index].length){
                        
                    }else{
                        
                    }
                }else{
                    event.preventDefault();
                }
            });
        });

        function isNumber(number){
            const rule = /[0-9]/;
            return (rule.test(number));
        }

        function clearAllSections(){
            textSectionsElements.forEach((section, index) =>{
                section.innerHTML = '';
                updateGuide(index);
            });
        }

        function updateGuide(index){
            guideSectionsElements[index].innerHTML = textSectionsElements[index].innerHTML + sectionsFormat[index].slice(textSectionsElements[index].innerHTML.length);
        }

        function goToNextSection(shadow){
            let elementIndex;
            textSectionsElements.forEach((section, index) =>{
                if(shadow.activeElement === section){
                    elementIndex = index;
                }
            });
            textSectionsElements[elementIndex - 1].focus();
        }

        function goToPreviousSection(shadow){
            let elementIndex;
            textSectionsElements.forEach((section, index) =>{
                if(shadow.activeElement === section){
                    elementIndex = index;
                }
            });
            textSectionsElements[elementIndex + 1].focus();
        }

        function setCaretToEnd(element) {
            window.setTimeout(()=>{
                if(element.childNodes[0] != undefined){
                    let range = document.createRange();
                    let sel = window.getSelection();
                    
                    range.setStart(element.childNodes[0], element.innerHTML.length);
                    range.collapse(true)
                    
                    sel.removeAllRanges()
                    sel.addRange(range)
                }
            }, 1);  
        }

        function selectAllText(section){
            window.setTimeout(()=>{
                let range = document.createRange();
                range.selectNodeContents(section);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }, 1);
            
        }

        function focusInputBox(){
            textSectionsElements[textSectionsElements.length - 1].focus();
        }

        
    }

    isDateValid(value){
        const maxValue = new Date(this.year, (this.month + 1), 0).getDate();
        if(value > 0 && value <= maxValue){
            return true;
        }else{
            return false;
        }
    }

    isMonthValid(value){
        if(value > 0 && value <= 12){
            return true;
        }else{
            return false;
        }
    }

    isYearValid(value){
        if(value >= 0){
            return true;
        }else{
            return false;
        }
    }

    initCalendar(){
        const now = new Date();
        const dayToday = now.getDate();
        const dayOneDate = new Date(now.setDate(1));
        const dayOne = dayOneDate.getDay();
        const currentMonth = dayOneDate.getMonth();
        const nextMonth = currentMonth < 11?currentMonth + 1:0;
        const daysInCurrentMonth = new Date(new Date(dayOneDate.setMonth(nextMonth)).setDate(0)).getDate();
        for(let i = 1, childrens=this.shadowRoot.querySelector('#grid').children, dayOneMinusOne = dayOne-1; i<=daysInCurrentMonth ; i++){
            childrens[dayOneMinusOne + i].innerHTML = `${i}`;
            if(i == dayToday){
                childrens[dayOneMinusOne + i].classList.add('today');
            }
        }
    }
}

window.customElements.define('date-picker', WCDatePicker);