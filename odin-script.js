//This script serves to manipulate the DOM of the odin form. The code is aiming
//to show the default screen on start up which just has the #about with YES or NO
//If the user clicks on no, they get the #good-luck
//if user clicks on yes, they get the form
//If user clicks submit in the #odin-form, they will get a prompt


//initially taking all the major structural components into our js constants. This will help us attach/modify/resize w/ CSS
const logo = document.querySelector('#logo');
const about = document.querySelector('#about-container');
const goodLuck = document.querySelector('#good-luck');
const formContainer = document.querySelector('#form-container');
const userOptionBtn = document.querySelectorAll('.about-btn');
const audio = document.querySelector('#page-audio');



function defaultView () {                        //giving a blank slate to work with - so we can manipulate
    let defaultBody = document.body;
    defaultBody.innerHTML = '';
}

function playMusic() {
    document.body.appendChild(audio);
}

function logoEntry() {                           //this function is for slowly making the #logo div background appear and then textContent 
    let defaultBody = document.body;
    const logoText = logo.innerText;
    logo.innerText = '';
    defaultBody.appendChild(logo);
    const logoTextArr = logoText.split('');
    let i = 0;

    let delay = setInterval(function() {          //will enter the screen as if it's being typed in
        if(i < logoTextArr.length) {
            logo.textContent += logoTextArr[i++];
            
        }
        else {
            clearInterval(delay);
        }
    }, 200)     
}

function aboutEntry() {                         //function to add in the #about to the body
    let defaultBody = document.body;
    defaultBody.appendChild(about);
}

function userOptionLogic () {                   //when user selects "YES" or "NO", then the about will slowly fade away and then the 
    Array.from(userOptionBtn).forEach(btn => btn.addEventListener('click', function () {       //appropriate container will be appended
        let defaultBody = document.body;
        if (btn.textContent === "NO") {
            about.style.animationName = 'fadeAway';
            about.style.animationTimingFunction = 'ease';
            about.style.animationDelay = '0.5s';
            about.style.animationDuration = '0.5s';
            about.addEventListener('animationend', function () {
                goodLuck.style.animationName = 'fadeIn';
                goodLuck.style.animationTimingFunction = 'ease';
                goodLuck.style.animationDelay = '0s';
                goodLuck.style.animationDuration = '2s';
                /* goodLuck.addEventListener('animationend', function (){
                    goodLuck.style.animationName = '';
                }, {once: true}) */
                defaultBody.appendChild(goodLuck); //attached the above animations and then finally append the element
                about.style.display = 'none';     //hides about container so that it is removed from DOM
            }, {once: true});
        }
        else {
            about.style.animationName = 'fadeAway';
            about.style.animationTimingFunction = 'ease';
            about.style.animationDelay = '0.5s';
            about.style.animationDuration = '0.5s';
            about.addEventListener('animationend', function () {
                formContainer.style.animationName = 'fadeIn';
                formContainer.style.animationTimingFunction = 'ease';
                formContainer.style.animationDelay = '0s';
                formContainer.style.animationDuration = '2s';
                /* formContainer.addEventListener('animationend', function (){      //same thing as above
                    formContainer.style.animationName = '';
                }, {once: true}) */
                defaultBody.appendChild(formContainer);
                about.style.display = 'none';
            }, {once: true});
        }
    }));
}


window.onload = function() {
    defaultView();
    /* playMusic(); */
    logoEntry();
    aboutEntry();
    userOptionLogic();
}


