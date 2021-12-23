chrome.storage.local.get("booth_history", (result) => {
    const storage = encodeURI(JSON.stringify(result.booth_history)).replace(/%../g, "*").length/1000
    document.querySelector("#storage").innerText = `ストレージ使用量：${storage.toFixed(1)}MB`

    if(storage.toFixed(1) == 0.0)
    {
        document.querySelector("h2").innerText = "まだ何もダウンロードしていません。"
        document.querySelector("#download").style.display ="none"
        document.querySelector("#delete").style.display ="none"
    }
    else
    {
        const object = result.booth_history
        const array = Object.keys(object).map((e)=>({ key: e, value: object[e] }))
        array.sort((a,b)=>{ if(a.value < b.value) return 1; if(a.value > b.value) return -1; return 0;})
        array.forEach(item => document.querySelector("#main").innerHTML += `<li><a href="${item.key}" target="_blank">${item.value}</li>`)
    }
})

document.querySelector("#delete").addEventListener("click", () =>
{
    if(window.confirm('【警告】本当に履歴を全削除しますか？')
    && window.confirm('【最終警告】消した履歴は元に戻りません。それでも、本当に履歴を全削除しますか？'))
        chrome.storage.local.remove("booth_history", () => location.reload())
})

const download = (text, type) =>
{
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    const blob = new Blob([ bom, text.join('\r\n') ], { "type" : `text/${type}` })
    const aTag = document.createElement('a')
    aTag.href = URL.createObjectURL(blob)
    aTag.target = '_blank'
    aTag.download = `booth_free_download_history.${type}`
    aTag.click()
    URL.revokeObjectURL(aTag.href)
}

document.querySelector("#download").addEventListener("click", () => {
    chrome.storage.local.get("booth_history", (result) => {
        const csv = [`"リンク" , "商品名"`]
        const html = ["<h1>ダウンロード履歴</h1>"]
        Object.keys(result.booth_history).forEach((key)=>{
            csv.push(`"${key}" , "${result.booth_history[key]}"`)
            html.push(`<li><a href="${key}" target="_blank">${result.booth_history[key]}</li>`)
        })
        download(html, "html")
        download(csv, "csv")
    })
})