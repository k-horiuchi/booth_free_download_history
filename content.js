(() => {
    document.querySelectorAll("#variations > li > div > div > div > div > a").forEach(item => item.style.display = "none")
    chrome.webRequest.onHeadersReceived.addListener((detail) => {
        const headers = detail.responseHeaders.filter(e => e.name !== "Content-Security-Policy")
        return {responseHeaders: headers}
    }, {urls: ["<all_urls>"]}, ["blocking", "responseHeaders"])
})()
const title = document.querySelector("h2").innerText
const author = document.querySelector(".u-text-ellipsis").innerText
window.addEventListener("load", () => {
    if("無料ダウンロード" == document.querySelector("#variations > li > div > div > div > div > a > div > span").innerText) {
        document.querySelectorAll("#variations > li > div > div > div > div > a").forEach(item => {
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
            item.style.display ="block"
        })
    }
})