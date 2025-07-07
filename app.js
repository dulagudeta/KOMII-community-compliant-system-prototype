/**
 * KOMII - Core Application Logic
 * Handles data initialization, authentication, and common functions
 */

// Initialize data structure if not exists
function initializeData() {
    // Only initialize if no data exists
    if (!localStorage.getItem('komiiInitialized')) {
        console.log("Initializing KOMII data...");
        
        // Sample complaints data
        const sampleComplaints = [
            {
                id: 'CT-' + Date.now().toString().slice(-6),
                type: 'Pothole',
                description: 'Large pothole causing traffic issues near the intersection',
                location: 'Main Street, Downtown',
                status: 'resolved',
                department: 'public-works',
                createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
                updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                createdBy: 'resident@example.com',
                assignedTo: 'worker@komii.gov',
                priority: 'high',
                timeline: [
                    { 
                        action: 'Submitted', 
                        time: new Date(Date.now() - 86400000 * 7).toLocaleString() 
                    },
                    { 
                        action: 'Assigned to Public Works', 
                        time: new Date(Date.now() - 86400000 * 6).toLocaleString(),
                        officer: 'Jane Smith (Badge #123)'
                    },
                    { 
                        action: 'Repair Completed', 
                        time: new Date(Date.now() - 86400000 * 2).toLocaleString(),
                        officer: 'John Doe (Badge #456)'
                    }
                ]
            },
            {
                id: 'CT-' + (Date.now() + 1).toString().slice(-6),
                type: 'Illegal Dumping',
                description: 'Furniture and trash left in the alley',
                location: '5th Avenue Alley',
                status: 'in-progress',
                department: 'sanitation',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'resident@example.com',
                assignedTo: 'worker@komii.gov',
                priority: 'medium',
                timeline: [
                    { 
                        action: 'Submitted', 
                        time: new Date(Date.now() - 86400000 * 2).toLocaleString() 
                    },
                    { 
                        action: 'Assigned to Sanitation Dept', 
                        time: new Date(Date.now() - 86400000).toLocaleString(), 
                        officer: 'Mike Johnson (Badge #789)'
                    }
                ]
            }
        ];

        // Sample users data
        const sampleUsers = [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@komii.gov',
                password: 'admin123',
                role: 'admin',
                department: null,
                active: true,
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 2,
                name: 'Sanitation Worker',
                email: 'worker@komii.gov',
                password: 'worker123',
                role: 'staff',
                department: 'sanitation',
                active: true,
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 3,
                name: 'John Resident',
                email: 'resident@example.com',
                password: 'resident123',
                role: 'resident',
                department: null,
                active: true,
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];

        // Initialize departments
        const departments = [
            { id: 'public-works', name: 'Public Works', head: 'jane.doe@komii.gov' },
            { id: 'sanitation', name: 'Sanitation', head: 'mike.smith@komii.gov' },
            { id: 'parks', name: 'Parks and Recreation', head: 'alex.johnson@komii.gov' }
        ];

        // Save to localStorage
        localStorage.setItem('komiiComplaints', JSON.stringify(sampleComplaints));
        localStorage.setItem('komiiUsers', JSON.stringify(sampleUsers));
        localStorage.setItem('komiiDepartments', JSON.stringify(departments));
        localStorage.setItem('komiiInitialized', 'true');
        
        console.log("KOMII data initialized successfully");
    }
}

// Check authentication status
function checkAuthStatus() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    const isLoggedIn = localStorage.getItem('komiiIsLoggedIn');
    const user = JSON.parse(localStorage.getItem('komiiUser') || null);

    if (isLoggedIn && user) {
        authSection.innerHTML = `
            <div class="flex items-center space-x-4">
                <span class="text-white">${user.name.split(' ')[0]}</span>
                <button onclick="logout()" class="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg">
                    Logout
                </button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <a href="auth.html" class="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg">Login</a>
        `;
    }
}

// Login function
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('komiiUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password && u.active);

    if (!user) {
        console.error("Login failed for email:", email);
        return { success: false, message: 'Invalid email or password' };
    }

    // Update user's last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem('komiiUser', JSON.stringify(user));
    localStorage.setItem('komiiIsLoggedIn', 'true');
    
    // Update users array
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem('komiiUsers', JSON.stringify(updatedUsers));

    console.log("Login successful for:", email);
    return { success: true, user };
}

// Logout function
function logout() {
    console.log("Logging out user...");
    localStorage.removeItem('komiiIsLoggedIn');
    localStorage.removeItem('komiiUser');
    window.location.href = 'index.html';
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Check if user is authenticated
function isAuthenticated() {
    const isLoggedIn = localStorage.getItem('komiiIsLoggedIn');
    const user = JSON.parse(localStorage.getItem('komiiUser') || 'null');
    return !!isLoggedIn && !!user;
}

// Redirect if not authenticated
function requireAuth(requiredRole) {
    if (!isAuthenticated()) {
        window.location.href = 'auth.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem('komiiUser'));
    if (requiredRole && user.role !== requiredRole) {
        switch(user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'staff':
                window.location.href = 'dashboard.html';
                break;
            default:
                window.location.href = 'resident.html';
        }
    }
}

// Initialize data when app.js loads
initializeData();

// Make functions available globally
window.initializeData = initializeData;
window.checkAuthStatus = checkAuthStatus;
window.login = login;
window.logout = logout;
window.formatDate = formatDate;
window.isAuthenticated = isAuthenticated;
window.requireAuth = requireAuth;