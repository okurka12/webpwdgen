/* password generator */

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const special_symbols = "!@#$%^&*?";
const vowels_lower = "aeiouy";
const vowels_upper = "AEIOUY";
const consonants_lower = "bcdfghjklmnpqrstvwxz";
const consonants_upper = "BCDFGHJKLMNPQRSTVWXZ";

const unallowed_characters = [
    "y", "z", "Y", "Z",  /* qwerty/qwertz keyboard */
    "l", "1", "I",       /* confuse 1/l/I */
    "q", "g",            /* similar when I write them on paper */
    "o", "O", "0"        /* confuse o/O/0 */
]


function pick_random_char(str) {
    if (!str || str.length === 0) return '';
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const index = array[0] % str.length;
    return str.charAt(index);
}


/* get number of repetitions */
/* for example, "2c" -> 2, "d" -> 1 */
function get_n(group) {
    const nstr = group.match(/\d+/);
    var n;
    if (nstr && nstr.length > 0) {
        n = parseInt(nstr);
    } else {
        n = 1;
    }
    return n;
}


/* get character type */
/* for example, "2c" -> "c", "3d" -> "d", "A" -> "A" */
function get_ctype(group) {
    const t = group.match(/[cdazsCDAZS]/)[0];
    return t;
}


/* match character type to character set */
function get_pool(ctype) {
    return {
        "c": lowercase,
        "C": uppercase,
        "d": digits,
        "D": digits,
        "a": vowels_lower,
        "A": vowels_upper,
        "z": consonants_lower,
        "Z": consonants_upper,
        "s": special_symbols,
        "S": special_symbols
    }[ctype]
}


class Password {

    constructor() {
        this.password = ""
    }

    parse(fmt) {
        const pattern = /(?:\d*[cdazsCDAZS])+/;
        if (!pattern.test(fmt)) {
            throw new Error(`invalid format string: ${fmt}`);
        }

        /* get list of groups */
        /* for example, "2c3dA" -> ["2c", "3d", "A"] */
        const groups = fmt.match(/\d*[cdazsCDAZS]/g) || [];

        for (const group of groups) {
            const n = get_n(group)
            const ctype = get_ctype(group)
            const pool = get_pool(ctype)

            this.add_n(pool, n)
        }
    }

    add_one(pool) {
        let done = false
        let c = ""
        while (!done) {
            c = pick_random_char(pool)
            if (!unallowed_characters.includes(c)) {
                done = true;
            }
        }
        this.password += c
    }

    add_n(pool, n) {
        for (let i = 0; i < n; i++) {
            this.add_one(pool)
        }
    }

    clear() {
        this.password = ""
    }

    get length() {
        return this.password.length
    }

}
