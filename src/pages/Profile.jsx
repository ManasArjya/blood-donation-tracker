import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Box, Typography, Paper } from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AOS from "aos";
import "aos/dist/aos.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    address: '',
    dob: null,
  });
  const [donorCard, setDonorCard] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [newDonation, setNewDonation] = useState({
    date: null,
    bloodGroup: '',
    location: '',
  });

  const bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
  ];

  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const profileRef = doc(db, 'users', currentUser.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const data = profileSnap.data();
            setProfile({
              name: data.name || '',
              bloodGroup: data.bloodGroup || '',
              phone: data.phone || '',
              address: data.address || '',
              dob: data.dob ? new Date(data.dob) : null,
            });
            setNewDonation((prev) => ({ ...prev, bloodGroup: data.bloodGroup || '' }));
          } else {
            setIsEditing(true);
          }
          const cardRef = doc(db, 'users', currentUser.uid, 'donorCards', 'primary');
          const cardSnap = await getDoc(cardRef);
          if (cardSnap.exists()) {
            setDonorCard(cardSnap.data());
          }
          const historyRef = collection(db, 'users', currentUser.uid, 'donationHistory');
          const historySnap = await getDocs(historyRef);
          const history = historySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setDonationHistory(history);
        } catch (err) {
          setError('Failed to load profile data: ' + err.message);
        }
      } else {
        setUser(null);
        setProfile({ name: '', bloodGroup: '', phone: '', address: '', dob: null });
        setDonorCard(null);
        setDonationHistory([]);
        setNewDonation({ date: null, bloodGroup: '', location: '' });
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleProfileSubmit = async () => {
    if (!profile.name || !profile.bloodGroup || !profile.phone || !profile.address || !profile.dob) {
      setError('All fields are required.');
      return;
    }
    if (!/^\d{10}$/.test(profile.phone)) {
      setError('Phone number must be a valid 10-digit number.');
      return;
    }
    try {
      const profileRef = doc(db, 'users', user.uid);
      await setDoc(profileRef, {
        name: profile.name.trim(),
        bloodGroup: profile.bloodGroup,
        phone: profile.phone,
        address: profile.address.trim(),
        dob: profile.dob.toISOString(),
      });
      setNewDonation((prev) => ({ ...prev, bloodGroup: profile.bloodGroup }));
      setError('');
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  const handleAddDonorCard = async () => {
    if (!profile.name || !profile.bloodGroup) {
      setError('Complete your profile (name and blood group) to generate a donor card.');
      return;
    }
    try {
      const cardRef = doc(db, 'users', user.uid, 'donorCards', 'primary');
      const cardData = {
        donorId: `BDT-${user.uid.slice(0, 8)}`,
        name: profile.name.trim(),
        bloodGroup: profile.bloodGroup,
        createdAt: new Date().toISOString(),
      };
      await setDoc(cardRef, cardData);
      setDonorCard(cardData);
      setSuccess('Donor card generated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to generate donor card: ' + err.message);
    }
  };

  const openDonationForm = () => {
    if (!donorCard) {
      setError('Generate a donor card first.');
      return;
    }
    setNewDonation({ date: null, bloodGroup: profile.bloodGroup || '', location: '' });
    setShowDonationDialog(true);
  };

  const handleDonationSubmit = async () => {
    if (!newDonation.date || !newDonation.bloodGroup || !newDonation.location) {
      setError('All donation fields are required.');
      return;
    }
    try {
      const historyRef = collection(db, 'users', user.uid, 'donationHistory');
      const donation = {
        date: newDonation.date.toISOString(),
        bloodGroup: newDonation.bloodGroup,
        location: newDonation.location.trim(),
      };
      const docRef = await addDoc(historyRef, donation);
      setDonationHistory([...donationHistory, { id: docRef.id, ...donation }]);
      setSuccess('Donation added successfully!');
      setError('');
      setShowDonationDialog(false);
    } catch (err) {
      setError('Failed to add donation: ' + err.message);
    }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      const donationRef = doc(db, 'users', user.uid, 'donationHistory', donationId);
      await deleteDoc(donationRef);
      setDonationHistory(donationHistory.filter((donation) => donation.id !== donationId));
      setSuccess('Donation deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete donation: ' + err.message);
    }
  };

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

  const deleteButtonTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      onClick={() => handleDeleteDonation(rowData.id)}
      tooltip="Delete"
    />
  );

  if (!user) {
    return (
      <Box className="container">
        <Paper elevation={3} className="custom-card">
          <Typography variant="h4" color="#d32f2f">Profile</Typography>
          <Message severity="warn" text="Please log in to view and edit your profile." />
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="container" >
      <Paper elevation={3} className="custom-card">
        <Typography variant="h3" color="#d32f2f" gutterBottom data-aos="fade-down">Donor Profile</Typography>
        {error && <Message severity="error" text={error} style={{ marginBottom: '10px' }} />}
        {success && <Message severity="success" text={success} style={{ marginBottom: '10px' }} />}
        <Typography variant="h4" className="section-heading" data-aos="fade-down">Personal Information :</Typography>
        <Box className="personal-info-section" sx={{ mb: 3 }} data-aos="fade-up">
          {isEditing ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#fff', padding: 3, borderRadius: 3,boxShadow: '0 0 10px rgba(0,0,0,0.05)', }}>
              <Box className="form-group">
                <Typography variant="body1">Name</Typography>
                <InputText
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{ width: '100%' }}
                  placeholder="Enter your name"
                  className="custom-input"
                />
              </Box>
              <Box className="form-group">
                <Typography variant="body1">Blood Group</Typography>
                <Dropdown
                  id="bloodGroup"
                  value={profile.bloodGroup}
                  options={bloodGroups}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.value })}
                  placeholder="Select Blood Group"
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Box>
              <Box className="form-group">
                <Typography variant="body1">Phone</Typography>
                <InputText
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  style={{ width: '100%' }}
                  placeholder="Enter 10-digit phone number"
                  className="custom-input"
                />
              </Box>
              <Box className="form-group">
                <Typography variant="body1">Address</Typography>
                <InputText
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  style={{ width: '100%' }}
                  placeholder="Enter your address"
                  className="custom-input"
                />
              </Box>
              <Box className="form-group">
                <Typography variant="body1">Date of Birth</Typography>
                <Calendar
                  id="dob"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.value })}
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                  style={{ width: '35%' }}
                  placeholder="Select date of birth"
                  className="custom-input"
                />
              </Box>
              <div className="profile-action-buttons">
                <Button label="Save Profile" icon="pi pi-check" onClick={handleProfileSubmit} />
                <Button label="Cancel" icon="pi pi-times" onClick={() => setIsEditing(false)} severity="secondary" />
              </div>
            </Box>
          ) : (
            <Box>
              <Typography><strong>Name:</strong> {profile.name || 'Not set'}</Typography>
              <Typography><strong>Blood Group:</strong> {profile.bloodGroup || 'Not set'}</Typography>
              <Typography><strong>Phone:</strong> {profile.phone || 'Not set'}</Typography>
              <Typography><strong>Address:</strong> {profile.address || 'Not set'}</Typography>
              <Typography><strong>Date of Birth:</strong> {profile.dob ? formatDate(profile.dob) : 'Not set'}</Typography>
              <Button className="profile-action-buttons" label="Edit Profile" icon="pi pi-pencil" onClick={() => setIsEditing(true)} />
            </Box>
          )}
        </Box>
        <Box sx={{ mb: 3 }} data-aos="fade-up">
          {donorCard ? (
            <Card className="custom-card-secondary">
              <Typography variant="h6">Donor Card</Typography>
              <Typography><strong>Donor ID:</strong> {donorCard.donorId}</Typography>
              <Typography><strong>Name:</strong> {donorCard.name}</Typography>
              <Typography><strong>Blood Group:</strong> {donorCard.bloodGroup}</Typography>
              <Typography><strong>Created on:</strong> {formatDate(donorCard.createdAt)}</Typography>
            </Card>
          ) : (
            <Box>
              <Typography>No donor card found.</Typography>
              <Button className="profile-action-buttons" label="Generate Donor Card" icon="pi pi-id-card" onClick={handleAddDonorCard} data-aos="zoom-in" />
            </Box>
          )}
        </Box>
        <Box>
          <Typography variant="h6" className="donation-history-title" data-aos="fade-down">Donation History</Typography>
          <Button className="profile-action-buttons" label="Add Donation" icon="pi pi-plus" onClick={openDonationForm} style={{ marginBottom: '10px' }} />
          <DataTable value={donationHistory} tableStyle={{ minWidth: '50rem' }}>
            <Column field="date" header="Date" body={(rowData) => formatDate(rowData.date)} />
            <Column field="bloodGroup" header="Blood Group" />
            <Column field="location" header="Location" />
            <Column header="Actions" body={deleteButtonTemplate} style={{ width: '100px' }} />
          </DataTable>
        </Box>
        <Dialog
          header="Add Donation"
          visible={showDonationDialog}
          style={{ width: '400px' }}
          onHide={() => setShowDonationDialog(false)}
          className="custom-card"
          data-aos="zoom-in"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
            <Box>
              <Typography variant="body1">Donation Date</Typography>
              <Calendar
                id="donationDate"
                value={newDonation.date}
                onChange={(e) => setNewDonation({ ...newDonation, date: e.value })}
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                style={{ width: '100%' }}
                placeholder="Select donation date"
              />
            </Box>
            <Box>
              <Typography variant="body1">Blood Group</Typography>
              <Dropdown
                id="donationBloodGroup"
                value={newDonation.bloodGroup}
                options={bloodGroups}
                onChange={(e) => setNewDonation({ ...newDonation, bloodGroup: e.value })}
                placeholder="Select Blood Group"
                style={{ width: '100%' }}
                disabled={!!profile.bloodGroup}
              />
            </Box>
            <Box>
              <Typography variant="body1">Location</Typography>
              <InputText
                id="donationLocation"
                value={newDonation.location}
                onChange={(e) => setNewDonation({ ...newDonation, location: e.target.value })}
                style={{ width: '100%' }}
                placeholder="Enter donation center name/address"
              />
            </Box>
            <Button className="profile-action-buttons" label="Save Donation" icon="pi pi-check" onClick={handleDonationSubmit} />
            <Button className="profile-action-buttons" label="Cancel" icon="pi pi-times" onClick={() => setShowDonationDialog(false)} severity="secondary" />
          </Box>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default Profile;