# Paniudto Restaurant Website 🍽️

**Elevating the local flavors of Cantilan**

This is a student project website for a fictional restaurant showcasing local dishes from Cantilan, Surigao del Sur. Built with basic HTML, CSS, and JavaScript as an IT student group project.

## 🚀 How to Run

1. Simply open `index.html` in your web browser
2. No server setup required - it's a static website!

## 📁 Project Structure

```
paniudto/
├── index.html          # Home page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Main dashboard (requires login)
├── about.html          # About us page
├── contact.html        # Contact page
├── style.css           # All styling
├── script.js           # JavaScript functionality
├── image-upload.html   # Helper page for organizing images
├── images/             # Folder for dish images
│   ├── kinilaw-tuna.jpg
│   ├── tinolang-isda.jpg
│   ├── sinuglaw.jpg
│   ├── lato-salad.jpg
│   ├── lechon-kawali.jpg
│   ├── buko-pie.jpg
│   ├── ginataang-langka.jpg
│   └── pancit-cantilan.jpg
└── README.md           # This file
```

## 🔐 Demo Login Credentials

For testing purposes, use these credentials:

- **Username:** `student` | **Password:** `password123`
- **Username:** `admin` | **Password:** `admin123`
- **Username:** `test` | **Password:** `test123`

Or create your own account using the registration page!

## ✨ Features

### 🏠 Home Page
- Welcome section with restaurant branding
- Feature highlights
- Navigation to other pages

### 🔑 Authentication System
- **Login page** with form validation
- **Registration page** for new users
- Simple localStorage-based session management
- Error handling and user feedback

### 📊 Dashboard (Login Required)
- Display of local Cantilan dishes
- Interactive cards with dish information
- Simple restaurant statistics
- Welcome message for logged-in users

### 📄 Additional Pages
- **About Us:** Information about the restaurant and student project
- **Contact:** Restaurant details and demo contact form

## 🍽️ Featured Dishes

The dashboard showcases authentic dishes from Cantilan, Surigao del Sur:

1. **Kinilaw na Tuna** - Fresh tuna ceviche
2. **Tinolang Isda** - Clear fish soup
3. **Sinuglaw** - Grilled pork and ceviche fusion
4. **Lato Salad** - Sea grape salad
5. **Lechon Kawali Cantilan Style** - Crispy pork belly
6. **Buko Pie** - Traditional coconut pie
7. **Ginataang Langka** - Jackfruit in coconut milk
8. **Pancit Cantilan** - Local noodle dish

## 📸 Adding Your Own Images

### Setting Up Images:
1. Create an `images` folder in your project directory
2. Add your dish photos with these exact names:
   - `kinilaw-tuna.jpg`
   - `tinolang-isda.jpg`
   - `sinuglaw.jpg`
   - `lato-salad.jpg`
   - `lechon-kawali.jpg`
   - `buko-pie.jpg`
   - `ginataang-langka.jpg`
   - `pancit-cantilan.jpg`

### Image Requirements:
- **Format:** JPG, PNG, or WebP
- **Size:** Recommended 800x600px or similar ratio
- **File Size:** Keep under 1MB for faster loading
- **Quality:** Good enough to showcase the food attractively

### Fallback System:
- If an image fails to load, the system automatically shows an emoji
- This ensures your site always works even without images

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and content
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Interactive functionality
- **localStorage** - Simple data persistence

### Student-Level Features
- Basic responsive design
- Simple animations and transitions
- Form validation
- Local storage for user sessions
- Dummy data for demonstration
- Clean, commented code

### Browser Compatibility
- Works on modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-friendly responsive design

## 📱 Mobile Responsive

The website adapts to different screen sizes:
- Desktop: Full navigation and grid layouts
- Tablet: Adjusted spacing and layouts
- Mobile: Single-column layouts and collapsible navigation

## 🎓 Educational Purpose

This project demonstrates:
- **Frontend Development** basics
- **User Authentication** concepts
- **Responsive Web Design** principles
- **JavaScript DOM manipulation**
- **Local data storage** techniques
- **Form handling** and validation
- **Cultural preservation** through technology

## 🗄️ FileMaker Pro Integration

This project now includes **full FileMaker Pro integration** using JSON files as the database:

### Features:
- ✅ **JSON Database**: All data stored in structured JSON files
- ✅ **FileMaker Pro Sync**: Two-way synchronization with FileMaker Pro
- ✅ **Admin Dashboard**: Complete admin interface for database management
- ✅ **GitHub Integration**: Automated sync via GitHub Actions
- ✅ **Real-time Updates**: Changes sync between FileMaker Pro and website
- ✅ **Data Validation**: Automatic JSON schema validation
- ✅ **Backup System**: Automated backups before sync operations

### Database Structure:
```
data/
├── users.json     # User accounts and authentication
├── dishes.json    # Restaurant menu and dish information
├── orders.json    # Customer orders and transactions
└── settings.json  # System configuration and sync settings
```

### FileMaker Pro Setup:
1. **Import Scripts**: Use the provided FileMaker Pro scripts in `filemaker-scripts/`
2. **Create Buttons**: Add sync buttons to your FileMaker Pro layouts
3. **Configure Sync**: Set up automated sync with GitHub repository
4. **Test Integration**: Verify two-way data synchronization

### Admin Interface:
Access the admin dashboard at `/admin.html` (requires admin login):
- **User Management**: Add, edit, and manage user accounts
- **Menu Management**: Update dishes, prices, and availability
- **Order Tracking**: Monitor and manage customer orders
- **Sync Control**: Manual and automatic FileMaker Pro synchronization
- **System Monitoring**: View sync logs and system status

### Quick Start:
1. **Login as Admin**: Use username `admin` and password `admin123`
2. **Access Admin Panel**: Navigate to `/admin.html`
3. **Configure FileMaker**: Follow the integration guide in `filemaker-integration.md`
4. **Test Sync**: Use the "Sync Now" button to test FileMaker Pro integration

### GitHub Actions:
- **Automatic Validation**: All JSON files validated on commit
- **Sync Monitoring**: Automated sync status tracking
- **Backup Creation**: Automatic backups before changes
- **Error Notifications**: Alerts for sync failures

## 🚀 Enhanced Features

- ✅ **FileMaker Pro Integration**: Full two-way database synchronization
- ✅ **JSON Database**: Structured data storage with validation
- ✅ **Admin Dashboard**: Complete management interface
- ✅ **GitHub Actions**: Automated sync and validation
- ✅ **Real-time Updates**: Live data synchronization
- ✅ **Backup System**: Automated data protection
- ✅ **User Authentication**: Enhanced with role-based access
- ✅ **API Ready**: JSON structure ready for API integration

## 👥 Project Team

This is a collaborative IT student project focusing on:
- Web development fundamentals
- Local culture appreciation
- Technology for cultural preservation
- Team collaboration in software development

## 📝 Notes

- This is a **demonstration project** only
- No real restaurant or business operations
- Contact forms and reservation systems are for demo purposes
- All data is stored locally in the browser

---

**Made with ❤️ by IT Students**  
*Showcasing the flavors of Cantilan, Surigao del Sur*
