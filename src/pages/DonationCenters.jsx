import { useState, useEffect, useMemo } from 'react';
import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import { Card } from 'primereact/card';
import { Box, Typography, Paper } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';
import AOS from 'aos';
import "aos/dist/aos.css";

// Blood donation centers data
const bloodDonationCenters = [
  // States
  { name: 'AIIMS Raipur Blood Bank', address: 'Raipur, Chhattisgarh 492099, India', lat: 21.2579, lng: 81.5792 },
  { name: 'Civil Hospital Blood Bank', address: 'Ahmedabad, Gujarat 380016, India', lat: 23.0503, lng: 72.6031 },
  { name: 'Government Medical College Blood Bank', address: 'Thiruvananthapuram, Kerala 695011, India', lat: 8.5241, lng: 76.9366 },
  { name: 'IGIMS Blood Bank', address: 'Patna, Bihar 800014, India', lat: 25.6093, lng: 85.1414 },
  { name: 'Indian Red Cross Society Blood Centre', address: 'New Delhi, Delhi 110001, India', lat: 28.6271, lng: 77.2163 },
  { name: 'Ranchi Blood Bank', address: 'Ranchi, Jharkhand 834001, India', lat: 23.3441, lng: 85.3096 },
  { name: 'KEM Hospital Blood Bank', address: 'Parel, Mumbai, Maharashtra 400012, India', lat: 19.0016, lng: 72.8408 },
  { name: 'Manipal Hospital Blood Bank', address: 'HAL Airport Road, Bangalore, Karnataka 560017, India', lat: 12.9579, lng: 77.6685 },
  { name: 'NRS Medical College Blood Bank', address: 'Sealdah, Kolkata, West Bengal 700014, India', lat: 22.5646, lng: 88.3579 },
  { name: 'Apollo Hospital Blood Bank', address: 'Greams Road, Chennai, Tamil Nadu 600006, India', lat: 13.0634, lng: 80.2518 },
  { name: 'Nizam’s Institute Blood Bank', address: 'Punjagutta, Hyderabad, Telangana 500082, India', lat: 17.4241, lng: 78.4495 },
  { name: 'Sawai Man Singh Hospital Blood Bank', address: 'Tonk Road, Jaipur, Rajasthan 302004, India', lat: 26.9042, lng: 75.8145 },
  { name: 'King George’s Medical University Blood Bank', address: 'Chowk, Lucknow, Uttar Pradesh 226003, India', lat: 26.8700, lng: 80.9161 },
  { name: 'Hamidia Hospital Blood Bank', address: 'Sultania Road, Bhopal, Madhya Pradesh 462001, India', lat: 23.2500, lng: 77.4000 },
  { name: 'Assam Medical College Blood Bank', address: 'Dibrugarh, Assam 786002, India', lat: 27.4833, lng: 94.9119 },
  { name: 'Government Medical College Blood Bank', address: 'Amritsar, Punjab 143001, India', lat: 31.6331, lng: 74.8656 },
  { name: 'PGIMER Blood Bank', address: 'Chandigarh, Punjab 160012, India', lat: 30.7660, lng: 76.7751 },
  { name: 'SCB Medical College Blood Bank', address: 'Cuttack, Odisha 753007, India', lat: 20.4723, lng: 85.8394 },
  { name: 'Civil Hospital Blood Bank', address: 'Shimla, Himachal Pradesh 171001, India', lat: 31.1048, lng: 77.1734 },
  { name: 'Government Medical College Blood Bank', address: 'Jammu, Jammu and Kashmir 180001, India', lat: 32.7266, lng: 74.8570 },
  { name: 'RIMS Blood Bank', address: 'Imphal, Manipur 795004, India', lat: 24.8167, lng: 93.9167 },
  { name: 'Civil Hospital Blood Bank', address: 'Aizawl, Mizoram 796001, India', lat: 23.7367, lng: 92.7176 },
  { name: 'SMHS Hospital Blood Bank', address: 'Srinagar, Jammu and Kashmir 190010, India', lat: 34.0837, lng: 74.7973 },
  { name: 'Regional Institute of Medical Sciences Blood Bank', address: 'Imphal, Manipur 795004, India', lat: 24.8167, lng: 93.9167 },
  { name: 'Civil Hospital Blood Bank', address: 'Kohima, Nagaland 797001, India', lat: 25.6586, lng: 94.1053 },
  { name: 'Agartala Government Medical College Blood Bank', address: 'Agartala, Tripura 799006, India', lat: 23.8338, lng: 91.2868 },
  { name: 'Government Medical College Blood Bank', address: 'Dehradun, Uttarakhand 248001, India', lat: 30.3165, lng: 78.0322 },
  { name: 'Silchar Medical College Blood Bank', address: 'Silchar, Assam 788014, India', lat: 24.8167, lng: 92.8000 },
  // Union Territories
  { name: 'JIPMER Blood Bank', address: 'Puducherry, Puducherry 605006, India', lat: 11.9531, lng: 79.7966 },
  { name: 'Port Blair Blood Bank', address: 'Port Blair, Andaman and Nicobar Islands 744104, India', lat: 11.6234, lng: 92.7265 },
  { name: 'Government Medical College Blood Bank', address: 'Chandigarh, Chandigarh 160030, India', lat: 30.7580, lng: 76.7750 },
  { name: 'Dadra and Nagar Haveli Blood Bank', address: 'Silvassa, Dadra and Nagar Haveli 396230, India', lat: 20.2760, lng: 73.0159 },
  { name: 'Daman Government Hospital Blood Bank', address: 'Daman, Daman and Diu 396210, India', lat: 20.4283, lng: 72.8397 },
  { name: 'LGB Regional Institute Blood Bank', address: 'Tezpur, Assam 784001, India', lat: 26.6528, lng: 92.7923 },
  { name: 'IGMC Blood Bank', address: 'Shimla, Himachal Pradesh 171001, India', lat: 31.1048, lng: 77.1734 },
  { name: 'Ladakh Government Hospital Blood Bank', address: 'Leh, Ladakh 194101, India', lat: 34.1526, lng: 77.5770 },
  { name: 'Prathama Blood Centre', address: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },

  // **Kokilaben Dhirubhai Ambani Hospital Blood Bank** – Mumbai, Maharashtra
  { name: 'Kokilaben Dhirubhai Ambani Hospital Blood Bank', address: 'Andheri West, Mumbai, Maharashtra, India', lat: 19.1200, lng: 72.8370 },

  // **Rotary Blood Bank** – Tughlakabad, New Delhi
  { name: 'Rotary Blood Bank', address: 'Tughlakabad Institutional Area, New Delhi, India', lat: 28.5200, lng: 77.2700 },

  // **NTR Trust Blood Centre** – Hyderabad, Telangana
  { name: 'NTR Trust Blood Centre', address: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },

  // **Relicord Blood Bank** – Navi Mumbai, Maharashtra
  { name: 'ReliCord Blood Bank', address: 'Navi Mumbai, Maharashtra, India', lat: 19.0330, lng: 73.0297 },

  // **Indian Red Cross Society - Vidyanagar Blood Centre** – Hyderabad, Telangana
  { name: 'IRCS Blood Centre Vidyanagar', address: 'Vidyanagar, Hyderabad, Telangana, India', lat: 17.4165, lng: 78.5587 },

  // **Indian Red Cross Society – Thanjavur Blood Bank** – Thanjavur, Tamil Nadu
  { name: 'IRCS Blood Centre Thanjavur', address: 'Medical College Road, Thanjavur, Tamil Nadu, India', lat: 10.7870, lng: 79.1390 },

  // **Indian Red Cross Society – Guntur Blood Centre** – Guntur, Andhra Pradesh
  { name: 'IRCS Blood Centre Guntur', address: 'Guntur, Andhra Pradesh, India', lat: 16.3067, lng: 80.4365 },

  // **Indian Red Cross Society – Ludhiana Blood Bank** – Ludhiana, Punjab
  { name: 'IRCS Blood Centre Ludhiana', address: 'Mall Road, Ludhiana, Punjab, India', lat: 30.9010, lng: 75.8573 },

  // **Indian Red Cross Society – Bhubaneswar Blood Centre** – Bhubaneswar, Odisha
  { name: 'IRCS Blood Centre Bhubaneswar', address: 'Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8245 },

  // **Indian Red Cross Society – Vizianagaram Blood Centre** – Andhra Pradesh
  { name: 'IRCS Blood Centre Vizianagaram', address: 'Vizianagaram, Andhra Pradesh, India', lat: 18.1064, lng: 83.3956 },

  // **Indian Red Cross Society – Kakinada Blood Bank** – Andhra Pradesh
  { name: 'IRCS Blood Centre Kakinada', address: 'Kakinada, Andhra Pradesh, India', lat: 16.9891, lng: 82.2475 },

  // **Indian Red Cross Society – Nellore Blood Centre** – Andhra Pradesh
  { name: 'IRCS Blood Centre Nellore', address: 'Nellore, Andhra Pradesh, India', lat: 14.4426, lng: 79.9865 },

  // **AIIMS Bhubaneswar Blood Bank** – Bhubaneswar, Odisha
  { name: 'AIIMS Bhubaneswar Blood Bank', address: 'AIIMS Bypass Road, Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8211 },

  // **Chiranjeevi Charitable Trust Blood Bank** – Hyderabad, Telangana
  { name: 'Chiranjeevi Charitable Trust Blood Bank', address: 'Jubilee Hills, Hyderabad, Telangana, India', lat: 17.4241, lng: 78.4123 },

  // IRCS – Anantapur, Andhra Pradesh
  { name: 'IRCS Blood Centre Anantapur', address: 'Anantapur, Andhra Pradesh, India', lat: 14.6816, lng: 77.6000 },
  
  // IRCS – Chittoor, Andhra Pradesh
  { name: 'IRCS Blood Centre Chittoor', address: 'Chittoor, Andhra Pradesh, India', lat: 13.2171, lng: 79.1000 },
  
  // IRCS – Eluru, Andhra Pradesh
  { name: 'IRCS Blood Centre Eluru', address: 'Eluru, Andhra Pradesh, India', lat: 16.7107, lng: 81.1039 },
  
  // IRCS – Kadapa, Andhra Pradesh
  { name: 'IRCS Blood Centre Kadapa', address: 'Kadapa, Andhra Pradesh, India', lat: 14.4674, lng: 78.8240 },
  
  // IRCS – Machilipatnam, Andhra Pradesh
  { name: 'IRCS Blood Centre Machilipatnam', address: 'Machilipatnam, Andhra Pradesh, India', lat: 16.1867, lng: 81.1315 },
  
  // IRCS – Narasapuram, Andhra Pradesh
  { name: 'IRCS Blood Centre Narasapuram', address: 'Narasapuram, Andhra Pradesh, India', lat: 16.4322, lng: 81.7030 },
  
  // IRCS – Ongole, Andhra Pradesh
  { name: 'IRCS Blood Centre Ongole', address: 'Ongole, Andhra Pradesh, India', lat: 15.5048, lng: 80.0510 },
  
  // IRCS – Repalle, Andhra Pradesh
  { name: 'IRCS Blood Centre Repalle', address: 'Repalle, Andhra Pradesh, India', lat: 16.1912, lng: 80.8339 },
  
  // IRCS – Srikakulam, Andhra Pradesh
  { name: 'IRCS Blood Centre Srikakulam', address: 'Srikakulam, Andhra Pradesh, India', lat: 18.2964, lng: 83.8934 },
  
  // IRCS – Tanuku, Andhra Pradesh
  { name: 'IRCS Blood Centre Tanuku', address: 'Tanuku, Andhra Pradesh, India', lat: 16.8338, lng: 81.6950 },
  
  // IRCS – Vijayawada, Andhra Pradesh
  { name: 'IRCS Blood Centre Vijayawada', address: 'Vijayawada, Andhra Pradesh, India', lat: 16.5062, lng: 80.6480 },
  
  // IRCS – Visakhapatnam, Andhra Pradesh
  { name: 'IRCS Blood Centre Visakhapatnam', address: 'Visakhapatnam, Andhra Pradesh, India', lat: 17.6868, lng: 83.2185 },

  // IRCS – Silchar, Assam
  { name: 'IRCS Blood Centre Silchar', address: 'Silchar, Assam, India', lat: 24.8333, lng: 92.7783 },

  // IRCS – Bhojpur, Bihar
  { name: 'IRCS Blood Centre Bhojpur', address: 'Bhojpur (Ara), Bihar, India', lat: 25.5560, lng: 84.6523 },

  // IRCS – Motihari, Bihar
  { name: 'IRCS Blood Centre Motihari', address: 'Motihari, Bihar, India', lat: 26.6536, lng: 84.9167 },

  // IRCS – Purnia, Bihar
  { name: 'IRCS Blood Centre Purnia', address: 'Purnia, Bihar, India', lat: 25.7772, lng: 87.4753 },

  // IRCS – Samastipur, Bihar
  { name: 'IRCS Blood Centre Samastipur', address: 'Samastipur, Bihar, India', lat: 25.8704, lng: 85.7788 },

  // IRCS – Jalgaon, Maharashtra
  { name: 'IRCS Blood Centre Jalgaon', address: 'Jalgaon, Maharashtra, India', lat: 21.0077, lng: 75.5626 },

  // IRCS – Mumbai (Town Hall)
  { name: 'IRCS Bombay Red Cross Blood Centre', address: 'Town Hall Compound, Mumbai, Maharashtra, India', lat: 18.9433, lng: 72.8349 },

  // IRCS – Pandharpur, Maharashtra
  { name: 'IRCS Blood Centre Pandharpur', address: 'Pandharpur, Maharashtra, India', lat: 17.6597, lng: 75.3400 },

  // IRCS – Ratnagiri, Maharashtra
  { name: 'IRCS Blood Centre Ratnagiri', address: 'Ratnagiri, Maharashtra, India', lat: 16.9933, lng: 73.3008 },

  // IRCS – Sangli, Maharashtra
  { name: 'IRCS Blood Centre Sangli', address: 'Sangli, Maharashtra, India', lat: 16.8570, lng: 74.5638 },

  // IRCS – Solapur (Shriman Rambhai Shah)
  { name: 'IRCS Blood Centre Solapur', address: 'Solapur, Maharashtra, India', lat: 17.6599, lng: 75.9064 },

  // Athar Blood Bank – Solapur, Maharashtra
  { name: 'Athar Blood Bank', address: 'Solapur, Maharashtra, India', lat: 17.6581, lng: 75.9061 },

   { name: 'IRCS Blood Centre Anantapur', address: 'Anantapur, Andhra Pradesh, India', lat: 14.6816, lng: 77.6000 },
  
  // IRCS – Chittoor, Andhra Pradesh
  { name: 'IRCS Blood Centre Chittoor', address: 'Chittoor, Andhra Pradesh, India', lat: 13.2171, lng: 79.1000 },
  
  // IRCS – Eluru, Andhra Pradesh
  { name: 'IRCS Blood Centre Eluru', address: 'Eluru, Andhra Pradesh, India', lat: 16.7107, lng: 81.1039 },
  
  // IRCS – Kadapa, Andhra Pradesh
  { name: 'IRCS Blood Centre Kadapa', address: 'Kadapa, Andhra Pradesh, India', lat: 14.4674, lng: 78.8240 },
  
  // IRCS – Machilipatnam, Andhra Pradesh
  { name: 'IRCS Blood Centre Machilipatnam', address: 'Machilipatnam, Andhra Pradesh, India', lat: 16.1867, lng: 81.1315 },
  
  // IRCS – Narasapuram, Andhra Pradesh
  { name: 'IRCS Blood Centre Narasapuram', address: 'Narasapuram, Andhra Pradesh, India', lat: 16.4322, lng: 81.7030 },
  
  // IRCS – Ongole, Andhra Pradesh
  { name: 'IRCS Blood Centre Ongole', address: 'Ongole, Andhra Pradesh, India', lat: 15.5048, lng: 80.0510 },
  
  // IRCS – Repalle, Andhra Pradesh
  { name: 'IRCS Blood Centre Repalle', address: 'Repalle, Andhra Pradesh, India', lat: 16.1912, lng: 80.8339 },
  
  // IRCS – Srikakulam, Andhra Pradesh
  { name: 'IRCS Blood Centre Srikakulam', address: 'Srikakulam, Andhra Pradesh, India', lat: 18.2964, lng: 83.8934 },
  
  // IRCS – Tanuku, Andhra Pradesh
  { name: 'IRCS Blood Centre Tanuku', address: 'Tanuku, Andhra Pradesh, India', lat: 16.8338, lng: 81.6950 },
  
  // IRCS – Vijayawada, Andhra Pradesh
  { name: 'IRCS Blood Centre Vijayawada', address: 'Vijayawada, Andhra Pradesh, India', lat: 16.5062, lng: 80.6480 },
  
  // IRCS – Visakhapatnam, Andhra Pradesh
  { name: 'IRCS Blood Centre Visakhapatnam', address: 'Visakhapatnam, Andhra Pradesh, India', lat: 17.6868, lng: 83.2185 },

  // IRCS – Silchar, Assam
  { name: 'IRCS Blood Centre Silchar', address: 'Silchar, Assam, India', lat: 24.8333, lng: 92.7783 },

  // IRCS – Bhojpur, Bihar
  { name: 'IRCS Blood Centre Bhojpur', address: 'Bhojpur (Ara), Bihar, India', lat: 25.5560, lng: 84.6523 },

  // IRCS – Motihari, Bihar
  { name: 'IRCS Blood Centre Motihari', address: 'Motihari, Bihar, India', lat: 26.6536, lng: 84.9167 },

  // IRCS – Purnia, Bihar
  { name: 'IRCS Blood Centre Purnia', address: 'Purnia, Bihar, India', lat: 25.7772, lng: 87.4753 },

  // IRCS – Samastipur, Bihar
  { name: 'IRCS Blood Centre Samastipur', address: 'Samastipur, Bihar, India', lat: 25.8704, lng: 85.7788 },

  // IRCS – Jalgaon, Maharashtra
  { name: 'IRCS Blood Centre Jalgaon', address: 'Jalgaon, Maharashtra, India', lat: 21.0077, lng: 75.5626 },

  // IRCS – Mumbai (Town Hall)
  { name: 'IRCS Bombay Red Cross Blood Centre', address: 'Town Hall Compound, Mumbai, Maharashtra, India', lat: 18.9433, lng: 72.8349 },

  // IRCS – Pandharpur, Maharashtra
  { name: 'IRCS Blood Centre Pandharpur', address: 'Pandharpur, Maharashtra, India', lat: 17.6597, lng: 75.3400 },

  // IRCS – Ratnagiri, Maharashtra
  { name: 'IRCS Blood Centre Ratnagiri', address: 'Ratnagiri, Maharashtra, India', lat: 16.9933, lng: 73.3008 },

  // IRCS – Sangli, Maharashtra
  { name: 'IRCS Blood Centre Sangli', address: 'Sangli, Maharashtra, India', lat: 16.8570, lng: 74.5638 },

  // IRCS – Solapur (Shriman Rambhai Shah)
  { name: 'IRCS Blood Centre Solapur', address: 'Solapur, Maharashtra, India', lat: 17.6599, lng: 75.9064 },

  // Athar Blood Bank – Solapur, Maharashtra
  { name: 'Athar Blood Bank', address: 'Solapur, Maharashtra, India', lat: 17.6581, lng: 75.9061 },

  { name: 'Prathama Blood Centre', address: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },

  // **Kokilaben Dhirubhai Ambani Hospital Blood Bank** – Mumbai, Maharashtra
  { name: 'Kokilaben Dhirubhai Ambani Hospital Blood Bank', address: 'Andheri West, Mumbai, Maharashtra, India', lat: 19.1200, lng: 72.8370 },

  // **Rotary Blood Bank** – Tughlakabad, New Delhi
  { name: 'Rotary Blood Bank', address: 'Tughlakabad Institutional Area, New Delhi, India', lat: 28.5200, lng: 77.2700 },

  // **NTR Trust Blood Centre** – Hyderabad, Telangana
  { name: 'NTR Trust Blood Centre', address: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },

  // **Relicord Blood Bank** – Navi Mumbai, Maharashtra
  { name: 'ReliCord Blood Bank', address: 'Navi Mumbai, Maharashtra, India', lat: 19.0330, lng: 73.0297 },

  // **Indian Red Cross Society - Vidyanagar Blood Centre** – Hyderabad, Telangana
  { name: 'IRCS Blood Centre Vidyanagar', address: 'Vidyanagar, Hyderabad, Telangana, India', lat: 17.4165, lng: 78.5587 },

  // **Indian Red Cross Society – Thanjavur Blood Bank** – Thanjavur, Tamil Nadu
  { name: 'IRCS Blood Centre Thanjavur', address: 'Medical College Road, Thanjavur, Tamil Nadu, India', lat: 10.7870, lng: 79.1390 },

  // **Indian Red Cross Society – Guntur Blood Centre** – Guntur, Andhra Pradesh
  { name: 'IRCS Blood Centre Guntur', address: 'Guntur, Andhra Pradesh, India', lat: 16.3067, lng: 80.4365 },

  // **Indian Red Cross Society – Ludhiana Blood Bank** – Ludhiana, Punjab
  { name: 'IRCS Blood Centre Ludhiana', address: 'Mall Road, Ludhiana, Punjab, India', lat: 30.9010, lng: 75.8573 },

  // **Indian Red Cross Society – Bhubaneswar Blood Centre** – Bhubaneswar, Odisha
  { name: 'IRCS Blood Centre Bhubaneswar', address: 'Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8245 },

  // **Indian Red Cross Society – Vizianagaram Blood Centre** – Andhra Pradesh
  { name: 'IRCS Blood Centre Vizianagaram', address: 'Vizianagaram, Andhra Pradesh, India', lat: 18.1064, lng: 83.3956 },

  // **Indian Red Cross Society – Kakinada Blood Bank** – Andhra Pradesh
  { name: 'IRCS Blood Centre Kakinada', address: 'Kakinada, Andhra Pradesh, India', lat: 16.9891, lng: 82.2475 },

  // **Indian Red Cross Society – Nellore Blood Centre** – Andhra Pradesh
  { name: 'IRCS Blood Centre Nellore', address: 'Nellore, Andhra Pradesh, India', lat: 14.4426, lng: 79.9865 },

  // **AIIMS Bhubaneswar Blood Bank** – Bhubaneswar, Odisha
  { name: 'AIIMS Bhubaneswar Blood Bank', address: 'AIIMS Bypass Road, Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8211 },

  // **Chiranjeevi Charitable Trust Blood Bank** – Hyderabad, Telangana
  { name: 'Chiranjeevi Charitable Trust Blood Bank', address: 'Jubilee Hills, Hyderabad, Telangana, India', lat: 17.4241, lng: 78.4123 },

  { name: 'Prathama Blood Centre', address: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Rotary Blood Bank', address: 'Tughlakabad Institutional Area, New Delhi, India', lat: 28.5200, lng: 77.2700 },
  { name: 'Rashtrotthana Parishat Blood Bank', address: 'Chamarajpet, Bengaluru, Karnataka, India', lat: 12.9784, lng: 77.5660 },
  { name: 'Athar Blood Bank', address: 'Near Samachar Chowk, Solapur, Maharashtra, India', lat: 17.6581, lng: 75.9061 },
  { name: 'IRCS Panchmahal Blood Centre', address: 'Godhra, Gujarat, India', lat: 22.7830, lng: 73.6190 },
  { name: 'IRCS Himatnagar Blood Centre', address: 'Himatnagar, Gujarat, India', lat: 23.5976, lng: 72.9631 },
  { name: 'IRCS Kalol Blood Centre', address: 'Kalol, Gujarat, India', lat: 23.3704, lng: 72.6463 },
  { name: 'IRCS Kapadwanj Blood Centre', address: 'Kapadwanj, Gujarat, India', lat: 22.5523, lng: 72.6947 },
  { name: 'IRCS Lunawada Blood Centre', address: 'Lunawada, Gujarat, India', lat: 23.0355, lng: 73.4092 },
  { name: 'IRCS Navsari Blood Centre', address: 'Navsari, Gujarat, India', lat: 20.9467, lng: 72.9526 },
  { name: 'IRCS Patan Blood Centre', address: 'Patan, Gujarat, India', lat: 23.8496, lng: 72.1276 },
  { name: 'IRCS Petlad Blood Centre', address: 'Petlad, Gujarat, India', lat: 22.4344, lng: 72.6426 },
  { name: 'IRCS Rajkot Blood Centre', address: 'Rajkot, Gujarat, India', lat: 22.3039, lng: 70.8022 },
  { name: 'IRCS Rajpipla Blood Centre', address: 'Rajpipla, Gujarat, India', lat: 21.7574, lng: 73.5214 },
  { name: 'IRCS Tarapur Blood Centre', address: 'Tarapur, Gujarat, India', lat: 21.5730, lng: 72.7616 },
  { name: 'IRCS Vyara Blood Centre', address: 'Vyara, Gujarat, India', lat: 21.1206, lng: 73.2715 },
  { name: 'IRCS Panipat Blood Centre', address: 'Panipat, Haryana, India', lat: 29.3919, lng: 76.9635 },
  { name: 'IRCS Bokaro Blood Centre', address: 'Bokaro Steel City, Jharkhand, India', lat: 23.6693, lng: 86.1511 },
  { name: 'IRCS Chatra Blood Centre', address: 'Chatra, Jharkhand, India', lat: 24.1934, lng: 84.8147 },
  { name: 'IRCS Ranchi Blood Centre', address: 'Ranchi, Jharkhand, India', lat: 23.3441, lng: 85.3096 },
  { name: 'Prathama Blood Centre Vasna, Ahmedabad', address: 'Vasna, Ahmedabad, Gujarat, India', lat: 23.0000, lng: 72.5600 },
  { name: 'Prathama Blood Centre Nikol, Ahmedabad', address: 'Nikol, Ahmedabad, Gujarat, India', lat: 23.0080, lng: 72.6010 },
  { name: 'Prathama Blood Centre Patna (CIMS Hospital)', address: 'Atlantis Hospital Campus, Rupaspur, Patna, Bihar, India', lat: 25.6200, lng: 85.1000 },
  { name: 'Prathama Blood Centre Saij (SIMS), Kalol', address: 'Saij, Kalol, Gandhinagar, Gujarat, India', lat: 23.3700, lng: 72.6500 },
  { name: 'IRCS National Headquarters Blood Centre', address: '1 Red Cross Road, New Delhi, Delhi, India', lat: 28.6270, lng: 77.2170 },
  { name: 'IRCS NHQ Storage Centre Linkage Delhi', address: 'Red Cross Road, New Delhi, Delhi, India', lat: 28.6268, lng: 77.2168 },
  { name: 'IRCS Ranga Reddy District Blood Centre', address: 'Gowlidoddi, Ranga Reddy, Telangana, India', lat: 17.3700, lng: 78.4500 },
  { name: 'IRCS Bombay Town Hall Blood Centre', address: 'Town Hall Compound, Mumbai, Maharashtra, India', lat: 18.9433, lng: 72.8349 },
  { name: 'IRCS Bhubaneswar Blood Centre (state branch)', address: 'Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8245 },
  { name: 'IRCS Thanjavur Blood Centre', address: 'Medical College Road, Thanjavur, Tamil Nadu, India', lat: 10.7870, lng: 79.1390 },
  { name: 'IRCS Ludhiana Blood Centre', address: 'Mall Road, Ludhiana, Punjab, India', lat: 30.9010, lng: 75.8573 },
  { name: 'IRCS Guntur Blood Centre', address: 'Guntur, Andhra Pradesh, India', lat: 16.3067, lng: 80.4365 },
  { name: 'FAA Medical College Hospital Blood Bank', address: 'Barpeta, Assam, India', lat: 26.3185, lng: 90.9420 },
  { name: 'Bongaigaon Civil Hospital Blood Bank', address: 'Bongaigaon, Assam, India', lat: 26.4711, lng: 90.5666 },
  { name: 'Lower Assam Hospital Blood Bank', address: 'Bongaigaon, Assam, India', lat: 26.4720, lng: 90.5650 },
  { name: 'Indian Red Cross Children Hospital Blood Bank', address: 'Silchar, Cachar, Assam, India', lat: 24.8333, lng: 92.7783 },
  { name: 'Silchar Medical College Hospital Blood Bank', address: 'Silchar, Cachar, Assam, India', lat: 24.8340, lng: 92.7790 },
  { name: 'Barak Blood Bank & Clinical Research', address: 'Silchar, Cachar, Assam, India', lat: 24.8335, lng: 92.7820 },
  { name: 'Mangaldoi Civil Hospital Blood Bank', address: 'Mangaldoi, Darrang, Assam, India', lat: 26.4300, lng: 92.0100 },
  { name: 'Dhemaji Civil Hospital Blood Bank', address: 'Dhemaji, Assam, India', lat: 27.4760, lng: 94.5770 },
  { name: 'Dhubri Civil Hospital Blood Bank', address: 'Dhubri, Assam, India', lat: 26.0470, lng: 89.9860 },
  { name: 'Jorhat Medical College Hospital Blood Bank', address: 'Jorhat, Assam, India', lat: 26.7460, lng: 94.1950 },
  { name: 'Lion\'s Club of Jorhat Blood Bank', address: 'Jorhat, Assam, India', lat: 26.7470, lng: 94.1910 },
  { name: 'K.K. Civil Hospital Blood Bank', address: 'Golaghat, Assam, India', lat: 26.5330, lng: 93.9640 },
  { name: 'Haji Abdul Majid Memorial Hospital Blood Bank', address: 'Hojai, Nagaon, Assam, India', lat: 26.7465, lng: 92.9962 },
  { name: 'Tezpur Medical College Hospital Blood Bank', address: 'Tezpur, Sonitpur, Assam, India', lat: 26.6490, lng: 92.7840 },
  { name: '155 Base Hospital Blood Bank', address: 'Tezpur, Sonitpur, Assam, India', lat: 26.6500, lng: 92.7870 },
  { name: 'Diphu Civil Hospital Blood Bank', address: 'Diphu, Karbi Anglong, Assam, India', lat: 25.8280, lng: 93.3670 },
  { name: 'Goalpara Civil Hospital Blood Bank', address: 'Goalpara, Assam, India', lat: 26.1870, lng: 90.6240 },
  { name: 'Haflong Civil Hospital Blood Bank', address: 'Haflong, Dima Hasao, Assam, India', lat: 25.0480, lng: 92.6550 },
  { name: 'North Lakhimpur Civil Hospital Blood Bank', address: 'North Lakhimpur, Assam, India', lat: 27.2360, lng: 94.1130 },
  { name: 'Morigaon Civil Hospital Blood Bank', address: 'Morigaon, Assam, India', lat: 26.4020, lng: 92.4630 },
  { name: 'Sivasagar Civil Hospital Blood Bank', address: 'Sivasagar, Assam, India', lat: 26.9750, lng: 94.6370 },
  { name: 'Tezpur 155 Base Hospital Blood Bank', address: 'Tezpur, Sonitpur, Assam, India', lat: 26.6520, lng: 92.7850 },
  { name: 'Kanaklata Civil Hospital Blood Bank', address: 'Tezpur, Sonitpur, Assam, India', lat: 26.6460, lng: 92.7880 },
  { name: 'L.G.B. Civil Hospital Blood Bank', address: 'Tinsukia, Assam, India', lat: 27.4920, lng: 95.3590 },
  { name: 'Tinsukia Civil Hospital Blood Bank', address: 'Tinsukia, Assam, India', lat: 27.4925, lng: 95.3588 },
  { name: 'B.P. Civil Hospital Blood Bank', address: 'Nagaon, Assam, India', lat: 26.3530, lng: 92.6880 },
  { name: 'K.K. Civil Hospital Blood Bank', address: 'Golaghat, Assam, India', lat: 26.5330, lng: 93.9640 },
  { name: 'Catholic Hospital Borgang Blood Bank', address: 'Borgang, Sonitpur, Assam, India', lat: 26.8000, lng: 92.6700 },
  { name: 'Dr. Ravi Boro Civil Hospital Blood Bank', address: 'Baksa, Assam, India', lat: 26.5660, lng: 91.5450 },
  { name: 'SMK Civil Hospital Blood Bank', address: 'Nalbari, Assam, India', lat: 26.4350, lng: 91.4460 },
  { name: 'ESIC Medical College & Hospital Blood Bank', address: 'Faridabad, Haryana, India', lat: 28.4139, lng: 77.3178 },
  { name: 'Venkateshwar Hospital Blood Centre', address: 'Vasant Kunj, New Delhi, India', lat: 28.5276, lng: 77.2119 },
  { name: 'Jai Prakash Narayan Apex Trauma Centre Blood Bank', address: 'AIIMS, New Delhi, Delhi, India', lat: 28.5678, lng: 77.2100 },
  { name: 'Jaipur Golden Hospital Blood Bank', address: 'Rohini Sector-3, New Delhi, Delhi, India', lat: 28.7223, lng: 77.1355 },
  { name: 'Kalra Hospital & Shri Ram Cardiothoracic & Neuro Sciences Centre Blood Bank', address: 'Kirti Nagar, New Delhi, Delhi, India', lat: 28.6525, lng: 77.1500 },
  { name: 'St. Stephen’s Hospital Blood Bank', address: 'Tis Hazari, New Delhi, Delhi, India', lat: 28.6739, lng: 77.2171 },
  { name: 'Moolchand Medcity Hospital Blood Bank', address: 'Lajpat Nagar, New Delhi, Delhi, India', lat: 28.5642, lng: 77.2551 },
  { name: 'Rashtriya Swasthya Sewa Foundation Blood Bank', address: 'Pusa Road, New Delhi, Delhi, India', lat: 28.6400, lng: 77.2070 },
  { name: 'Max Super Speciality Hospital Blood Bank (Shalimar Bagh)', address: 'Shalimar Bagh, New Delhi, Delhi, India', lat: 28.6889, lng: 77.1590 },
  { name: 'Fortis Hospital Blood Bank (Dwarka)', address: 'Dwarka, New Delhi, Delhi, India', lat: 28.5860, lng: 77.0278 },
  { name: 'Bhagat Chandra Hospital Blood Bank', address: 'Palam, New Delhi, Delhi, India', lat: 28.5685, lng: 77.0527 },
  { name: 'Military Hospital Blood Bank', address: 'Hisar, Haryana, India', lat: 29.1517, lng: 75.7217 },
  { name: 'Lucknow IRCS State Branch Blood Centre', address: 'Lucknow, Uttar Pradesh, India', lat: 26.8467, lng: 80.9462 },
  { name: 'Dehradun Red Cross Society Blood Centre', address: 'Sahastradhara Road, Dehradun, Uttarakhand, India', lat: 30.3165, lng: 78.0322 },
  { name: 'S.N. Medical College Blood Bank', address: 'Agra, Uttar Pradesh, India', lat: 27.1767, lng: 78.0081 },
  { name: 'District Hospital Blood Bank', address: 'Agra, Uttar Pradesh, India', lat: 27.1767, lng: 78.0081 },
  { name: 'Samarpan Blood Bank', address: 'Delhi Gate, Agra, Uttar Pradesh, India', lat: 27.1805, lng: 78.0158 },
  { name: 'Life Line Charitable Blood Bank', address: 'Agra, Uttar Pradesh, India', lat: 27.1767, lng: 78.0081 },
  { name: 'Jai Prakash Narayan Apex Trauma Centre Blood Bank', address: 'AIIMS, New Delhi, Delhi, India', lat: 28.5678, lng: 77.2100 },
  { name: 'Lions Blood Bank', address: 'New Delhi, Delhi, India', lat: 28.6448, lng: 77.2160 },
  { name: 'Pitampura Blood Bank', address: 'Pitampura, New Delhi, Delhi, India', lat: 28.7046, lng: 77.1375 },
  { name: 'Aakash Healthcare Blood Centre', address: 'Delhi, Delhi, India', lat: 28.6265, lng: 77.2172 },
  { name: 'Dr. B.L. Kapoor Memorial Hospital Blood Bank', address: 'Old Sabzi Mandi, Delhi, India', lat: 28.6705, lng: 77.2183 },
  { name: 'Sir Ganga Ram Hospital Blood Bank', address: 'New Delhi, Delhi, India', lat: 28.6342, lng: 77.1573 },
  { name: 'Breast Candy Hospital Trust Blood Centre', address: 'Mumbai, Maharashtra, India', lat: 19.0176, lng: 72.8266 },
  { name: 'Blood Bank - Fortis Hospital, Noida', address: 'Noida, Uttar Pradesh, India', lat: 28.5355, lng: 77.3910 },
  { name: 'Blood Bank - Escorts Heart Institute', address: 'New Delhi, Delhi, India', lat: 28.5730, lng: 77.1990 },
  { name: 'Blood Bank - Medanta Medicity', address: 'Gurgaon, Haryana, India', lat: 28.4595, lng: 77.0266 },
  { name: 'Blood Bank - Fortis Mediclinic', address: 'Gurgaon, Haryana, India', lat: 28.4904, lng: 77.0715 },
  { name: 'Blood Bank, Jaypee Hospital', address: 'Noida, Uttar Pradesh, India', lat: 28.5679, lng: 77.3279 },
  { name: 'Nayati Blood Bank', address: 'Mathura, Uttar Pradesh, India', lat: 27.4924, lng: 77.6737 },
  { name: 'Blood Bank, Max Hospital Vaishali', address: 'Ghaziabad, Uttar Pradesh, India', lat: 28.6692, lng: 77.4565 },
  { name: 'Awadh Charitable Blood Bank', address: 'Lucknow, Uttar Pradesh, India', lat: 26.8467, lng: 80.9462 },
  { name: 'Blood Bank, Max Hospital Dehradun', address: 'Dehradun, Uttarakhand, India', lat: 30.3165, lng: 78.0322 },
  { name: 'Army Hospital Blood Bank', address: 'Hisar, Haryana, India', lat: 29.1517, lng: 75.7217 },
  { name: 'Blood Bank, Christian Hospital Mungeli', address: 'Mungeli, Chhattisgarh, India', lat: 22.0650, lng: 81.3647 },
  { name: 'Blood Bank, Evangelical Hospital Tilda', address: 'Tilda, Chhattisgarh, India', lat: 21.3456, lng: 81.6826 },
  { name: 'Blood Bank, Christian Hospital Baitalpur', address: 'Baitalpur, Chhattisgarh, India', lat: 21.9090, lng: 81.9577 },
  { name: 'Blood Bank, Christian Hospital Bilaspur', address: 'Bilaspur, Chhattisgarh, India', lat: 22.0799, lng: 82.1391 },
  { name: 'Blood Bank, Gandhi Medical College', address: 'Bhopal, Madhya Pradesh, India', lat: 23.2599, lng: 77.4126 },
  { name: 'Blood Bank, AIIMS Bhopal', address: 'Bhopal, Madhya Pradesh, India', lat: 23.1990, lng: 77.4426 },
  { name: 'Blood Bank, Dr. Hegdewar Hospital', address: 'Nagpur, Maharashtra, India', lat: 21.1458, lng: 79.0882 },
  { name: 'Blood Bank, Jehangir Hospital', address: 'Pune, Maharashtra, India', lat: 18.5168, lng: 73.8563 },
  { name: 'Blood Centre, Geetanjali Medical College', address: 'Udaipur, Rajasthan, India', lat: 24.5854, lng: 73.7125 },
  { name: 'Blood Bank, Swasthya Kalyan Jaipur', address: 'Jaipur, Rajasthan, India', lat: 26.9124, lng: 75.7873 },
  { name: 'Blood Centre, Pushpa Mission Hospital', address: 'Ujjain, Madhya Pradesh, India', lat: 23.1793, lng: 75.7849 },
  { name: 'Blood Bank, Sri Balaji Action Medical', address: 'Delhi, Delhi, India', lat: 28.5575, lng: 77.2405 },
  { name: 'Blood Bank, APSIMS Thrissur', address: 'Thrissur, Kerala, India', lat: 10.5276, lng: 76.2144 },
  { name: 'Blood Bank, Human Care Trust', address: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Blood Centre, Aakash Healthcare', address: 'Delhi, Delhi, India', lat: 28.6265, lng: 77.2172 },
  { name: 'Blood Centre, Rainbow Blood Bank', address: 'Nagpur, Maharashtra, India', lat: 21.1458, lng: 79.0882 },
  { name: 'Blood Centre, Kusum Dhirajlal Hospital', address: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Blood Centre, ESIC Medical College', address: 'Faridabad, Haryana, India', lat: 28.4139, lng: 77.3178 },
  { name: 'Blood Bank, Friends2Support HQ', address: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },
  { name: 'Blood Bank, Seva Bharati', address: 'New Delhi, Delhi, India', lat: 28.6139, lng: 77.2090 },

];

// Custom icon for blood donation centers using Cloudflare URL
const bloodIcon = new L.Icon({
  //iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconUrl: '/assets/blood-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// GeoSearch component for Leaflet map
function GeoSearch({ onSearch }) {
  const map = useMap();
  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);

  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      autoComplete: true,
      autoCompleteDelay: 250,
      marker: { icon: bloodIcon },
      onResultSelect: (result) => {
        const { x, y } = result.raw;
        map.setView([y, x], 10);
        onSearch({ lat: y, lng: x, label: result.raw.label });
      },
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, provider, onSearch]);

  return null;
}

function DonationCenters() {
  const [searchLocation, setSearchLocation] = useState(null);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default to India center
  const [selectedCenter, setSelectedCenter] = useState(null);
  const selectedCenterRef = useRef(null);

  // Debug icon loading
  useEffect(() => {
    const onlineImg = new Image();
    onlineImg.src = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    onlineImg.onload = () => console.log('Online marker icon loaded successfully');
    onlineImg.onerror = () => console.error('Failed to load online marker icon at https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
  }, []);

  return (
    <Box className="container">
      <Paper elevation={3} className="custom-card">
        <Box className="heading-container">
          <Typography variant="h4" color="#d32f2f" gutterBottom data-aos="fade-down">
            Find Blood Donation Centers
          </Typography>
        </Box>
        <MapContainer center={center} zoom={5} style={{ height: '500px', marginTop: '20px', borderRadius: '8px', border: '2px solid #d32f2f',overflow: 'hidden', }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoSearch onSearch={setSearchLocation} />
          {bloodDonationCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.lat, center.lng]}
              icon={bloodIcon}
              eventHandlers={{
                click: () => {
                  setSelectedCenter(center);
                  setTimeout(() => {
                    if (selectedCenterRef.current) {
                      selectedCenterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }
              }}
            >
              <Popup>
                <Typography variant="body1"><strong>{center.name}</strong></Typography>
                <Typography variant="body2">{center.address}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {selectedCenter && (
          <Card className="custom-card-secondary" 
          style={{ marginTop: '20px' }} 
          ref={selectedCenterRef}>
            <Typography variant="h6" color="#d32f2f">Selected Blood Donation Center</Typography>
            <Typography variant="body1"><strong>Name:</strong> {selectedCenter.name}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {selectedCenter.address}</Typography>
            <Typography variant="body1"><strong>Coordinates:</strong> {selectedCenter.lat}, {selectedCenter.lng}</Typography>
          </Card>
        )}
      </Paper>
    </Box>
  );
}

export default DonationCenters;