function getTimeRemaining(endTime){
    const total = Date.parse(endTime) - Date.parse(new Date());

    const seconds = Math.floor((total/1000)%60);

    const minutes = Math.floor((total/1000/60)%60);

    return { total, minutes, seconds };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    const updateClock = () =>{
        const t = getTimeRemaining(endtime);
        
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if(t.total <= 0 || terminarResponder){
            clearInterval(timeInterval);
            showResults();
            submitButton.style.display = 'none';

            tryAgainButton.style.display = 'inline-block';
        }else{

            
            tryAgainButton.style.display = 'none';
        }
    }
    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
}
const tryAgainButton = document.getElementById("tryAgain");
const deadLine = new Date(Date.parse(new Date())+3*60*1000);
initializeClock( "clockdiv", deadLine );

function resetQuiz(){
    location.reload();
}    

tryAgainButton.addEventListener("click", resetQuiz);