import date from 'date-and-time'

var data = {
  apiUrl: 'http://localhost:4000',
  getTanggal: (milliS) => {
    return date.format(new Date(milliS), 'DD-MM-YYYY')
  },
  getTime: (milliS) => {
    return date.format(new Date(milliS), 'HH:MM')
  },
}
export default data
