
# KOMII - Community Issues Management System (Prototype)

## Overview
KOMII is a web-based prototype application designed to manage and track community complaints and issues. It features three user roles with different capabilities.

## Features
- **Residents** can submit and track complaints
- **Staff** can manage assigned complaints
- **Admins** have full system access and reporting capabilities

## User Roles and Credentials
| Role     | Email                 | Password   | Access Level               |
|----------|-----------------------|------------|----------------------------|
| Admin    | `admin@komii.gov`     | `admin123` | Full system administration |
| Staff    | `worker@komii.gov`    | `worker123`| Department-specific access |
| Resident | `resident@example.com`| `resident123`| Complaint submission only |

## Installation
No installation required - this is a client-side only prototype that runs in the browser using:
- HTML5
- CSS3/Tailwind CSS
- JavaScript (with localStorage for data persistence)

## How to Use
1. Open `index.html` 
2. Click "Login" and use one of the test credentials above
3. Based on your role:
   - **Residents**: Submit new complaints or track existing ones
   - **Staff**: View and resolve assigned complaints
   - **Admin**: Access all system data and reports

## File Structure
/komii-prototype/

├── index.html          # Landing page                                                                                                                               
├── auth.html           # Login/registration
├── complaint.html      # Complaint submission/tracking
├── resident.html       # Resident dashboard
├── dashboard.html      # Staff dashboard
├── admin.html          # Admin dashboard
├── styles.css          # Custom styles
└── app.js              # Core application logic


## Important Notes
1. **This is a prototype** - Not production-ready (passwords stored in plaintext)
2. All data persists in browser localStorage (clears when cache is cleared)
3. No backend server - completely client-side implementation
4. Designed for demonstration purposes only

## Troubleshooting
If login isn't working:
1. Open browser Developer Tools (F12)
2. Check Console for errors
3. In Application > Local Storage, verify `komiiUsers` exists
4. Try clearing localStorage and refreshing:
   
   ```javascript
   localStorage.clear();
   location.reload();
   ```


## Future Improvements
- Add proper authentication
- Implement server-side persistence
- Add email notifications
- Mobile responsiveness enhancements

