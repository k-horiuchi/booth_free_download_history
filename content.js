// ボタンを一旦非表示にする
(() => {
    document.querySelectorAll("#variations > li > div > div > div > div > a").forEach(item => {
        item.style.display ="none"
    })
})()

window.addEventListener("load", () => {
    const title = document.querySelector("h2").innerText

    // 無料アイテムのみに処理を行う
    if("無料ダウンロード"==document.querySelector("#variations > li > div > div > div > div > a > div > span").innerText)
    {
        document.querySelectorAll("#variations > li > div > div > div > div > a").forEach(item => {
            item.addEventListener("click", () => {

                // リンクを差し替える
                const downloadLink = item.href
                item.href = "javascript:void(0)"

                // 履歴を追加する
                chrome.storage.local.get("booth_history", result => {
                    if (!result.booth_history)
                    {
                        result.booth_history = {}
                    }
                    // 時間情報の生成
                    const date = new Date()
                    date.setHours(date.getHours() + 9)
                    const dateStr = date.toISOString().slice(0,19)

                    // 履歴の登録
                    result.booth_history[location.href] = `[${dateStr}] ${title}`
                    chrome.storage.local.set({"booth_history": result.booth_history}, ()=>{})
                    const storage = encodeURI(JSON.stringify(result.booth_history)).replace(/%../g, "*").length/1000
                    if(storage > 4.5)
                    {
                        alert(`【Chrome拡張機能：booth無料ダウンロード履歴】\r\nストレージの使用量が上限に近いです。オプションから「履歴の保存」と「履歴の全削除」を行ってください。履歴の保存ができなくなります。`)
                    }
                })
                window.location.href = downloadLink
            })
            item.style.display ="block"
        })
    }
})
