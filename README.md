# SimpleTracker

Simple Tool to track access to Websites

## Set Up

```
npm install
echo "PORT=3000" > .env
node index.js
```
The stat service will be running at http://<your-domain>:<PORT>

In every Website you want to track just add

```html
<script>fetch('http://<your-domain>:<PORT>', {method: 'POST'})</script>
```

## TODO

 * Stat Dashboard