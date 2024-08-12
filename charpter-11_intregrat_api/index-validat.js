const validateData = (userData) => {
    let errors = []

    if (!userData.firstname) {
        errors.push('กรุณาใส่ชื่อจริง')
    }

    if (!userData.lastname) {
        errors.push('กรุณาใส่นามสกุล')
    }

    if (!userData.age) {
        errors.push('กรุณาใส่อายุ')
    }

    if (!userData.gender) {
        errors.push('กรุณาใส่เพศ')
    }

    if (!userData.interests) {
        errors.push('กรุณาใส่ความสนใจ')
    }

    if (!userData.description) {
        errors.push('กรุณาใส่รายละเอียดของคุณ')
    }

    return errors
}


// create function that run when onclick 'ส่งข้อมูล
const submitData = async () => {


    // Select DOM.
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') || {}// pseudo selector. chose only the checked gender.
    let interestsDOMs = document.querySelectorAll('input[name=interest]:checked') || {}

    let descriptionDOM = document.querySelector('textarea[name=description]')

    let messageDOM = document.getElementById('message')

    try {
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

        console.log('submit data', userData)

        const errors = validateData(userData)

        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรอกข้อมูลไม่ครบ',
                errors: errors
            }
        }
    
        const response = await axios.post('http://localhost:8000/users', userData)
        console.log('response', response.data)

        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย'
        messageDOM.className = 'message success'

    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)
        // if (error.response) {
        //     console.log(error.response.data.message)
        // }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>` // template literal
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
        
    }
    
    // In the last change results to JSON file and send to ...
}







