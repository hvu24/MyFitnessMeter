export const capitalizeWords = words => {
    let wordsArray = words.split(' ')
    let res = []
    for(let i = 0; i < wordsArray.length; i++){
        res.push(wordsArray[i][0].toUpperCase() + wordsArray[i].slice(1))
    }
    return res.join(' ')
}
