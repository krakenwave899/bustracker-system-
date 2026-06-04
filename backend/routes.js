const collegeRoutes = {
  "Route01": {
    name: "Ambattur Estate to College",
    departureTime: "6:15am",
    stops: [
      { name: "Ambattur Estate",        lat: 13.1143, lng: 80.1548 },
      { name: "Ambattur OT",            lat: 13.1085, lng: 80.1600 },
      { name: "Poonamallee",            lat: 13.0490, lng: 80.1157 },
      { name: "Tambaram Bypass Road",   lat: 12.9249, lng: 80.1000 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route02": {
    name: "Chengalpettu to College",
    departureTime: "6:20am",
    stops: [
      { name: "Chengalpettu New BS",    lat: 12.6921, lng: 79.9765 },
      { name: "Chengalpettu Old BS",    lat: 12.6930, lng: 79.9750 },
      { name: "Mahindra City",          lat: 12.7443, lng: 80.0134 },
      { name: "Singaperumal Koil",      lat: 12.7682, lng: 80.0221 },
      { name: "Ford BS",                lat: 12.7800, lng: 80.0300 },
      { name: "Maraimalai Nagar BS",    lat: 12.7950, lng: 80.0350 },
      { name: "Potheri BS",             lat: 12.8231, lng: 80.0444 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route03": {
    name: "Peravallur to College",
    departureTime: "6:05am",
    stops: [
      { name: "Peravallur BS",          lat: 13.1200, lng: 80.2350 },
      { name: "Venus Gandhi Statue",    lat: 13.1180, lng: 80.2320 },
      { name: "Perambur Rly St",        lat: 13.1121, lng: 80.2324 },
      { name: "Jamalia",                lat: 13.1050, lng: 80.2300 },
      { name: "Ottery",                 lat: 13.0900, lng: 80.2250 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route04": {
    name: "Porur to College",
    departureTime: "6:10am",
    stops: [
      { name: "Porur Kumar Sweets",     lat: 13.0373, lng: 80.1568 },
      { name: "Saravana Stores Shell",  lat: 13.0350, lng: 80.1600 },
      { name: "Mugalaivakkam BS",       lat: 13.0100, lng: 80.1700 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route4A": {
    name: "Ramapuram to College",
    departureTime: "6:20am",
    stops: [
      { name: "Ramapuram BS",           lat: 13.0280, lng: 80.1800 },
      { name: "Butt Road BS",           lat: 13.0200, lng: 80.1850 },
      { name: "Sanitorium GK Hotel",    lat: 12.9800, lng: 80.1300 },
      { name: "Perungalathur",          lat: 12.9100, lng: 80.0900 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route05": {
    name: "Beach Station to College via OMR",
    departureTime: "6:20am",
    stops: [
      { name: "Beach Station",          lat: 13.1067, lng: 80.2942 },
      { name: "MGR Janaki College",     lat: 13.0060, lng: 80.2570 },
      { name: "Adyar Depot",            lat: 13.0012, lng: 80.2565 },
      { name: "Thiruvanmiyur PO",       lat: 12.9827, lng: 80.2588 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route06": {
    name: "Beach Station to College via ECR",
    departureTime: "6:20am",
    stops: [
      { name: "Beach Station",          lat: 13.1067, lng: 80.2942 },
      { name: "Foreshore Estate",       lat: 13.0500, lng: 80.2800 },
      { name: "MRC Nagar",              lat: 13.0300, lng: 80.2750 },
      { name: "Panaiyur",               lat: 12.9600, lng: 80.2600 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route07": {
    name: "Wavin to College",
    departureTime: "6:10am",
    stops: [
      { name: "Wavin",                  lat: 13.1200, lng: 80.1600 },
      { name: "Ambattur Estate",        lat: 13.1143, lng: 80.1548 },
      { name: "Tambaram Bypass Road",   lat: 12.9249, lng: 80.1000 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route08": {
    name: "Pulianthope to College via ECR",
    departureTime: "6:10am",
    stops: [
      { name: "P1 Police Station",      lat: 13.1000, lng: 80.2800 },
      { name: "Choolai PO",             lat: 13.0950, lng: 80.2750 },
      { name: "Royapettah",             lat: 13.0550, lng: 80.2650 },
      { name: "Alwarpet",               lat: 13.0350, lng: 80.2550 },
      { name: "Neelankarai",            lat: 12.9500, lng: 80.2500 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route09": {
    name: "Korattur to College",
    departureTime: "6:05am",
    stops: [
      { name: "Korattur Signal",        lat: 13.1000, lng: 80.1900 },
      { name: "Annanagar W Depot",      lat: 13.0850, lng: 80.2000 },
      { name: "Nerkundram",             lat: 13.0600, lng: 80.1800 },
      { name: "Kolapakkam",             lat: 12.9800, lng: 80.1200 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route10": {
    name: "Thirumangalam to College",
    departureTime: "6:10am",
    stops: [
      { name: "Thirumangalam",          lat: 13.0850, lng: 80.2100 },
      { name: "CMBT",                   lat: 13.0694, lng: 80.1996 },
      { name: "Ashok Pillar",           lat: 13.0350, lng: 80.2100 },
      { name: "Ekattuthangal",          lat: 13.0150, lng: 80.2150 },
      { name: "Pallikaranai",           lat: 12.9350, lng: 80.2100 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route11": {
    name: "Perambur to College via Palavakkam",
    departureTime: "6:00am",
    stops: [
      { name: "Perambur Market",        lat: 13.1150, lng: 80.2300 },
      { name: "Perambur RS",            lat: 13.1121, lng: 80.2324 },
      { name: "Egmore Stadium",         lat: 13.0750, lng: 80.2600 },
      { name: "IIT Madras",             lat: 12.9916, lng: 80.2336 },
      { name: "Palavakkam",             lat: 12.9600, lng: 80.2550 },
      { name: "Kanathur",               lat: 12.8900, lng: 80.2450 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route12": {
    name: "Villivakkam to College",
    departureTime: "6:05am",
    stops: [
      { name: "Villivakkam",            lat: 13.1050, lng: 80.2100 },
      { name: "ICF",                    lat: 13.1000, lng: 80.2150 },
      { name: "Kellys",                 lat: 13.0750, lng: 80.2450 },
      { name: "Kilpauk Garden",         lat: 13.0700, lng: 80.2400 },
      { name: "Kotturpuram",            lat: 13.0150, lng: 80.2450 },
      { name: "Madhyakailash",          lat: 13.0050, lng: 80.2450 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route13": {
    name: "Nathamuni to College",
    departureTime: "6:10am",
    stops: [
      { name: "Nathamuni Sidco Nagar",  lat: 13.1000, lng: 80.1700 },
      { name: "Chetput Signal",         lat: 13.0700, lng: 80.2350 },
      { name: "Stellamaris",            lat: 13.0650, lng: 80.2500 },
      { name: "Music Academy",          lat: 13.0600, lng: 80.2550 },
      { name: "Kandanchavadi",          lat: 12.9750, lng: 80.2450 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route14": {
    name: "Arumbakkam to College via OMR",
    departureTime: "6:15am",
    stops: [
      { name: "Arumbakkam BS",          lat: 13.0750, lng: 80.2050 },
      { name: "Anna Arch",              lat: 13.0700, lng: 80.2100 },
      { name: "T Nagar TP Road",        lat: 13.0400, lng: 80.2300 },
      { name: "Centaph Road",           lat: 13.0300, lng: 80.2400 },
      { name: "Puruvankara OMR",        lat: 12.8900, lng: 80.2300 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route15": {
    name: "Chinmaya Nagar to College via OMR",
    departureTime: "6:15am",
    stops: [
      { name: "Chinmaya Nagar",         lat: 13.0600, lng: 80.1950 },
      { name: "Vadapalani",             lat: 13.0500, lng: 80.2100 },
      { name: "Kodambakkam Bridge",     lat: 13.0450, lng: 80.2200 },
      { name: "Kelambakkam",            lat: 12.7820, lng: 80.2200 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route17": {
    name: "Ram Theatre to College",
    departureTime: "6:20am",
    stops: [
      { name: "Ram Theatre",            lat: 13.0600, lng: 80.2100 },
      { name: "T Nagar BS",             lat: 13.0400, lng: 80.2300 },
      { name: "Saidapet Metro",         lat: 13.0200, lng: 80.2200 },
      { name: "Indira Nagar Rly St",    lat: 12.9950, lng: 80.2400 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route19": {
    name: "Valasaravakkam to College",
    departureTime: "6:05am",
    stops: [
      { name: "Valasaravakkam",         lat: 13.0450, lng: 80.1700 },
      { name: "Virugambakkam",          lat: 13.0600, lng: 80.1950 },
      { name: "KK Nagar Roundana",      lat: 13.0400, lng: 80.2050 },
      { name: "Ashok Pillar",           lat: 13.0350, lng: 80.2100 },
      { name: "Velachery BS",           lat: 12.9750, lng: 80.2200 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route21": {
    name: "Avichi School to College",
    departureTime: "6:15am",
    stops: [
      { name: "Avichi School",          lat: 13.0600, lng: 80.2050 },
      { name: "Vadapalani Signal",      lat: 13.0500, lng: 80.2100 },
      { name: "Ashok Nagar",            lat: 13.0300, lng: 80.2000 },
      { name: "Saidapet Court",         lat: 13.0200, lng: 80.2200 },
      { name: "Velachery McDonalds",    lat: 12.9750, lng: 80.2200 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route29": {
    name: "Anagaputhur to College",
    departureTime: "6:25am",
    stops: [
      { name: "Anagaputhur BS",         lat: 12.9800, lng: 80.0900 },
      { name: "Pammal",                 lat: 12.9700, lng: 80.1000 },
      { name: "Pallavaram",             lat: 12.9675, lng: 80.1491 },
      { name: "MIT BS",                 lat: 12.9200, lng: 80.1600 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route35": {
    name: "Besant Nagar to College via ECR",
    departureTime: "6:40am",
    stops: [
      { name: "Besant Nagar Depot",     lat: 13.0000, lng: 80.2700 },
      { name: "Thiruvanmiyur TMB",      lat: 12.9827, lng: 80.2588 },
      { name: "Sholinganallur Jn",      lat: 12.9010, lng: 80.2279 },
      { name: "Akkarai",                lat: 12.8600, lng: 80.2500 },
      { name: "Uthandi Toll Gate",      lat: 12.8400, lng: 80.2400 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route36": {
    name: "Chromepet to College",
    departureTime: "6:40am",
    stops: [
      { name: "Chromepet Rly",          lat: 12.9516, lng: 80.1462 },
      { name: "TP Hospital",            lat: 12.9400, lng: 80.1300 },
      { name: "Vandalur Rly Gate",      lat: 12.8900, lng: 80.0800 },
      { name: "Pudupakkam",             lat: 12.8500, lng: 80.0600 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route39": {
    name: "Guindy to College",
    departureTime: "6:40am",
    stops: [
      { name: "Guindy RS",              lat: 13.0067, lng: 80.2206 },
      { name: "Gurunanak College",      lat: 12.9916, lng: 80.2173 },
      { name: "Taramani Church",        lat: 12.9716, lng: 80.2394 },
      { name: "Sholinganallur Jn",      lat: 12.9010, lng: 80.2279 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route41": {
    name: "East Tambaram to College",
    departureTime: "6:40am",
    stops: [
      { name: "East Tambaram UCO Bank", lat: 12.9300, lng: 80.1200 },
      { name: "Selaiyur PS",            lat: 12.9200, lng: 80.1300 },
      { name: "Rajakilpakkam",          lat: 12.9000, lng: 80.1500 },
      { name: "Medavakkam Koot Road",   lat: 12.9100, lng: 80.1900 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
  "Route43": {
    name: "Guduvanchery to College via Kelambakkam",
    departureTime: "6:50am",
    stops: [
      { name: "Guduvanchery",           lat: 12.8450, lng: 80.0550 },
      { name: "Urapakkam",              lat: 12.8700, lng: 80.0700 },
      { name: "Vandalur Zoo",           lat: 12.8900, lng: 80.0800 },
      { name: "Kelambakkam",            lat: 12.7820, lng: 80.2200 },
      { name: "College",                lat: 12.8231, lng: 80.0444 },
    ]
  },
};

module.exports = collegeRoutes;