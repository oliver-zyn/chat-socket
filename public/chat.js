const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${room}`)

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

let user = null

function updateMessagesOnScreen(messages) {
    const divMessages = document.querySelector('#messages')

    let listMessages = '<ul>'

    messages.forEach(message => {
        listMessages += `<li>${message.user}: ${message.msg}</li>`
    });

    listMessages += '</ul>'

    divMessages.innerHTML = listMessages
}

document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.querySelector('#messageForm')

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!user) {
            alert('Defina um usuário')
            return
        }

        const message = document.forms['messageForm']['msg'].value
        document.forms['messageForm']['msg'].value = ''
        socket.emit('new_message', {user, msg: message})
    })

    const userForm = document.querySelector('#userForm')

    userForm.addEventListener('submit', (e) => {
        e.preventDefault()
        user = document.forms['userForm']['user'].value
        userForm.parentNode.removeChild(userForm)
    })
})