export default (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(image)
        image.onerror = () => reject(new Error('image load failed'))
        img.src = url
    })
}