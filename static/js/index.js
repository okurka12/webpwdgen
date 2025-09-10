const NUMBER_OF_BUTTONS = 8;

let repetitions = 1

function get_fmt_string() {
    return document.getElementById("fmt-string").value
}

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
    const el = document.createElement("li")
    el.innerHTML = `<code>${password}</code>`
    document.getElementById("password-list").appendChild(el)
}

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
})
