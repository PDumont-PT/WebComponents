const template = 2;

var mql = window.matchMedia("(min-width: 1280px)");
const mainGrid = document.querySelector('.wrapper');
const todayRoundsExpand = document.getElementById('today-rounds-expand');
const firstGridItem = document.querySelector('.wrapper > div:nth-child(1)');
const secondGridItem = document.querySelector('.wrapper > div:nth-child(2)');
const firstTitle = document.querySelector('body > div > div:nth-child(1) > div.section-header > p');

todayRoundsExpand.addEventListener('click', ()=>{
    firstGridItem.style.gridColumn = '1/3';
    secondGridItem.style.display = 'none';
});

mql.addEventListener('change', (ev)=>{
if (window.matchMedia("(min-width: 1280px)").matches) {
    console.log('we in desktop mode motherfuckers');
    } else {
    console.log('we in tablet mode motherfuckers');
    }
});

const loadingAnimation =  (HTMLElement, duration)=>{
    let period = 1200;
    if(!(duration === undefined)){
        if((!duration % period == 0)){
            duration = Math.ceil(duration/period)*period;
            setTimeout(()=>{
                HTMLElement.style.backgroundImage = 'null';
                HTMLElement.style.backgroundSize = 'null';
                HTMLElement.style.backgroundPosition = 'null';
                clearInterval(interval);
            }, duration);
        }
    }
    HTMLElement.style.backgroundImage = 'linear-gradient(to right, white, white 33%, rgb(175,175,175) 66%, white 66%, white)';
    HTMLElement.style.backgroundPosition = 'right';
    HTMLElement.style.backgroundSize = '300%';
    const interval = setInterval(()=>{
        HTMLElement.style.transition = 'background-position 800ms ease-in';
        HTMLElement.style.backgroundPosition = 'left';
    
        setTimeout(()=>{
            HTMLElement.style.transition = 'background-position 0ms';
            HTMLElement.style.backgroundPosition = 'right';
        }, (period-50));
    }, period);
    return interval;
}

let animationInterval = loadingAnimation(firstTitle, 10000);

