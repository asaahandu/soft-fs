# Firebase Setup Guide for Soft-FS

## 🔥 Firebase Integration Complete!

Your Next.js application is now configured to use Firebase as your backend. Here's what has been set up:

### ✅ What's Been Added

1. **Firebase SDK** - Latest version installed with all necessary services
2. **Authentication System** - Complete auth setup with Google sign-in support
3. **Firestore Database** - CRUD operations and real-time data management
4. **Storage Service** - File upload and management capabilities
5. **API Routes** - RESTful endpoints for service requests
6. **Admin Dashboard** - Complete admin panel to manage service requests
7. **Custom Hooks** - React hooks for easy Firebase integration
8. **Security Rules** - Firestore and Storage security configurations

### 📁 New Files Structure

```
lib/
├── firebase.js          # Firebase configuration and initialization
├── firestore.js         # Firestore CRUD operations
└── auth.js              # Authentication utilities

hooks/
└── useServiceRequests.js # Custom hook for service requests

contexts/
└── AuthContext.js       # Authentication context provider

app/api/
└── service-requests/    # API routes for service requests
    ├── route.js         # GET/POST endpoints
    └── [id]/route.js    # Individual request operations

firestore.rules          # Firestore security rules
storage.rules           # Storage security rules
.env.template           # Environment variables template
```

## 🚀 Getting Started

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard:
   - Enter project name (e.g., "soft-fs-project")
   - Choose whether to enable Google Analytics
   - Select or create a Google Analytics account (optional)

### Step 2: Enable Services

1. **Enable Firestore Database:**
   - Go to Firestore Database in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" (for now)
   - Select a location closest to your users

2. **Enable Authentication:**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider (optional but recommended)

3. **Enable Storage:**
   - Go to Storage
   - Click "Get started"
   - Review security rules and click "Done"

### Step 3: Configure Web App

1. In Firebase Console, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "soft-fs-web")
3. Copy the configuration object that appears

### Step 4: Set Up Environment Variables

1. Copy `.env.template` to `.env.local`:
   ```bash
   cp .env.template .env.local
   ```

2. Replace the placeholder values in `.env.local` with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Step 5: Deploy Security Rules

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project:**
   ```bash
   firebase init
   ```
   - Select "Firestore" and "Storage"
   - Choose your existing project
   - Accept default files for Firestore rules and indexes
   - Accept default file for Storage rules

4. **Deploy rules:**
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

## 🎯 Features Now Available

### 1. Service Request Form
- ✅ Fully functional contact form on your website
- ✅ Real-time validation and error handling
- ✅ Data stored directly in Firebase Firestore
- ✅ Automatic timestamps and status tracking

### 2. Admin Dashboard
- ✅ View all service requests at `/admin/requests`
- ✅ Filter by status (pending, in-progress, completed, cancelled)
- ✅ Search by name, email, or service type
- ✅ Update request status
- ✅ Delete requests
- ✅ View detailed request information

### 3. Authentication System (Ready to Use)
- ✅ Email/password sign-up and sign-in
- ✅ Google authentication
- ✅ Password reset functionality
- ✅ Protected routes and admin access
- ✅ User context provider

### 4. Database Operations
- ✅ Create, Read, Update, Delete operations
- ✅ Real-time updates
- ✅ Efficient querying and filtering
- ✅ Error handling and validation

## 🔧 Usage Examples

### Using the Service Request Hook

```javascript
import { useServiceRequests } from '../hooks/useServiceRequests';

function MyComponent() {
  const { 
    requests, 
    loading, 
    error, 
    createRequest, 
    updateRequest, 
    deleteRequest 
  } = useServiceRequests();

  // Create a new request
  const handleSubmit = async (formData) => {
    try {
      await createRequest(formData);
      console.log('Request created successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {requests.map(request => (
        <div key={request.id}>{request.name}</div>
      ))}
    </div>
  );
}
```

### Using Authentication

```javascript
import { useAuth } from '../contexts/AuthContext';
import { signIn, signOut } from '../lib/auth';

function AuthComponent() {
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
}
```

## 🔒 Security Best Practices

1. **Never expose Firebase config secrets** - The config in `.env.local` contains public keys only
2. **Use Firestore Security Rules** - Already configured in `firestore.rules`
3. **Implement proper authentication** - Auth context is ready to use
4. **Validate data on both client and server** - API routes include validation
5. **Regular security reviews** - Monitor Firebase Console for unusual activity

## 📊 Monitoring and Analytics

- **Firestore Usage:** Monitor read/write operations in Firebase Console
- **Authentication:** Track sign-ins and user activity
- **Performance:** Use Firebase Performance Monitoring (optional)
- **Crashes:** Firebase Crashlytics for error tracking (optional)

## 🚀 Next Steps

1. **Test the integration:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` and try submitting the service form

2. **Access admin dashboard:**
   Visit `http://localhost:3000/admin/requests` to view submitted requests

3. **Customize as needed:**
   - Modify form fields in `ServiceForm.js`
   - Add more collections in Firestore
   - Extend authentication features
   - Add file upload functionality

4. **Deploy to production:**
   - Set up environment variables on your hosting platform
   - Deploy Firestore and Storage rules
   - Configure authentication domains

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase config not found"**
   - Check that `.env.local` exists and has the correct values
   - Restart your development server after adding env variables

2. **"Permission denied" errors**
   - Check Firestore rules in Firebase Console
   - Ensure you're in test mode or have proper authentication

3. **"Module not found" errors**
   - Run `npm install` to ensure all dependencies are installed
   - Clear Next.js cache: `rm -rf .next`

4. **API routes not working**
   - Check that API routes are in the correct `app/api/` directory
   - Verify the route handlers are properly exported

### Getting Help:

- 📖 [Firebase Documentation](https://firebase.google.com/docs)
- 🔍 [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- 💬 [Firebase Community](https://firebase.google.com/community)

---

## 🎉 Congratulations!

Your Soft-FS application now has a complete Firebase backend integration. You can:

- ✅ Collect service requests from your website
- ✅ Manage requests in your admin dashboard  
- ✅ Scale your application as your business grows
- ✅ Add user authentication when needed
- ✅ Store files and media content

Your backend is now production-ready and can handle real customer requests! 🚀