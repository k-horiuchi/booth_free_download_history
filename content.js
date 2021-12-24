const linkPath = "#variations > li > div > div > div > div > a"
const linkPathMusic = ".nav-reverse.free-download";

(() => {
    document.querySelectorAll(linkPath).forEach(item => item.style.display = "none")
    document.querySelectorAll(linkPathMusic).forEach(item => item.style.display = "none")
})()

const title = document.querySelector("h2").innerText
const author = document.querySelector(".u-text-ellipsis").innerText

window.addEventListener("load", () => {
    if(document.querySelector("#variations > li > div > div > div > div > a > div > span")) {
        document.querySelectorAll(linkPath).forEach(item => {
            if("無料ダウンロード" == item.firstElementChild.innerText) {
                buttonChange(item)
            }
        })
    }
    if(document.querySelector(linkPathMusic)) {
        document.querySelectorAll(linkPathMusic).forEach(item => buttonChange(item))
    }
    document.querySelectorAll(linkPath).forEach(item => item.style.display = "block")
    document.querySelectorAll(linkPathMusic).forEach(item => item.style.display = "block")
})

const buttonChange = (item) => {
    const link = item.href
    item.href = "javascript:void(0)"
    item.addEventListener("click", () => {
        chrome.storage.local.get("booth_history", result => {
            const date = new Date()
            date.setHours(date.getHours() + 9)
            const dateStr = date.toISOString().slice(0,19).replace("T", " ")
            result.booth_history = !result.booth_history ? {} : result.booth_history
            result.booth_history[location.href] = `[${dateStr}] ${title} / ${author}`
            chrome.storage.local.set({"booth_history": result.booth_history}, ()=>{})
        })
        window.location.href = link
    })
}