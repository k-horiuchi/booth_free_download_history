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
            const showBox = `<div class="u-mb-300 u-tpg-footnote u-text-gray-500">シェアすると、クリエイターの創作活動の大きな支援になります。<iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="twitter-share-button twitter-share-button-rendered twitter-tweet-button" style="position: static; visibility: visible; width: 89px; height: 20px;" title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.21f942bb866c2823339b839747a0c50c.ja.html#dnt=false&amp;hashtags=booth_pm&amp;id=twitter-widget-0&amp;lang=ja&amp;original_referer=${location.href}&amp;size=m&amp;text=「${title}」 を ${author} でダウンロードしました！&amp;time=${new Date().getTime()}&amp;type=share&amp;url=${location.href}" data-url="${location.href}"></iframe></div>`
            item.insertAdjacentHTML("afterend",showBox)
        })
        window.location.href = link
    })
}

