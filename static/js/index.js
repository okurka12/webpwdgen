const NUMBER_OF_BUTTONS = 8;
const clear_button_text = "🗑️ clear"

let repetitions = 1

function get_fmt_string() {
    return document.getElementById("fmt-string").value
}

/* depends on pwdgen.js */
function update_buttons() {

    const p = new Password()
    p.parse(get_fmt_string())
    const pwdlength = p.length

    for (let i = 1; i <= NUMBER_OF_BUTTONS; i++) {
        const el = document.getElementById(`rep-button-${i}`)
        if (i === repetitions) {
            el.innerHTML = `<b>${i * pwdlength}</b>`
        } else {
            el.innerHTML = String(i * pwdlength)
        }
    }
}

function repeat(n) {
    repetitions = n
    update_buttons()
}

function append_password_to_list(password) {
    const list_item_el = document.createElement("li")
    const password_el = document.createElement("code")
    const length_hint_el = document.createElement("span")
    const password_el_id = crypto.randomUUID()
    const copy_btn_el = document.createElement("button")

    password_el.innerText = password
    password_el.setAttribute("id", password_el_id)

    length_hint_el.innerText = `length: ${password.length}`

    copy_btn_el.setAttribute("class", "copy-button")
    copy_btn_el.setAttribute("textid", password_el_id)

    list_item_el.appendChild(password_el)
    list_item_el.appendChild(copy_btn_el)
    list_item_el.appendChild(length_hint_el)

    document.getElementById("password-list").appendChild(list_item_el)
    add_or_remove_clear_button()

    render_buttons() /* from copy-button.js */
}

function add_clear_button_if_not_already_there() {
    const container = document.getElementById("clear-button-container")
    if (container.childNodes.length < 1) {
        const btn = document.createElement("button")
        btn.setAttribute("onclick", "clear_passwords()")
        btn.innerText = clear_button_text
        container.appendChild(btn)
    }
}

function add_or_remove_clear_button() {
    const container = document.getElementById("clear-button-container")
    if (document.getElementById("password-list").childNodes.length == 0) {
        container.innerHTML = ""
    } else {
        add_clear_button_if_not_already_there()
    }
}

function clear_passwords() {
    document.getElementById("password-list").innerHTML = ""
    add_or_remove_clear_button()
}

/* depends on pwdgen.js */
function generate() {
    const p = new Password()
    for (let i = 0; i < repetitions; i++) {
        p.parse(get_fmt_string())
    }
    const password = p.password
    append_password_to_list(password)
}

document.addEventListener("DOMContentLoaded", () => {
    (
        document
        .getElementById("fmt-string")
        .addEventListener("input", update_buttons)
    )
    update_buttons()
})
