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
const footer = document.querySelector('#footer');
const submitBtn = document.querySelector('#btn-submit');



function defaultView () {                        //giving a blank slate to work with - so we can manipulate
    let defaultBody = document.body;
    defaultBody.innerHTML = '';
    defaultBody.appendChild(footer);
}

function playMusic() {
    document.body.appendChild(audio);
} 

function logoEntry() {                            //this function is for slowly making the #logo div background appear and then textContent 
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

function aboutEntry() {                           //function to add in the #about to the body
    let defaultBody = document.body;
    defaultBody.appendChild(about);
    document.body.appendChild(audio);
}

function userOptionLogic () {                                                                  //when user selects "YES" or "NO", then the about will slowly fade away and then the 
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
                 goodLuck.addEventListener('animationend', function (){
                    goodLuck.style.animationName = '';
                }, {once: true});
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
                formContainer.addEventListener('animationend', function (){      //same thing as above
                    formContainer.style.animationName = '';
                }, {once: true});
                defaultBody.appendChild(formContainer);
                about.style.display = 'none';
            }, {once: true});
        }
    }));
}

function formSubmission() {
    submitBtn.addEventListener('click', function(event){
        event.preventDefault();
        const passBool = passwordChecker();
        let defaultBody = document.body;
        let successDiv = document.createElement('div');
        successDiv.setAttribute('id','success-div');
        let elem = document.createElement('img');                               //created a div and appended img to the div
        elem.setAttribute('src', './assets/stargradL1.jpg');
        elem.setAttribute('height','200');
        elem.setAttribute('width', '200');
        elem.setAttribute('alt', 'marvelBadge');
        successDiv.textContent = "Congratulations Comrade! Welcome aboard report to the S.T.A.R HQ and meet Nick Fury. Here is your L1 badge!";
        successDiv.appendChild(elem);
        if (passBool) {                                               //added the animation if form elements are correct, user gets the success message
            formContainer.style.animationName = 'fadeAway';
            formContainer.style.animationTimingFunction = 'ease';
            formContainer.style.animationDelay = '0.5s';
            formContainer.style.animationDuration = '0.5s';
            formContainer.addEventListener('animationend', function(){
                successDiv.style.animationName = 'fadeIn';
                successDiv.style.animationTimingFunction = 'ease';
                successDiv.style.animationDelay = '0s';
                successDiv.style.animationDuration = '2s';
                successDiv.addEventListener('animationend', function (){      
                    successDiv.style.animationName = '';
                }, {once: true});
            formContainer.style.display = 'none';                     //remove the container from the DOM
            defaultBody.appendChild(successDiv);                      //append successDiv to the defaultBody
            }, {once: true});
        }
        else {
            /* window.alert("Please Try again!"); */
            let errorMsg = document.createElement('div');
            errorMsg.setAttribute('id','error-msg');
            errorMsg.textContent = "Please retry! Passwords don't match";
            errorMsg.style.position = 'absolute';
            errorMsg.style.zIndex = '999';
            errorMsg.style.top = '50%';
            errorMsg.style.left = '50%'; 
            errorMsg.style.transform = 'translate(-50%, -50%)';
            defaultBody.appendChild(errorMsg);
            setInterval(function(){
                defaultBody.removeChild(errorMsg)
            }, 3000);
        }
    })
}



function passwordChecker() {                           //checks if the passwords match
    const pass = document.querySelector('#pass');
    const repass = document.querySelector('#pass_try');
    if (pass.value !== repass.value) {
        return false;
    }
    else return true;
    
}


window.onload = function() {
    defaultView();
    playMusic();
    logoEntry();
    aboutEntry();
    userOptionLogic();
    formSubmission();
}


