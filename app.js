const dayHTML = document.querySelector('.days');
const hourHTML = document.querySelector('.hours');
const minuteHTML = document.querySelector('.minutes');
const secondHTML = document.querySelector('.seconds');

let date = new Date();
let specificDate = new Date(date);
specificDate.setDate(specificDate.getDate()+ 14);

let timer = setInterval(countdown, 1000);

function countdown(){
    let currentDate = new Date().getTime();
    let gap = specificDate - currentDate;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;


    if(gap > 0){
        let days = `${Math.floor(gap / day)}`;
        if(days < 10) {days = "0" + days}

        let hours = `${Math.floor((gap % day) / hour)}`;
        if(hours < 10) {hours = "0" + hours}

        let minutes = `${Math.floor((gap % hour) / minute)}`;
        if(minutes < 10) {minutes = "0" + minutes}

        let seconds = `${Math.floor((gap % minute) / second)}`;
        if(seconds < 10) {seconds = "0" + seconds}    
     
        animateFlip(secondHTML, seconds);
        animateFlip(minuteHTML, minutes);
        animateFlip(hourHTML, hours);
        animateFlip(dayHTML, days);
    }
}

const animateFlip = ((element, value) => {
    const valueInDom = element.querySelector('.bottom-back').innerText;
    const currentValue = value < 10 ? '0' + value : '' + value;

    if (valueInDom === currentValue) return;

    element.querySelector('.top-back span').innerText = value;
    element.querySelector('.bottom-back span').innerText = value;

    gsap.to(element.querySelector('.top'), 0.7, {
        rotationX: '-180deg',
        transformPerspective: 300,
        ease: Quart.easeOut,
        onComplete: () => {
            element.querySelector('.top').innerText = value;
            element.querySelector('.bottom').innerText = value;
            gsap.set(element.querySelector('.top'), {rotationX: 0});
        }
    })

    gsap.to(element.querySelector('.top-back'), 0.7, {
        rotationX: 0,
        transformPerspective: 300,
        ease: Quart.easeOut,
        clearProps: 'all'
    });
})