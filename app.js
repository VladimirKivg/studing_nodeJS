/*сайт https://us21.admin.mailchimp.com/account/api/manage/#create урок у
 Ажели номер 224. Posting Data to Mailchimp's Servers via their API*/
/* key 63674d81608ac6aa535ab9167b7765ee-us21 */
/** і ключ і id знайщов на сайті які вказав тут, алу ці сяйти змінилися, і так як показує в відео занйти
 * ці значення не можливо, витратив на це цілий день, але всеодно треба передивлятись відео щоб йочаб зорієнтуватись
 * що потрібно шукати,
 * зробив файд підказка там скріни для  id */
/*https://us21.admin.mailchimp.com/lists/settings?id=10884*/
/* unique id audience -  cd2db11577*/
/*us21*/

/** https://mailchimp.com/developer/marketing/api/lists/   -
 * https://mailchimp.com/developer/marketing/api/abuse-reports/  - тут приклади*/

/** це все що я накоментував вище, я так і не розібров про що пише анжела, я вирішив весь код нище видалити
 *  і прописати свою відправку імейла, якщо захочеш перейдеш по уроку коли анголійська буде краща, і */



/** $$$$$$$$$$$$$$$$$$$$$$ тут початок $$$$$$$$$$$$$$$$$$$$$$$*/


const express = require("express");
const app = express();
const bodyParsser = require("body-parser");

/*щоб було видно css файли серверу пишемо цей метод створюємо папке public в ній створюємо папку css і туда
* кладемо css файл - в html прописуємо шлях css/style.css*/
app.use(express.static("public"));

app.use(bodyParsser.urlencoded({exceeds: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    console.log(req.body);
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    /** %%%%%%%%%%%%%%%%%%%%%%%%%%%%   виділяємо саму відправку листа  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*це за звичай треба писати в самому верху тут тільки для прикладу*/
    const nodemailer = require('nodemailer');

// адреса електронної пошти, з якої ми будемо відправляти листа
    const emailFrom = 'cherenuha1@gmail.com';

// пароль для адреси електронної пошти
    const password = 'vova1402';

// адреса електронної пошти, на яку ми будемо відправляти листа
    const emailTo = email;

// Створення транспорту для SMTP-сервера
    const transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',// використовуючи gmail тут напишемо smtp.gmail.com
        port: 465,
        secure: true, // використовувати SSL
        auth: {
            user: 'cheremuha11@ukr.net', // ваша адреса електронної пошти Gmail
            pass: 'JKfhLvJiTe39bSv1' // ваш пароль для Gmail // цей паронь надає ukr.net для чторонніх додатків коли ми вмикаємо  IMAP , щось подібне може надати gmail але потрібно налаштовувати двохетапну перевірку там потрібно номер телефону, і це довго читати, і виясняти як це зробити
        }
    });

// Налаштування електронного листа
    const mailOptions = {
        from: 'cheremuha11@ukr.net', // ваша адреса електронної пошти Gmail
        to: emailTo, // адреса отримувача
        subject: 'Test Email',
        text: 'Hello World!'
    };

// Відправлення електронної пошти
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.sendFile(__dirname+"/failure.html");
        } else {
            console.log('Email sent: ' + info.response);
            res.sendFile(__dirname+"/success.html");
        }
    });


    /** %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

});

app.post("/failure",function (req,res){
    /*а цей метод повертає нас як завджди до початку*/
    console.log(req.body.name);
    res.redirect("/");
});


/*цей сервер є локальним щоб запуститись на heroku це закоментуєм і трошки перепишем*/
/*app.listen(3000, function () {
    console.log("we running port 3000");
});*/

/*angella lessons 226. Deploying Your Server with Heroku*/
/*так прописується сервер для запуску на heroku*/
/*але щоб можна було слузати його і локально через знак або "||" пишемо сервер 3000*/
app.listen(process.env.PORT || 3000, function () {
    console.log("we running port 3000");
});
/*попередньо перед запуском на heroku після реєстрації виконуємо такі кроки на сайті та в командній строці
*заходимо node.js->get started with node.js->I'm ready to start-> якщо ми не встановили heroku то встановлюємо і
* аиконуємо команді, якщо вже все встановлено, йдемо далі -> Define a Procfile-> створюємо файл Procfile в корнівій
* папці без будьяких розширень і в середені пишемо   web: npm start  де web ми пишемо обовязково,
* а start - це файл який ми будемо стартувати в ношому випадку це app.js -> пишемо в команд строці, в корньовій папці
* git init -> dit add . (додати все) -> git commit -m "тут пишемо якийсь комент" -> йдемо до наступного кроку
* тиснемо Deploy the app -> виконуємо команди які там пише -> heroku create -> git push heroku main ->
* heroku ps:scale web=1 -> heroku open */



