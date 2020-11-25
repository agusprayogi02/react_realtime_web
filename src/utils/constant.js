import date from 'date-and-time'
var onn = 'https://school-realtime.herokuapp.com'
var off = 'http://localhost:4000'
var data = {
    apiUrl: onn,
    getTanggal: (milliS) => {
        return date.format(new Date(milliS), 'DD-MM-YYYY')
    },
    getTime: (milliS) => {
        return date.format(new Date(milliS), 'HH:MM')
    },
}
export default data