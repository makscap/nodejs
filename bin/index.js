// Наш сервер (Запуск сервера) 
// После того как перенести сервер с апп.джеес, теперь не он отвечает за запуск , а отвечает индекс.джеес
const app = require('../app')
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {console.log(`Port === ${PORT}`)}) 