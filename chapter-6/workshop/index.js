
// create function that run when onclick 'ส่งข้อมูล
function submitData() {


    // Select DOM.
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') // pseudo selector. chose only the checked gender.
    let interestsDOMs = document.querySelectorAll('input[name=interest]:checked')

    let descriptionDOM = document.querySelector('textarea[name=description]')

    // prepare looping for interest input.
    let interest = ''

    // descoration about last data without ', ' continue.
    for (let i = 0; i < interestsDOMs.length; i++) {
        interest += interestsDOMs[i].value 
        if (i != interestsDOMs.length - 1) {
            interest += ', '
        }
    }


    // create Object to collect Data for sending backend team.!
    let userData = {
        firstname: firstNameDOM.value,
        lastname: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interests: interest
    }

    // To show in console. 
    console.log('submit data', userData) 
    
    // In the last change results to JSON file and send to ...
}







