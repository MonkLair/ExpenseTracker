const time = new Date()
export const currentTimeInput =
    time.getFullYear() + '-' +
    (time.getMonth() < 10 ? '0' : '') +
    (time.getMonth() + 1) + '-' +
    (time.getDate() < 10 ? '0' : '') +
    time.getDate() + 'T' +
    time.getHours() + ':' +
    (time.getMinutes() < 10 ? '0' : '') +
    time.getMinutes()

export const currentTime =
    time.getFullYear() + '-' +
    (time.getMonth() < 10 ? '0' : '') +
    (time.getMonth() + 1) + '-' +
    (time.getDate() < 10 ? '0' : '') +
    time.getDate() + ' ' +
    time.getHours() + ':' +
    (time.getMinutes() < 10 ? '0' : '') +
    time.getMinutes()