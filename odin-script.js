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


function defaultView () {                        //giving a blank slate to work with - so we can manipulate
    let defaultBody = document.body;
    defaultBody.innerHTML = '';
}

function logoEntry() {
    
}


