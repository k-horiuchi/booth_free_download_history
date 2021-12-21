chrome.storage.local.get("booth_history", (result) => {
    const storage = encodeURI(JSON.stringify(result.booth_history)).replace(/%../g, "*").length/1000
    document.querySelector("#storage").innerText = `ストレージ使用量：${storage}MB / 5MB`
    
    for(let key in result.booth_history)
    {
        document.querySelector("#main").innerHTML += `<li><a href="${key}" target="_blank">${result.booth_history[key]}</li>`
    }

    if(storage > 4.5)
    {
        alert("ストレージの使用量が4.5MB以上になりました。「履歴の保存」と「履歴の全削除」を行ってください。保存できなくなります")
    }
})

document.querySelector("#delete").addEventListener("click", () =>
{
    if(window.confirm('本当に履歴を全削除しますか？事前に履歴ダウンロードをしてください。'))
    {
        if(window.confirm('消した履歴は元に戻りません。それでも、本当に履歴を全削除しますか？'))
        {
            chrome.storage.local.set({"booth_history": new Object()}, ()=>{})
            location.reload()
        }
    }
})

document.querySelector("#download").addEventListener("click", () =>
{
    chrome.storage.local.get("booth_history", (result) => {
        let text = "リンク,商品名\r\n"
        for(let key in result.booth_history)
        {
            text += `${key},${result.booth_history[key]}\r\n`
        }
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
        const blob = new Blob([ bom, text ], { "type" : "text/csv" })
        const aTag = document.createElement('a');
        aTag.href = URL.createObjectURL(blob);
        aTag.target = '_blank';
        aTag.download = "booth_free_download_history.csv";
        aTag.click();
        URL.revokeObjectURL(aTag.href);
    })

    chrome.storage.local.get("booth_history", (result) => {
        let text = "<h2>ダウンロード履歴</h2>\r\n"
        for(let key in result.booth_history)
        {
            text += `<li><a href="${key}" target="_blank">${result.booth_history[key]}</li>\r\n`
        }
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
        const blob = new Blob([ bom, text ], { "type" : "text/html" })
        const aTag = document.createElement('a');
        aTag.href = URL.createObjectURL(blob);
        aTag.target = '_blank';
        aTag.download = "booth_free_download_history.html";
        aTag.click();
        URL.revokeObjectURL(aTag.href);
    })
})