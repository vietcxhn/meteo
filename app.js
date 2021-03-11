// let url_parser = require('url')
// let http = require('http')
// let mustache = require('mustache')

// let template = '<form action="/" method="GET"><input type="text" name="city" placeholer="Ville"><input type="submit" value="Valider"></form>' +
// 				'<h1>{{city}}</h1>' + 
// 				'<img src="{{weather_icons}}" >' + 
// 				'<ul>' +
// 				'<li>Temperature : {{temperature}}</li>' + 
// 				'<li>Vent : {{wind_speed}}</li>' + 
// 				'<li>Temps : {{weather_descriptions}}</li>' +
// 				'</ul>'

// let request = require('request');

// let key = '6e131e3bea1d1c09d0674cf089d902a1';
// let city = 'marseille';
// let urlapi = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;
// var data2

// let server = http.createServer((req, res) => {
	
// 	let url = url_parser.parse(req.url, true);
// 	if (req.method == 'GET' && url.query.city != undefined) {
// 		city = url.query.city;
// 		urlapi = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;
// 		let promise = new Promise((acp, rej) => {
// 			request(urlapi, (err, res, body) => {
// 				if(!err) { 
// 					data = JSON.parse(body);

// 					data2 = {
// 						city: data.request.query,
// 						weather_icons : data.current.weather_icons[0],
// 						temperature: data.current.temperature,
// 						wind_speed: data.current.wind_speed,
// 						weather_descriptions: data.current.weather_descriptions[0]
// 					}
// 					acp();
// 				// le r´esultat est disponible dans data, le traitement peut continuer ici
// 				}
// 			});	
// 		})
// 		promise.then(() => {
// 			res.writeHead(200, {'content-type': 'text/html'});
// 			res.end(mustache.render(template, data2));
// 		}, () => {
// 			res.writeHead(200, {'content-type': 'text/html'});
// 			res.end('<form action="/" method="GET"><input type="text" name="city" placeholer="Ville"><input type="submit" value="Valider"></form>');
// 		})
// 	}
// 	else if (url.query.city == undefined) {
// 		res.writeHead(200, {'content-type': 'text/html'});
// 		res.end('<form action="/" method="GET"><input type="text" name="city" placeholer="Ville"><input type="submit" value="Valider"></form>');
// 	}
		
// 	}
// )
// server.listen(3000);

let express = require('express');
let app = express();

let request = require('request');

let key = '6e131e3bea1d1c09d0674cf089d902a1';
let city = 'marseille';
let urlapi = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;

let mustache = require('mustache')
let template = '<form action="/get-weather" method="GET"><input type="text" name="city" placeholer="Ville"><input type="submit" value="Valider"></form>' +
				'<h1>{{city}}</h1>' + 
				'<img src="{{weather_icons}}" >' + 
				'<ul>' +
				'<li>Temperature : {{temperature}}</li>' + 
				'<li>Vent : {{wind_speed}}</li>' + 
				'<li>Temps : {{weather_descriptions}}</li>' +
				'</ul>'

app.get('/get-weather/:city', (req, res) => {
	city = req.params.city;
	urlapi = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;
	let promise = new Promise((acp, rej) => {
		request(urlapi, (err, res, body) => {
			if(!err) { 
				data = JSON.parse(body);

				data2 = {
					city: data.request.query,
					weather_icons : data.current.weather_icons[0],
					temperature: data.current.temperature,
					wind_speed: data.current.wind_speed,
					weather_descriptions: data.current.weather_descriptions[0]
				}
				acp();
			// le r´esultat est disponible dans data, le traitement peut continuer ici
			}
		});	
	})
	promise.then(() => {
		res.send(mustache.render(template, data2))
	}, () => {
		res.redirect('/')
	})
})

app.get('/' ,(req, res) => {
	res.send('<form action="/get-weather" method="get"><input type="text" name="city" placeholer="Ville"><input type="submit" value="Valider"></form>')
})

app.get('/get-weather', (req, res) => {
	city = req.query.city
	if (city == undefined) res.redirect('/')
	res.redirect('/get-weather/'+city)
	
})

app.listen(3000)




