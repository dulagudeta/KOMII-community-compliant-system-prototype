// Initialize data structure if not exists
function initializeData() {
    if (!localStorage.getItem('komiiComplaints')) {
        const sampleComplaints = [
            {
                id: 'CT-1001',
                type: 'Pothole',
                description: 'Large pothole causing traffic issues near the intersection',
                location: 'Main Street, Downtown',
                status: 'resolved',
                department: 'public-works',
                createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
                updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                createdBy: 'resident@example.com',
                assignedTo: 'worker@komii.gov',
                timeline: [
                    { action: 'Submitted', time: new Date(Date.now() - 86400000 * 7).toLocaleString() },
                    { action: 'Assigned to Public Works', time: new Date(Date.now() - 86400000 * 6).toLocaleString() },
                    { action: 'Repair Completed', time: new Date(Date.now() - 86400000 * 2).toLocaleString() }
                ]
            },
            {
                id: 'CT-1002',
                type: 'Illegal Dumping',
                description: 'Furniture and trash left in the alley',
                location: '5th Avenue Alley',
                status: 'in-progress',
                department: 'sanitation',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'resident@example.com',
                assignedTo: 'worker@komii.gov',
                timeline: [
                    { action: 'Submitted', time: new Date(Date.now() - 86400000 * 2).toLocaleString() },
                    { action: 'Assigned to Sanitation Dept', time: new Date(Date.now() - 86400000).toLocaleString(), officer: 'John D. (Badge #427)' }
                ]
            }
        ];
        localStorage.setItem('komiiComplaints', JSON.stringify(sampleComplaints));
    }

    if (!localStorage.getItem('komiiUsers')) {
        const sampleUsers = [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@komii.gov',
                password: 'admin123',
                role: 'admin',
                department: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Sanitation Worker',
                email: 'worker@komii.gov',
                password: 'worker123',
                role: 'staff',
                department: 'sanitation',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: 'John Resident',
                email: 'resident@example.com',
                password: 'resident123',
                role: 'resident',
                department: null,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('komiiUsers', JSON.stringify(sampleUsers));
    }
}

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('komiiIsLoggedIn');
    const authSection = document.getElementById('auth-section');
    
    if (authSection) {
        if (isLoggedIn) {
            const user = JSON.parse(localStorage.getItem('komiiUser'));
            authSection.innerHTML = `
                <div class="flex items-center space-x-4">
                    <span class="text-white">${user.name}</span>
                    <button onclick="logout()" class="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg">Logout</button>
                </div>
            `;
        } else {
            authSection.innerHTML = `
                <a href="auth.html" class="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg">Login</a>
            `;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('komiiIsLoggedIn');
    localStorage.removeItem('komiiUser');
    window.location.href = 'index.html';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Initialize data when app.js loads
initializeData();

// Make functions available globally
window.checkAuthStatus = checkAuthStatus;
window.logout = logout;
window.formatDate = formatDate;