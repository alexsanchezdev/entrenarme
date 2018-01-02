const url = 'https://dev.entrenar.me/api/test/questions'

const headers = {
    'Authorization': 'Y5SqgdMvz7US7FWF6Qk157ffa2e999',
    'Content-Type': 'application/json',
}

const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export const getQuestions = (page, keyword) => (
    fetch(`${url}?${queryParams({ page, keyword })}`, { headers })
)

export const getQuestion = (id) => (
    fetch(`${url}/${id}}`, { headers })
)

export const postQuestion = (name, text) => (
    fetch(`${url}`, {
        method: 'post',
        headers,
        body: JSON.stringify({name, text})
    })
)