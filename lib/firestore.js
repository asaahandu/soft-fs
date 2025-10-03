import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPH_33OfR9kORH4dENKlZcgIXC885P1Kc",
  authDomain: "soft-fs.firebaseapp.com",
  projectId: "soft-fs",
  storageBucket: "soft-fs.firebasestorage.app",
  messagingSenderId: "175739517749",
  appId: "1:175739517749:web:a48293986bb7782be12a7c",
  measurementId: "G-SREC65VK6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Service Requests API
export const serviceRequestsAPI = {
  // Create a new service request
  async create(data) {
    try {
      const docRef = await addDoc(collection(db, 'service-requests'), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return {
        id: docRef.id,
        ...data,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating service request:', error);
      throw new Error('Erreur lors de la création de la demande de service');
    }
  },

  // Get all service requests
  async getAll() {
    try {
      const q = query(
        collection(db, 'service-requests'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching service requests:', error);
      throw new Error('Erreur lors du chargement des demandes de service');
    }
  },

  // Get service request by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'service-requests', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate?.() || docSnap.data().createdAt,
          updatedAt: docSnap.data().updatedAt?.toDate?.() || docSnap.data().updatedAt,
        };
      } else {
        throw new Error('Demande de service non trouvée');
      }
    } catch (error) {
      console.error('Error fetching service request:', error);
      throw new Error('Erreur lors du chargement de la demande de service');
    }
  },

  // Get service requests by status
  async getByStatus(status) {
    try {
      const q = query(
        collection(db, 'service-requests'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching service requests by status:', error);
      throw new Error('Erreur lors du chargement des demandes de service');
    }
  },

  // Update service request
  async update(id, data) {
    try {
      const docRef = doc(db, 'service-requests', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      
      return await this.getById(id);
    } catch (error) {
      console.error('Error updating service request:', error);
      throw new Error('Erreur lors de la mise à jour de la demande de service');
    }
  },

  // Delete service request
  async delete(id) {
    try {
      const docRef = doc(db, 'service-requests', id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting service request:', error);
      throw new Error('Erreur lors de la suppression de la demande de service');
    }
  },

  // Search service requests
  async search(searchTerm) {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation that searches by name
      const q = query(
        collection(db, 'service-requests'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
        }))
        .filter(request => 
          request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.company?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      return results;
    } catch (error) {
      console.error('Error searching service requests:', error);
      throw new Error('Erreur lors de la recherche des demandes de service');
    }
  }
};

export { db };