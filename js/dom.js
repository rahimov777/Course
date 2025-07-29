import { Delete, edit, get, search, selectByCourse, add } from "./api.js";

let box = document.querySelector('.box')

let dialogForDel = document.querySelector('.dialogForDel')
let btnYes = document.querySelector('.btnYes')
let btnNo = document.querySelector('.btnNo')

let dialogForEdit = document.querySelector('.dialogForEdit')
let formEdit = document.querySelector('.formEdit')
let CancelbtnEdit = document.querySelector('.CancelbtnEdit')
let idx = null

let dialogForAdd = document.querySelector('.dialogForAdd')
let formAdd = document.querySelector('.formAdd')
let btnAdd = document.querySelector('.btnAdd')
let CancelbtnAdd = document.querySelector('.CancelbtnAdd')

let inForSearch = document.querySelector('.inForSearch')
let selectCourse = document.querySelector('.selectCourse')

let dialogForInfo = document.querySelector('.dialogForInfo')
let btnCloseInfo = document.querySelector('.btnCloseInfo')
let infoCourse = document.querySelector('.infoCourse')
let infoDate = document.querySelector('.infoDate')
let infoTeacher = document.querySelector('.infoTeacher')
let infoTime = document.querySelector('.infoTime')

function getData(data) {
    box.innerHTML = ""
    data.forEach(el => {
        let div = document.createElement('div')
        div.classList.add('div')

        let divForFlexNameAndImg = document.createElement('div')
        divForFlexNameAndImg.classList.add('divForFlexNameAndImg')

        let divForName = document.createElement('div')
        let divForNameDown = document.createElement('div')
        divForNameDown.classList.add('divForNameDown')

        let divForImg = document.createElement('div')
        let divForCourse = document.createElement('div')
        divForCourse.classList.add('divForCourse')

        let divForIkonCopy = document.createElement('div')
        divForIkonCopy.classList.add('divForIkonCopy')
        let divForNameAndDate = document.createElement('div')
        let divForCourseAndIkon = document.createElement('div')
        divForCourseAndIkon.classList.add('divForCourseAndIkon')

        let divForStatus = document.createElement('div')
        divForStatus.style.display = "flex"
        divForStatus.style.justifyContent = "space-between"
        divForStatus.style.marginTop = "25px"
        let divForActive = document.createElement('div')
        divForActive.style.display = "flex"
        let actions = document.createElement('div')
        actions.style.display = "flex"
        actions.style.gap = "20px"

        let name = document.createElement('h3')
        name.innerHTML = el.name

        let phoneNumber = document.createElement('p')
        phoneNumber.innerHTML = el.phone

        let hr = document.createElement('hr')
        let hr2 = document.createElement('hr')

        let age = document.createElement('p')
        age.innerHTML = el.age + "year"

        let gender = document.createElement('p')
        gender.innerHTML = el.gender

        let img = document.createElement('img')
        img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s'

        let course = document.createElement('h4')
        course.innerHTML = el.course

        let iconCopy = document.createElement('i')
        iconCopy.innerHTML = `<i class="fa-solid fa-clipboard-list"></i>`
        iconCopy.onclick = () => {
            dialogForInfo.showModal()
            infoCourse.innerHTML = el.course
            infoDate.innerHTML = el.courseDate
            infoTeacher.innerHTML = el.name
            infoTime.innerHTML = el.courseDate
        }

        let iconCourse = document.createElement('i')
        iconCourse.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`
        iconCourse.style.color = 'rgb(100, 10, 200)'

        let date = document.createElement('small')
        date.style.color = "gray"
        date.innerHTML = el.courseDate

        let status = document.createElement('p')
        status.innerHTML = el.status ? "Active" : "Inactive"
        status.style.color = el.status ? "green" : "red"

        let Status = document.createElement('p')
        Status.innerHTML = 'Status:'

        let btnEdit = document.createElement('button')
        btnEdit.innerHTML = `<i class="fa-solid fa-pen"></i>`
        btnEdit.classList.add('btnEdit')

        btnEdit.onclick = () => {
            dialogForEdit.showModal()

            idx = el.id

            formEdit.name.value = el.name
            formEdit.phone.value = el.phone
            formEdit.age.value = el.age
            formEdit.gender.value = el.gender
            formEdit.course.value = el.course
            formEdit.courseDate.value = el.courseDate
            formEdit.status.value = el.status
        }

        CancelbtnEdit.onclick = () => {
            dialogForEdit.close()
        }
        btnCloseInfo.onclick = () => {
            dialogForInfo.close()
        }


        let btnDel = document.createElement('button')
        btnDel.innerHTML = `<i class="fa-solid fa-trash" style="color: #ff0000;"></i>`
        btnDel.classList.add('btnDel')


        btnDel.onclick = () => {
            dialogForDel.showModal()
            btnYes.onclick = () => {
                Delete(el.id)
            }
            btnNo.onclick = () => {
                dialogForDel.close()
            }
        }

        divForStatus.append(divForActive, actions)
        divForActive.append(Status, status)
        actions.append(btnEdit, btnDel)
        divForCourseAndIkon.append(course, iconCourse)
        divForIkonCopy.append(iconCopy)
        divForNameAndDate.append(divForCourseAndIkon, date)
        divForNameDown.append(phoneNumber, hr, age, hr2, gender)
        divForName.append(name, divForNameDown)
        divForImg.append(img)
        divForFlexNameAndImg.append(divForName, divForImg)
        divForCourse.append(divForNameAndDate, divForIkonCopy)
        div.append(divForFlexNameAndImg, divForCourse, divForStatus)
        box.append(div)
    });
}

export { getData }

formEdit.onsubmit = async (e) => {
    e.preventDefault()

    let newUser = {
        name: formEdit.name.value,
        phone: formEdit.phone.value,
        age: formEdit.age.value,
        gender: formEdit.gender.value,
        course: formEdit.course.value,
        courseDate: formEdit.courseDate.value,
        status: formEdit.status.value === "true" ? true : false
    }
    edit(idx, newUser)
    dialogForEdit.close()
}

inForSearch.oninput = async () => {
    let res = await search(inForSearch.value)
    getData(res)
}

selectCourse.onchange = async () => {
    let res = await selectByCourse(selectCourse.value)
    getData(res)
}

btnAdd.onclick = () => {
    dialogForAdd.showModal()
}

CancelbtnAdd.onclick = () => {
    dialogForAdd.close()
}

formAdd.onsubmit = async (e) => {
    e.preventDefault()

    let newUser = {
        name: formAdd.name.value,
        phone: formAdd.phone.value,
        age: formAdd.age.value,
        gender: formAdd.gender.value,
        course: formAdd.course.value,
        courseDate: formAdd.courseDate.value,
        status: formAdd.status.value === "true" ? true : false
    }

    add(newUser)
    dialogForAdd.close()
    formAdd.reset()
}
