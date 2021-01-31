export default (url, method = 'GET', data = {}) => new Promise((resolve, reject) => {
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method === 'GET' ? null : JSON.stringify(data)
    })
    .then(res => resolve(res))
    .catch(e => reject(e))
})