window.addEventListener("load", () => {
    const title = document.querySelector("h2").innerText
    if("無料ダウンロード"==document.querySelector("#variations > li > div > div > div > div > a > div > span").innerText)
    {
        document.querySelectorAll("#variations > li > div > div > div > div > a").forEach(item => {
            item.addEventListener("click", () => {
                const downloadLink = item.href
                item.href = "javascript:void(0)"
                chrome.storage.local.get("booth_history", result => {
                    if (!result.booth_history)
                    {
                        result.booth_history = {}
                    }
                    result.booth_history[location.href] = title
                    chrome.storage.local.set({"booth_history": result.booth_history}, ()=>{})
                    const storage = encodeURI(JSON.stringify(result.booth_history)).replace(/%../g, "*").length/1000
                    if(storage > 4.5)
                    {
                        alert(`【Chrome拡張機能：booth無料ダウンロード履歴】\r\nストレージの使用量が上限に近いです。オプションから「履歴の保存」と「履歴の全削除」を行ってください。履歴の保存ができなくなります。`)
                    }
                })
                window.location.href = downloadLink
            })
        })
    }
})
