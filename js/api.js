import { getData } from "./dom.js";

let API = 'https://688b06d32a52cabb9f4fb7e2.mockapi.io/users'

async function get() {
    let { data } = await axios.get(API)
    getData(data)
}

async function Delete(id) {
    await axios.delete(`${API}/${id}`)
    get()
}

async function add(newUser) {
    await axios.post(API, newUser)
    get()
}

async function edit(id, newUser) {
    await axios.put(`${API}/${id}`, newUser)
    get()
}

async function search(value) {
    let { data } = await axios.get(API)

    let filter = data.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()))

    return filter
}

async function selectByCourse(course) {
    let { data } = await axios.get(API)

    if (course == "All") {
        return data
    }
    let filter = data.filter((el) => el.course == course)
    
    return filter
}

export { get, Delete, edit, search, selectByCourse, add}