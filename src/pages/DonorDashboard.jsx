import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AOS from "aos";
import "aos/dist/aos.css";

function DonorDashboard() {
  const [user, setUser] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [username, setUsername] = useState('Donor');
  const [bloodGroup, setBloodGroup] = useState('N/A');

  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.name || 'Donor');
            setBloodGroup(userData.bloodGroup || 'N/A');
          }

          const historyRef = collection(db, 'users', currentUser.uid, 'donationHistory');
          const historySnap = await getDocs(historyRef);
          const history = historySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const sortedHistory = history.sort((a, b) => new Date(a.date) - new Date(b.date));
          setDonationHistory(sortedHistory);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      } else {
        setUser(null);
        setDonationHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (isoString) => {
    try {
      return new Date(isoString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  if (!user) {
    return (
      <Box className="container">
        <Paper elevation={3} className="custom-card">
          <Typography variant="h4" color="#d32f2f" data-aos="fade-down">Donor Dashboard</Typography>
          <Typography>Please log in to view your dashboard.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="container" >
      <Paper elevation={3} className="custom-card">
        <Box display="flex" alignItems="center" gap={2} mb={3} data-aos="fade-down">
          <Avatar
            alt="Donor Avatar"
            //src="https://cdn-icons-png.flaticon.com/512/6676/6676022.png"
            src="/assets/logo.jpg" // Local image for donor avatar
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h5" color="#d32f2f">Welcome, {username}</Typography>
            <Typography variant="subtitle1">Blood Group: {bloodGroup}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom data-aos="fade-up">Donation History</Typography>
          <DataTable
            value={donationHistory}
            paginator
            rows={5}
            paginatorTemplate="PrevPageLink NextPageLink"
            emptyMessage="No donations found."
            tableStyle={{ minWidth: '50rem' }}
            data-aos="fade-up"
          >
            <Column field="date" header="Date" body={(rowData) => formatDate(rowData.date)} />
            <Column field="bloodGroup" header="Blood Group" />
            <Column field="location" header="Location" />
          </DataTable>
        </Box>
      </Paper>
    </Box>
  );
}

export default DonorDashboard;
