# Weather App

**CLA built on Node 10.4.1**

Run using the default location:
```
node app

Nashville, TN, USA
Currently 74.67, but it feels like 75.45
38% chance of rain today, an opportunity to test Mother Nature, if you feel so bold
```

Run specifying a city or zip:
```
node app -a Boston

Boston, MA, USA
Currently 70.21, but it feels like 70.21
2% chance of rain today, 100% chance of my accuracy
```
```
node app -a 28701

Alexander, NC 28701, USA
Currently 76.96, but it feels like 77.58
It_Gon_Rain.gif
```

Run with a specific address
```
node app -a "195 Park Bridge Lane Roswell GA"

195 Park Bridge Ln, Roswell, GA 30075, USA
Currently 83.56, but it feels like 85.6
37% chance of rain today, an opportunity to test Mother Nature, if you feel so bold
```
