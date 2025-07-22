import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Box, Typography, Paper } from '@mui/material';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import '../index.css';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Dummy donor data
const dummyDonors = [
  { id: '1', name: 'Amit Sharma', bloodGroup: 'O+', phone: '9876543210', address: 'Delhi, Delhi, India', lastDonationDate: new Date('2025-06-01') },
  { id: '2', name: 'Priya Singh', bloodGroup: 'AB-', phone: '9123456789', address: 'Mumbai, Maharashtra, India', lastDonationDate: new Date('2025-07-10') },
  { id: '3', name: 'Rahul Gupta', bloodGroup: 'B+', phone: '9988776655', address: 'Bangalore, Bengaluru Urban, Karnataka, India', lastDonationDate: new Date('2025-05-15') },
  { id: '4', name: 'Sneha Patel', bloodGroup: 'A-', phone: '9871234567', address: 'Ahmedabad, Ahmedabad, Gujarat, India', lastDonationDate: new Date('2025-04-20') },
  { id: '5', name: 'Vikram Rao', bloodGroup: 'O-', phone: '9765432109', address: 'Chennai, Chennai, Tamil Nadu, India', lastDonationDate: new Date('2025-06-25') },
  { id: '6', name: 'Anjali Verma', bloodGroup: 'A+', phone: '9654321098', address: 'Kolkata, Kolkata, West Bengal, India', lastDonationDate: null },
  { id: '7', name: 'Ravi Kumar', bloodGroup: 'B-', phone: '9543210987', address: 'Hyderabad, Hyderabad, Telangana, India', lastDonationDate: new Date('2025-07-05') },
  { id: '8', name: 'Meena Desai', bloodGroup: 'AB+', phone: '9432109876', address: 'Pune, Pune, Maharashtra, India', lastDonationDate: new Date('2025-06-15') },
  { id: '9', name: 'Suresh Nair', bloodGroup: 'O+', phone: '9321098765', address: 'Jaipur, Jaipur, Rajasthan, India', lastDonationDate: new Date('2025-05-30') },
  { id: '10', name: 'Kavita Joshi', bloodGroup: 'A-', phone: '9210987654', address: 'Lucknow, Lucknow, Uttar Pradesh, India', lastDonationDate: new Date('2025-07-12') },
  { id: '11', name: 'Arjun Mehta', bloodGroup: 'B+', phone: '9109876543', address: 'Chandigarh, Chandigarh, Punjab, India', lastDonationDate: new Date('2025-06-10') },
  { id: '12', name: 'Deepa Reddy', bloodGroup: 'O-', phone: '9098765432', address: 'Visakhapatnam, Visakhapatnam, Andhra Pradesh, India', lastDonationDate: new Date('2025-05-25') },
  { id: '13', name: 'Rohan Das', bloodGroup: 'AB-', phone: '9987654321', address: 'Patna, Patna, Bihar, India', lastDonationDate: new Date('2025-07-01') },
  { id: '14', name: 'Nisha Yadav', bloodGroup: 'A+', phone: '9876543211', address: 'Bhopal, Bhopal, Madhya Pradesh, India', lastDonationDate: null },
  { id: '15', name: 'Kiran Thakur', bloodGroup: 'B-', phone: '9765432108', address: 'Guwahati, Kamrup Metropolitan, Assam, India', lastDonationDate: new Date('2025-06-20') },
  { id: '16', name: 'Vivek Menon', bloodGroup: 'O+', phone: '9654321097', address: 'Thiruvananthapuram, Thiruvananthapuram, Kerala, India', lastDonationDate: new Date('2025-07-08') },
  { id: '17', name: 'Pooja Shah', bloodGroup: 'AB+', phone: '9543210986', address: 'Surat, Surat, Gujarat, India', lastDonationDate: new Date('2025-06-05') },
  { id: '18', name: 'Sanjay Bose', bloodGroup: 'A-', phone: '9432109875', address: 'Ranchi, Ranchi, Jharkhand, India', lastDonationDate: new Date('2025-05-20') },
  { id: '19', name: 'Lata Iyer', bloodGroup: 'B+', phone: '9321098764', address: 'Nagpur, Nagpur, Maharashtra, India', lastDonationDate: new Date('2025-07-15') },
  { id: '20', name: 'Mohan Pillai', bloodGroup: 'O-', phone: '9210987653', address: 'Dehradun, Dehradun, Uttarakhand, India', lastDonationDate: new Date('2025-06-12') },
  { id: '21', name: 'Tanvi Kapoor', bloodGroup: 'A+', phone: '9001122334', address: 'Amritsar, Amritsar, Punjab, India', lastDonationDate: new Date('2025-06-05') },
  { id: '22', name: 'Raghav Malhotra', bloodGroup: 'O-', phone: '9002233445', address: 'Udaipur, Udaipur, Rajasthan, India', lastDonationDate: new Date('2025-06-30') },
  { id: '23', name: 'Neha Dutta', bloodGroup: 'B+', phone: '9003344556', address: 'Dhanbad, Dhanbad, Jharkhand, India', lastDonationDate: new Date('2025-05-18') },
  { id: '24', name: 'Ashwin Iyer', bloodGroup: 'AB-', phone: '9004455667', address: 'Hubli, Dharwad, Karnataka, India', lastDonationDate: null },
  { id: '25', name: 'Shruti Banerjee', bloodGroup: 'A-', phone: '9005566778', address: 'Siliguri, Darjeeling, West Bengal, India', lastDonationDate: new Date('2025-07-12') },
  { id: '26', name: 'Yash Rawat', bloodGroup: 'O+', phone: '9006677889', address: 'Aligarh, Aligarh, Uttar Pradesh, India', lastDonationDate: new Date('2025-06-15') },
  { id: '27', name: 'Divya Nair', bloodGroup: 'B-', phone: '9007788990', address: 'Thrissur, Thrissur, Kerala, India', lastDonationDate: new Date('2025-07-01') },
  { id: '28', name: 'Kunal Joshi', bloodGroup: 'A+', phone: '9008899001', address: 'Rajkot, Rajkot, Gujarat, India', lastDonationDate: new Date('2025-05-28') },
  { id: '29', name: 'Preeti Rane', bloodGroup: 'AB+', phone: '9009900112', address: 'Kolhapur, Kolhapur, Maharashtra, India', lastDonationDate: null },
  { id: '30', name: 'Aditya Deshmukh', bloodGroup: 'O-', phone: '9010011223', address: 'Akola, Akola, Maharashtra, India', lastDonationDate: new Date('2025-06-22') },
  { id: '31', name: 'Sana Rizvi', bloodGroup: 'B+', phone: '9011122334', address: 'Gorakhpur, Gorakhpur, Uttar Pradesh, India', lastDonationDate: new Date('2025-07-05') },
  { id: '32', name: 'Harshit Sinha', bloodGroup: 'A-', phone: '9012233445', address: 'Bilaspur, Bilaspur, Chhattisgarh, India', lastDonationDate: new Date('2025-06-02') },
  { id: '33', name: 'Megha Tripathi', bloodGroup: 'AB-', phone: '9013344556', address: 'Jhansi, Jhansi, Uttar Pradesh, India', lastDonationDate: null },
  { id: '34', name: 'Varun Khurana', bloodGroup: 'O+', phone: '9014455667', address: 'Solan, Solan, Himachal Pradesh, India', lastDonationDate: new Date('2025-06-11') },
  { id: '35', name: 'Simran Kaur', bloodGroup: 'B-', phone: '9015566778', address: 'Jammu, Jammu, Jammu and Kashmir, India', lastDonationDate: new Date('2025-07-09') },
  { id: '36', name: 'Farhan Shaikh', bloodGroup: 'A+', phone: '9016677889', address: 'Malegaon, Nashik, Maharashtra, India', lastDonationDate: new Date('2025-06-19') },
  { id: '37', name: 'Ishita Pandey', bloodGroup: 'AB+', phone: '9017788990', address: 'Faizabad, Ayodhya, Uttar Pradesh, India', lastDonationDate: null },
  { id: '38', name: 'Aarav Sen', bloodGroup: 'O-', phone: '9018899001', address: 'Rewa, Rewa, Madhya Pradesh, India', lastDonationDate: new Date('2025-05-21') },
  { id: '39', name: 'Ritika Sharma', bloodGroup: 'B+', phone: '9019900112', address: 'Panipat, Panipat, Haryana, India', lastDonationDate: new Date('2025-06-08') },
  { id: '40', name: 'Naveen Chauhan', bloodGroup: 'A-', phone: '9020011223', address: 'Tirupati, Tirupati, Andhra Pradesh, India', lastDonationDate: new Date('2025-06-29') },
  { id: '1', name: 'Amit Sharma', bloodGroup: 'O+', phone: '9876543210', address: 'New Delhi, Delhi, India', lastDonationDate: new Date('2025-06-01') },
  { id: '2', name: 'Priya Singh', bloodGroup: 'AB-', phone: '9123456789', address: 'Mumbai, Maharashtra, India', lastDonationDate: new Date('2025-07-10') },
  { id: '3', name: 'Rahul Gupta', bloodGroup: 'B+', phone: '9988776655', address: 'Bengaluru, Karnataka, India', lastDonationDate: new Date('2025-05-15') },
  { id: '4', name: 'Sneha Patel', bloodGroup: 'A-', phone: '9871234567', address: 'Ahmedabad, Gujarat, India', lastDonationDate: new Date('2025-04-20') },
  { id: '5', name: 'Vikram Rao', bloodGroup: 'O-', phone: '9765432109', address: 'Chennai, Tamil Nadu, India', lastDonationDate: new Date('2025-06-25') },
  { id: '6', name: 'Anjali Verma', bloodGroup: 'A+', phone: '9654321098', address: 'Kolkata, West Bengal, India', lastDonationDate: null },
  { id: '7', name: 'Ravi Kumar', bloodGroup: 'B-', phone: '9543210987', address: 'Hyderabad, Telangana, India', lastDonationDate: new Date('2025-07-05') },
  { id: '8', name: 'Meena Desai', bloodGroup: 'AB+', phone: '9432109876', address: 'Pune, Maharashtra, India', lastDonationDate: new Date('2025-06-15') },
  { id: '9', name: 'Suresh Nair', bloodGroup: 'O+', phone: '9321098765', address: 'Jaipur, Rajasthan, India', lastDonationDate: new Date('2025-05-30') },
  { id: '10', name: 'Kavita Joshi', bloodGroup: 'A-', phone: '9210987654', address: 'Lucknow, Uttar Pradesh, India', lastDonationDate: new Date('2025-07-12') },
  { id: '11', name: 'Arjun Mehta', bloodGroup: 'B+', phone: '9109876543', address: 'Chandigarh, Punjab, India', lastDonationDate: new Date('2025-06-10') },
  { id: '12', name: 'Deepa Reddy', bloodGroup: 'O-', phone: '9098765432', address: 'Visakhapatnam, Andhra Pradesh, India', lastDonationDate: new Date('2025-05-25') },
  { id: '13', name: 'Rohan Das', bloodGroup: 'AB-', phone: '9987654321', address: 'Patna, Bihar, India', lastDonationDate: new Date('2025-07-01') },
  { id: '14', name: 'Nisha Yadav', bloodGroup: 'A+', phone: '9876543211', address: 'Bhopal, Madhya Pradesh, India', lastDonationDate: null },
  { id: '15', name: 'Kiran Thakur', bloodGroup: 'B-', phone: '9765432108', address: 'Guwahati, Assam, India', lastDonationDate: new Date('2025-06-20') },
  { id: '16', name: 'Vivek Menon', bloodGroup: 'O+', phone: '9654321097', address: 'Thiruvananthapuram, Kerala, India', lastDonationDate: new Date('2025-07-08') },
  { id: '17', name: 'Pooja Shah', bloodGroup: 'AB+', phone: '9543210986', address: 'Surat, Gujarat, India', lastDonationDate: new Date('2025-06-05') },
  { id: '18', name: 'Sanjay Bose', bloodGroup: 'A-', phone: '9432109875', address: 'Ranchi, Jharkhand, India', lastDonationDate: new Date('2025-05-20') },
  { id: '19', name: 'Lata Iyer', bloodGroup: 'B+', phone: '9321098764', address: 'Nagpur, Maharashtra, India', lastDonationDate: new Date('2025-07-15') },
  { id: '20', name: 'Mohan Pillai', bloodGroup: 'O-', phone: '9210987653', address: 'Dehradun, Uttarakhand, India', lastDonationDate: new Date('2025-06-12') },
  { id: '21', name: 'Alok Jain', bloodGroup: 'A+', phone: '9000000001', address: 'Noida, Uttar Pradesh, India', lastDonationDate: new Date('2025-05-18') },
  { id: '22', name: 'Tina Kapoor', bloodGroup: 'B-', phone: '9000000002', address: 'Ghaziabad, Uttar Pradesh, India', lastDonationDate: new Date('2025-06-10') },
  { id: '23', name: 'Raj Malhotra', bloodGroup: 'AB+', phone: '9000000003', address: 'Amritsar, Punjab, India', lastDonationDate: null },
  { id: '24', name: 'Anita Nair', bloodGroup: 'O-', phone: '9000000004', address: 'Kozhikode, Kerala, India', lastDonationDate: new Date('2025-05-01') },
  { id: '25', name: 'Sameer Sinha', bloodGroup: 'B+', phone: '9000000005', address: 'Jamshedpur, Jharkhand, India', lastDonationDate: new Date('2025-07-14') },
  { id: '26', name: 'Divya Agarwal', bloodGroup: 'A-', phone: '9000000006', address: 'Vadodara, Gujarat, India', lastDonationDate: null },
  { id: '27', name: 'Imran Qureshi', bloodGroup: 'O+', phone: '9000000007', address: 'Srinagar, Jammu and Kashmir, India', lastDonationDate: new Date('2025-06-18') },
  { id: '28', name: 'Neha Pandey', bloodGroup: 'AB-', phone: '9000000008', address: 'Raipur, Chhattisgarh, India', lastDonationDate: new Date('2025-05-10') },
  { id: '29', name: 'Arvind Rao', bloodGroup: 'A+', phone: '9000000009', address: 'Agra, Uttar Pradesh, India', lastDonationDate: new Date('2025-06-22') },
  { id: '30', name: 'Sunita Deshmukh', bloodGroup: 'B-', phone: '9000000010', address: 'Nashik, Maharashtra, India', lastDonationDate: new Date('2025-07-02') },
  { id: '31', name: 'Firoz Khan', bloodGroup: 'O-', phone: '9000000011', address: 'Aligarh, Uttar Pradesh, India', lastDonationDate: null },
  { id: '32', name: 'Bhavya Mehta', bloodGroup: 'AB+', phone: '9000000012', address: 'Udaipur, Rajasthan, India', lastDonationDate: new Date('2025-06-05') },
  { id: '33', name: 'Ishita Roy', bloodGroup: 'A-', phone: '9000000013', address: 'Howrah, West Bengal, India', lastDonationDate: new Date('2025-05-25') },
  { id: '34', name: 'Vikas Yadav', bloodGroup: 'B+', phone: '9000000014', address: 'Gwalior, Madhya Pradesh, India', lastDonationDate: new Date('2025-06-08') },
  { id: '35', name: 'Zoya Khan', bloodGroup: 'O+', phone: '9000000015', address: 'Kanpur, Uttar Pradesh, India', lastDonationDate: new Date('2025-07-11') },
  { id: '36', name: 'Mahesh Patil', bloodGroup: 'A+', phone: '9000000016', address: 'Aurangabad, Maharashtra, India', lastDonationDate: null },
  { id: '37', name: 'Neelima Das', bloodGroup: 'AB-', phone: '9000000017', address: 'Shillong, Meghalaya, India', lastDonationDate: new Date('2025-06-13') },
  { id: '38', name: 'Rajeev Prasad', bloodGroup: 'B-', phone: '9000000018', address: 'Bilaspur, Chhattisgarh, India', lastDonationDate: new Date('2025-05-15') },
  { id: '39', name: 'Trisha Sen', bloodGroup: 'O-', phone: '9000000019', address: 'Durgapur, West Bengal, India', lastDonationDate: new Date('2025-06-20') },
  { id: '40', name: 'Nitin Bhat', bloodGroup: 'A-', phone: '9000000020', address: 'Shimla, Himachal Pradesh, India', lastDonationDate: new Date('2025-07-09') },
  { id: '41', name: 'Aditya Jha', bloodGroup: 'B+', phone: '9000000021', address: 'Darbhanga, Bihar, India', lastDonationDate: new Date('2025-07-13') },
  { id: '42', name: 'Meher Khan', bloodGroup: 'AB+', phone: '9000000022', address: 'Malegaon, Maharashtra, India', lastDonationDate: new Date('2025-06-03') },
  { id: '43', name: 'Yashika Sharma', bloodGroup: 'O+', phone: '9000000023', address: 'Panipat, Haryana, India', lastDonationDate: new Date('2025-06-30') },
  { id: '44', name: 'Siddharth Rai', bloodGroup: 'A-', phone: '9000000024', address: 'Mathura, Uttar Pradesh, India', lastDonationDate: null },
  { id: '45', name: 'Avantika Chauhan', bloodGroup: 'B-', phone: '9000000025', address: 'Ajmer, Rajasthan, India', lastDonationDate: new Date('2025-06-28') },
  { id: '46', name: 'Farhan Siddiqui', bloodGroup: 'AB+', phone: '9000000026', address: 'Bareilly, Uttar Pradesh, India', lastDonationDate: new Date('2025-06-17') },
  { id: '47', name: 'Namrata Joshi', bloodGroup: 'A+', phone: '9000000027', address: 'Jodhpur, Rajasthan, India', lastDonationDate: new Date('2025-06-06') },
  { id: '48', name: 'Pankaj Kumar', bloodGroup: 'O-', phone: '9000000028', address: 'Silchar, Assam, India', lastDonationDate: new Date('2025-06-24') },
  { id: '49', name: 'Komal Jain', bloodGroup: 'B+', phone: '9000000029', address: 'Pondicherry, Puducherry, India', lastDonationDate: new Date('2025-07-01') },
  { id: '50', name: 'Deepak Rana', bloodGroup: 'A-', phone: '9000000030', address: 'Itanagar, Arunachal Pradesh, India', lastDonationDate: new Date('2025-07-18') },
];


const LocationSearchInput = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const provider = new OpenStreetMapProvider({
  params: {
    countrycodes: 'in', // restrict to India
    'accept-language': 'en', // prefer English response
  },
});


  const handleChange = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 2) {
      const res = await provider.search({ query });
      setResults(res);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (result) => {
    setSearch(result.label);
    setResults([]);
    onSelect(result.label);
  };

  return (
    <div className="location-search">
      <input
        type="text"
        className="location-input"
        placeholder="Search city..."
        value={search}
        onChange={handleChange}
      />
      {results.length > 0 && (
        <ul className="results-dropdown">
          {results.map((res, i) => (
            <li key={i} onClick={() => handleSelect(res)}>
              {res.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchDonor = () => {
  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);
  const [selectedCity, setSelectedCity] = useState('');
  const filteredDonors = dummyDonors.filter(donor =>
    selectedCity && donor.address.toLowerCase().includes(selectedCity.toLowerCase())
  );

  return (
    <Box className="container" >
      <Paper elevation={3} className="custom-card">
        <Typography variant="h4" color="#d32f2f" align="center" gutterBottom data-aos="fade-up">
          Search for Blood Donors
        </Typography>

        <LocationSearchInput onSelect={setSelectedCity} data-aos="fade-up"/>

        {selectedCity && (
          <Typography variant="h6" align="center" style={{ marginTop: '1rem', color: '#444' }} data-aos="fade-right">
            Showing results for: <strong>{selectedCity}</strong>
          </Typography>
        )}

        <div className="donor-results">
          {filteredDonors.length > 0 ? (
            filteredDonors.map(donor => (
              <Card key={donor.id} className="donor-card">
                <Typography variant="h6" color="#d32f2f">{donor.name}</Typography>
                <Typography variant="body1"><strong>Blood Group:</strong> {donor.bloodGroup}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {donor.phone}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {donor.address}</Typography>
                <Typography variant="body1">
                  <strong>Last Donation:</strong> {donor.lastDonationDate.toDateString()}
                </Typography>
              </Card>
            ))
          ) : selectedCity ? (
            <Typography align="center" style={{ marginTop: '1rem' }}>No donors found for this location.</Typography>
          ) : null}
        </div>
      </Paper>
    </Box>
  );
};

export default SearchDonor;
